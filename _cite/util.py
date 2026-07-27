"""
utility functions for cite process and plugins
"""

import subprocess
import json
import re
import yaml
from urllib.request import Request, urlopen
from yaml.loader import SafeLoader
from pathlib import Path
from datetime import datetime
from rich import print
from diskcache import Cache


# cache for time-consuming network requests
cache = Cache("./_cite/.cache")


# clear expired items from cache
cache.expire()


def log_cache(func):
    """
    decorator to use around memoized function to log if cached or or not
    """

    def wrap(*args):
        key = func.__cache_key__(*args)
        if key in cache:
            log(" (from cache)", level="INFO", newline=False)
        return func(*args)

    return wrap


def log(message="\n--------------------\n", indent=0, level="", newline=True):
    """
    log to terminal, color determined by indent and level
    """

    palette = {
        0: "[orange1]",
        1: "[salmon1]",
        2: "[violet]",
        3: "[sky_blue1]",
        "ERROR": "[white on #F43F5E]",
        "WARNING": "[black on #EAB308]",
        "SUCCESS": "[black on #10B981]",
        "INFO": "[grey70]",
    }
    color = get_safe(palette, level, "") or get_safe(palette, indent, "") or "[white]"
    if newline:
        print()
    print(indent * "    " + color + str(message) + "[/]", end="", flush=True)


def label(entry):
    """
    get "label" of dict entry (for logging purposes)
    """

    return str(list(entry.keys())[0]) + ": " + str(list(entry.values())[0])


def get_safe(item, path, default=None):
    """
    safely access value in nested lists/dicts
    """

    for part in str(path).split("."):
        try:
            part = int(part)
        except ValueError:
            part = part
        try:
            item = item[part]
        except (KeyError, IndexError, AttributeError, TypeError):
            return default
    return item


def list_of_dicts(data):
    """
    check if data is list of dicts
    """

    return isinstance(data, list) and all(isinstance(entry, dict) for entry in data)


