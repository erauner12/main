---
aliases:
  - Table Of Contents
linter-yaml-title-alias: Table Of Contents
title: Table Of Contents
id: 76712239
link: https://docs.getdrafts.com/docs/actions/templates/drafts-templates
excerpt: Documentation for Drafts app, a quick-capture note taking app for
  iPhone, iPad, Mac and Apple Watch.
slurped: 2024-11-11T13:35
---

Drafts lightweight template engine to allow control over how text is output in action steps. Templates are used for most values in action steps, so can be used to not only create the content of an exported file, or mail message, but to dynamically create the file name and folder, assign tags, insert timestamps and more, when an action is run.

> Using Templates This page offers a reference of available tags, to get an overview start with this [Using Templates](https://forums.getdrafts.com/t/using-drafts-templates/3728) article.

# [](https://docs.getdrafts.com/docs/actions/templates/drafts-templates#table-of-contents)Table Of Contents

1. [Tag Syntax](https://docs.getdrafts.com/docs/actions/templates/drafts-templates#tag-syntax)
2. [Tags](https://docs.getdrafts.com/docs/actions/templates/drafts-templates#tags)
    1. [Identifier Tags](https://docs.getdrafts.com/docs/actions/templates/drafts-templates#identifier-tags)
    2. [Content Tags](https://docs.getdrafts.com/docs/actions/templates/drafts-templates#content-tags)
    3. [Locations](https://docs.getdrafts.com/docs/actions/templates/drafts-templates#locations)
3. [Dates and Times](https://docs.getdrafts.com/docs/actions/templates/drafts-templates#dates-and-times)
    1. [Formatting Dates](https://docs.getdrafts.com/docs/actions/templates/drafts-templates#formatting-dates)
        1. [strftime Formats](https://docs.getdrafts.com/docs/actions/templates/drafts-templates#strftime-formats)
        2. [DateFormatter Formats](https://docs.getdrafts.com/docs/actions/templates/drafts-templates#dateformatter-formats)
    2. [Adjusting Dates](https://docs.getdrafts.com/docs/actions/templates/drafts-templates#adjusting-dates)
4. [Utility Tags](https://docs.getdrafts.com/docs/actions/templates/drafts-templates#utility-tags)
5. [Custom Tags](https://docs.getdrafts.com/docs/actions/templates/drafts-templates#custom-tags)
6. [Other Special markup](https://docs.getdrafts.com/docs/actions/templates/drafts-templates#other-special-markup)
7. [Escaping](https://docs.getdrafts.com/docs/actions/templates/drafts-templates#escaping)

---

# [](https://docs.getdrafts.com/docs/actions/templates/drafts-templates#tag-syntax)Tag Syntax

Drafts templates use square brackets to delineate tags, like `[[tag-name]]`. Some tags can also accept optional parameters, which are separated by a pipe (`|`) character, like `[[tag-name|parameter]]`.

## [](https://docs.getdrafts.com/docs/actions/templates/drafts-templates#identifier-tags)Identifier Tags

- `[[uuid]]` A unique identifier for the current draft.
- `[[permalink]]` A URL which can be used as a bookmark to open Drafts and select the current draft. The deprecated `[[draft_open_url]]` returns this same value, but `permalink` is preferred.

## [](https://docs.getdrafts.com/docs/actions/templates/drafts-templates#content-tags)Content Tags

- `[[draft]]` The full text of the draft.
- `[[title]]` The first line of the draft only.
- `[[safe_title]]` File name safe version of the first line with ASCII control characters and path separators that can interfere with file names removed (\/:*?<>|#).
- `[[display_title]]` A cleaned and trimmed version of the first line as would be displayed in the draft list. Removes whitespace and leading “#” characters.
- `[[body]]` The remainder of the draft text after the first line is removed.
- `[[trimmed_body]]` Same as `body` but with any whitespace (spaces/new lines) removed from beginning and end.
- `[[body_preview]]` A trimmed and shortened snippet of the body, as would be displayed in the draft list.
- `[[selection]]` If text was selected within the draft before selecting an action, this tag will return only that selected text. If no text was selected, it will return the full text of the draft.
- `[[selection_only]]` Returns selected text, but unlike `[[selection]]` will not default to returning the entire draft if no selection was made - it will simply return a empty string.
- `[[tags]]` Comma-separated list of tags linked to the draft.
- `[[hashtags]]` Same as `[[tags]]`, but with `#` characters prepended before each tag. For use with actions that export to other systems which utilize hash tags in the text when tagging.
- `[[line]]` The text of the current line, based on the last cursor position in the document. If a selection which spanned multiple lines was present, extends the selection to the beginning and end of the lines selected.
- `[[line|n]]` The text of a specific line number in the draft, where “n” is the line number. i.e. `[[line|1]]`, `[[line|2]]`.
- `[[line|n..n]]` In addition to specific lines, the lines tag (above) can accept ranges of lines, such as `[[line|2..5]]` for lines 2 through 5. This initial or trailing number in the range can be omitted to indicate the beginning or end, i.e. `[[line|2..]]` is line 2 through the end of the draft, `[[line|..4]]` is the first for lines of the draft. This tag also support negative indexes, which count back from the last line of the draft, e.g. `[[line|-1]]` returns the last line of the draft.
- `[[selection_start]]` The integer index of the start location of the last text selection in the draft.
- `[[selection_length]]` The number of characters in the last text selection in the draft.

## [](https://docs.getdrafts.com/docs/actions/templates/drafts-templates#locations)Locations

- `[[longitude]]` The current device location longitude.
- `[[latitude]]` The current device location latitude.
- `[[created_longitude]]` The location longitude where the draft was created.
- `[[created_latitude]]` The location latitude where the draft was created.
- `[[modified_longitude]]` The location longitude where the content of the draft was last modified.
- `[[modified_latitude]]` The location latitude where the content of the draft was last modified.

# [](https://docs.getdrafts.com/docs/actions/templates/drafts-templates#dates-and-times)Dates And Times

The following date-related template tags are available. All work with the date formatting and adjusting parameter described below.

- `[[date]]` Current time. Defaults to the format YYYY-MM-DD.
- `[[time]]` Current time. Defaults to the format YYYY-MM-DD-HH-MM-SS.
- `[[created]]` Timestamp for the creation of the draft, rather than the current time.
- `[[modified]]` Timestamp for the last modification date of the draft content, rather than the current time.

## [](https://docs.getdrafts.com/docs/actions/templates/drafts-templates#formatting-dates)Formatting Dates

Date tags can take an optional format string to specify the formatting of the output string. To include a format string, add a pipe character (`|`) and the format string to any of the above date tags, like `[[date|format]]`.

Formats can be provided using `strftime` markup, or using Apple’s DateFormatter style patterns, per the discussion below.

### [](https://docs.getdrafts.com/docs/actions/templates/drafts-templates#strftime-formats)strftime Formats

`strftime` formats are a great option when building a specifically formatted date string.

By default, format strings are assumed to use [`strftime`](http://strftime.net/) formatting. `strftime` is a common library to format dates using a set of `%` flags as placeholders for values from the date/time. Some commonly used placeholders:

- `%Y` - Year as a four digit number, like `2020`
- `%m` - Month as a two digit number
- `%d` - Date as a two digit number
- `%r` - Time in 12-hour format

When evaluated, spacing and punctuation in a `strftime` format string are maintained, and just the placeholder values replaced.

The [strfime website](http://strftime.net/) is a great tool for building strftime-compatible format strings to be used in Drafts templates. A few examples of complete date tags with format strings:

- `[[date|%Y-%m-%d]]` => _Example Output:_ 2020-01-02
- `[[date|%A, %B %e, %Y]]` => _Example Output:_ Tuesday, December 6, 2022
- `[[date|%r]]` => _Example Output:_ 08:14:22 AM

### [](https://docs.getdrafts.com/docs/actions/templates/drafts-templates#dateformatter-formats)DateFormatter Formats

If you need more flexible date formats that are aware of system settings and localizable to different languages and region formats, date format strings can be specified that use Apple’s [`DateFormatter` class](https://developer.apple.com/documentation/foundation/dateformatter).

Drafts will process your format string as a `DateFormatter` string if it begins with the character `~` or `=`.

To begin with, there are several pre-configured special values which are used most often to get standard, localized date and time formats that match your configured options in OS Settings > Languages & Regions. These are:

- `[[date|=shortDate]]` => The numeric date, in the format specified in your OS settings. The default in U.S. English would be something like `12/30/2020`.
- `[[date|=shortDateTime]]` => The numeric date and time, also based on formatting options in OS settings.
- `[[date|=longDate]]` => Full written date. In U.S. English, like `December 6, 2022`. This will be localized in the active language on the device.
- `[[date|=longDateTime]]` => Full written date and time. In U.S. English, like `December 6, 2022 at 9:24:08 AM CST`. This will be localized in the active language on the device.
- `[[date|=iso8601]]` => Output standard [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) formatted date string.

Custom formatting strings utilize the placeholder define by `DateFormatter` for the different date/time components. There is an excellent reference of these placeholders at [NSDateFormatter.com](http://nsdateformatter.com/#reference). Custom formatting strings can be constructed in two ways:

- `~` starting a format string says, “I’m tell you the date/time components I want included, output the best localized string including those components”. When using `~` any spacing and punctuation will be ignored, and the system will determine approprate punctuation based on localization. Examples:
    - `[[date|~yyyyMMdd]]` => A numeric date including year, month, and date. In U.S. English, this would output a numeric date in Month/Date/Year order, in U.K. English, in Date/Month/Year order.
    - `[[date|~yyyyMMddHHmmss]]` => A numeric date including year, month, date, hour, minutes, and seconds.
- `=` starting your format string says, “I’m am providing a specific format, only replace the placeholders in the template”. Any whitespace or punctuation provided will be maintained and the component values inserted. Examples:
    - `[[date|=dd.MM.yy]]` => _Example Output:_ 22.10.2022
    - `[[date|=MMM d, h:mm a]]` => _Example Output:_ Dec 6, 4:00 PM

`DateFormatter` formats also support overriding the current device localization by specifying a preferred locale string in parentheses before the format string. Example:

- `[[date|=(it_IT)EEEE]]` => Outputs the name of the current day of the week in Italian, always, regardless of current device settings.

Locales are specified using in the standard language-country abbreviated format. Examples: en_US (English-United States), it_IT (Italian-Italy), es_MX (Spanish-Mexico).

## [](https://docs.getdrafts.com/docs/actions/templates/drafts-templates#adjusting-dates)Adjusting Dates

The date tags in the section above can all also accept an optional adjustment expression that moves the date forward and backward in time. Expressions are in the format `(+|-)(integer) (unit)`. Example expressions:

- `+1 year`: Advanced the date by one year.
- `-3 months -12 hours`: Move the date backwards by three months and 12 hours.

Supported unit values are: year, month, day, hour, minute, second. Each can be provided in singular or plural form.

Adjustments are applied in order, and are “smart” around calendars. For example applying “+1 month” to a date on May 31st will result in a date of June 30th, since June only has 30 days.

To adjust a date tag, include an additional parameter before the format string, separate by a `|` character, examples:

- `[[date|+1 year|%Y-%m-%d]]`: Today’s date next year.
- `[[date|+2 days +2 hours|%Y-%m-%d %H-%M]]`: Today’s date plus two days and two hours.

Date adjustment can also done in script. See [`adjustDate` function documentation](https://scripting.getdrafts.com/functions/adjustDate.html).

- `[[template|path]]` Inserts a template stored in a file in `iCloud Drive/Drafts/Library/Templates`. “path” should be the related path to a file which exists in that folder, for example: `[[template|my-site-template.txt]]`. File will be loaded an evaluated as if it’s text was inline in the current template, allowing re-use of templates across actions.
- `[[clipboard]]` The current contents of the iOS clipboard.

In addition to the predefined tags always available, scripts in an action can create custom tags which become available to action steps run after the script in the same action. This is useful if a scripted action step processes text to create a value that then needs to be inserted in a later step that shares that text. The below example shows a simple script with creates a tag.

```
let s = "My String Value";
draft.setTemplateTag("mytag", s);
// after running this script, templates later
// in the action will have available a [[mytag]] tag.
```

Custom template tag values can also be created using the [Define Template Tag action step](https://docs.getdrafts.com/docs/actions/steps/utility.html#define-template-tag)

# [](https://docs.getdrafts.com/docs/actions/templates/drafts-templates#other-special-markup)Other Special Markup

- `{{ }}` Wrap text in double-curly brackets to have the text URL encoded.
- `%% %%` Wrap text in double percent signs to run the enclosed text through the Markdown engine and convert it to HTML.  This is useful to export Markdown to HTML, use in HTML Preview steps or other purposes.
- `<<snippet-abbreviation>>` _[iOS only]_ A valid [TextExpander](https://textexpander.com/) abbreviation wrapped in double brackets will be expanded at runtime. This is a legacy feature, and not recommended. For more information on this option and limitations, see our [TextExpander ingeration guide](https://forums.getdrafts.com/t/using-textexpander-with-drafts/5030).

# [](https://docs.getdrafts.com/docs/actions/templates/drafts-templates#escaping)Escaping

If you want to use something which would otherwise be evaluated as a template tag or function but not have it evaluated in actions, it needs to be escaped by placeing a single backslash () character before it. So, for example `\[[title]]` would be ignored and not replaced with the title of the draft. The escaping backslash would be removed, however.

---
