# CGButtons

## Installation

1. Open Chrome
2. Go to Settings -> Extensions
3. Turn on Developer Mode
4. Load unpacked [copy-extension](copy-extension)


## Usage 

1. Go to any IDE.
2. Refresh the site. (Yes... I will fix this)

## Buttons 

- `[copy stderr]` - copies the entire stderr output from the program
- `[copy stdin]` - copies only lines prefixed with `?>` and removes this prefix. This allows you to write program input on stderr, retrieve it, and run identical game locally. Prefix can be changed in [contentscript.js](copy-extension/contentscript.js), but requires reinstalling the extension.

Note: if the string to copy is empty, nothing will hapen after clicking a button (no message).