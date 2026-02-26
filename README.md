# Require to CamelCase

A VS Code extension that automatically converts `require()` statements to camelCase const declarations with a single keystroke.

## Demo

![Demo](images/demo.gif)

## Features

- **Quick Conversion**: Transform `require()` statements instantly with `Alt+Q`
- **Smart Naming**: Automatically generates camelCase variable names from module names
- **Multi-Language Support**: Works with JavaScript, TypeScript, JSX, and TSX files
- **Clean Output**: Produces clean, readable const declarations

## Usage

1. Place your cursor on a `require()` statement
2. Press `Alt+Q` or use the command palette
3. The statement is instantly converted to a camelCase const declaration

### Examples

**Before:**

```javascript
require("express");
require("lodash");
require("react-router-dom");
require("./utils/helper");
```

**After (Alt+Q):**

```javascript
const express = require("express");
const lodash = require("lodash");
const reactRouterDom = require("react-router-dom");
const helper = require("./utils/helper");
```

## Installation

1. Open VS Code
2. Go to Extensions (`Ctrl+Shift+X`)
3. Search for "Require to CamelCase"
4. Click Install

## Commands

| Command                                  | Keyboard Shortcut | Description                                   |
| ---------------------------------------- | ----------------- | --------------------------------------------- |
| `Convert to CamelCase Const Declaration` | `Alt+Q`           | Converts require statement to camelCase const |

## Supported File Types

- JavaScript (`.js`)
- TypeScript (`.ts`)
- React JSX (`.jsx`)
- React TSX (`.tsx`)

## Configuration

This extension works out of the box with no configuration needed. Simply install and start using `Alt+Q` to convert your require statements.

## Contributing

Found a bug or have a feature request? Please create an issue on our [GitHub repository](https://github.com/HammerRoot/require-to-camelcase).

## License

MIT License - see [LICENSE](LICENSE) file for details.

---

**Enjoy coding with cleaner require statements! =�**