def format_date(date):
    """
    format date as YYYY-MM-DD, or no date if malformed
    """

    if isinstance(date, int):
        return datetime.fromtimestamp(date // 1000.0).strftime("%Y-%m-%d")
    try:
        return datetime.strptime(date, "%Y-%m-%d").strftime("%Y-%m-%d")
    except Exception:
        return ""


def load_data(path):
    """
    read data from yaml or json file
    """

    # convert to path object
    path = Path(path)

    # check if file exists
    if not path.is_file():
        raise Exception("Can't find file")

    # try to open file
    try:
        file = open(path, encoding="utf8")
    except Exception as e:
        raise Exception(e or "Can't open file")

    # try to parse as yaml
    try:
        with file:
            data = yaml.load(file, Loader=SafeLoader)
    except Exception:
        raise Exception("Can't parse file. Make sure it's valid YAML.")

    # if no errors, return data
    return data


def save_data(path, data):
    """
    write data to yaml file
    """

    # convert to path object
    path = Path(path)

    # try to open file
    try:
        file = open(path, mode="w")
    except Exception:
        raise Exception("Can't open file for writing")

    # prevent yaml anchors/aliases (pointers)
    yaml.Dumper.ignore_aliases = lambda *args: True

    # try to save data as yaml
    try:
        with file:
            yaml.dump(data, file, default_flow_style=False, sort_keys=False)
    except Exception:
        raise Exception("Can't save YAML to file")

    # write warning note to top of file
    note = "# DO NOT EDIT, GENERATED AUTOMATICALLY"
    try:
        with open(path, "r") as file:
            data = file.read()
        with open(path, "w") as file:
            file.write(f"{note}\n\n{data}")
    except Exception:
        raise Exception("Can't write to file")


def strip_markup(text):
    """
    remove inline markup tags that some publishers embed in their metadata,
    e.g. the "<scp>S</scp>ex-related" small-caps markup Wiley sends to Crossref.
    Whitespace is collapsed too, since removing a tag can leave the line breaks
    and indentation that surrounded it.
    """
    return re.sub(r"\s+", " ", re.sub(r"<[^>]+>", "", text)).strip()


# lazily-loaded map of preferred author name forms, see _data/author-names.yaml
_author_names = None


def canonical_author(name):
    """
    look up the preferred display form of an author name, falling back to the
    name as generated from publisher metadata
    """
    global _author_names
    if _author_names is None:
        try:
            _author_names = load_data(Path("_data/author-names.yaml")) or {}
        except Exception:
            _author_names = {}
    return _author_names.get(name, name)


def author_initials(given):
    """
    convert a given name to APA-style initials, preserving hyphenation
    ("Alexander J." -> "A. J.", "Hee-Yeon" -> "H.-Y.")
    """
    words = []
    for word in given.split():
        segments = [segment for segment in word.split("-") if segment]
        words.append("-".join(segment[0].upper() + "." for segment in segments))
    return " ".join(words)


def format_authors(authors):
    """
    format a CSL author list APA-style,
    e.g. "Song, M., Cook, A. J., & Im, H.-Y."
    """
    names = []
    for author in authors:
        given = strip_markup(get_safe(author, "given", "").strip())
        family = strip_markup(get_safe(author, "family", "").strip())
        if not (given or family):
            continue
        if given and family:
            name = f"{family}, {author_initials(given)}"
        else:
            name = family or given
        names.append(canonical_author(name))

    if len(names) > 1:
        return ", ".join(names[:-1]) + ", & " + names[-1]
    return "".join(names)


@log_cache
@cache.memoize(name="crossref-print-year", expire=30 * (60 * 60 * 24))
def crossref_print_year(_id):
    """
    look up the print (issue) year for a DOI from Crossref

    Manubot reports the "issued" date, which for online-first papers is when
    the paper first appeared online — often a year before the issue it gets
    cited by. Reference lists use the issue year, so prefer that where Crossref
    has one. Returns "" if unavailable, so callers fall back to the Manubot date.
    """
    if not _id.lower().startswith("doi:"):
        return ""

    try:
        request = Request(
            f"https://api.crossref.org/works/{_id[4:]}",
            headers={"User-Agent": "imm-lab-website (https://www.imm-lab.ca)"},
        )
        message = json.loads(urlopen(request, timeout=30).read())["message"]
        return str(message["published-print"]["date-parts"][0][0])
    except Exception:
        return ""


@log_cache
@cache.memoize(name="manubot", expire=90 * (60 * 60 * 24))
def cite_with_manubot(_id):
    """
    generate citation data for source id with Manubot
    """

    # run Manubot
    try:
        commands = ["manubot", "cite", _id, "--log-level=WARNING"]
        output = subprocess.Popen(commands, stdout=subprocess.PIPE).communicate()
    except Exception as e:
        log(e, 3)
        raise Exception("Manubot could not generate citation")

    # parse results as json
    try:
        manubot = json.loads(output[0])[0]
    except Exception:
        raise Exception("Couldn't parse Manubot response")

    # new citation with only needed info
    citation = {}

    # original id
    citation["id"] = _id

    # title
    citation["title"] = strip_markup(get_safe(manubot, "title", "").strip())

    # authors
    citation["authors"] = []
    for author in get_safe(manubot, "author", {}):
        given = get_safe(author, "given", "").strip()
        family = get_safe(author, "family", "").strip()
        if given or family:
            citation["authors"].append(" ".join([given, family]))

    # authors, formatted APA-style for reference lists
    citation["authors_apa"] = format_authors(get_safe(manubot, "author", {}))

    # volume, issue, and page or article number
    citation["volume"] = str(get_safe(manubot, "volume", "")).strip()
    citation["issue"] = str(get_safe(manubot, "issue", "")).strip()
    citation["pages"] = str(get_safe(manubot, "page", "")).strip()

    # publisher
    container = get_safe(manubot, "container-title", "").strip()
    collection = get_safe(manubot, "collection-title", "").strip()
    publisher = get_safe(manubot, "publisher", "").strip()
    citation["publisher"] = container or publisher or collection or ""

    # extract date part
    def date_part(citation, index):
        try:
            return citation["issued"]["date-parts"][0][index]
        except (KeyError, IndexError, TypeError):
            return ""

    # date
    year = date_part(manubot, 0)
    if year:
        # fallbacks for month and day
        month = date_part(manubot, 1) or "1"
        day = date_part(manubot, 2) or "1"
        citation["date"] = format_date(f"{year}-{month}-{day}")
    else:
        # if no year, consider date missing data
        citation["date"] = ""

    # for online-first papers, cite the issue year rather than the online date
    print_year = crossref_print_year(_id)
    if print_year and not citation["date"].startswith(print_year):
        citation["date"] = format_date(f"{print_year}-1-1")

    # link
    citation["link"] = get_safe(manubot, "URL", "").strip()

    # return citation data
    return citation
