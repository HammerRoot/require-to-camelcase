import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    console.log('Smart Require Import extension is now active!');

    // Register command for manual trigger
    const convertCommand = vscode.commands.registerCommand('smartRequireImport.convertToCamelCase', () => {
        convertRequireToConst();
    });

    context.subscriptions.push(convertCommand);
}

export function deactivate() {}

function convertRequireToConst() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showErrorMessage('No active editor found');
        return;
    }

    const document = editor.document;
    const selection = editor.selection;
    const lineText = document.lineAt(selection.active.line).text;

    // Match require() statements only
    const requireMatch = lineText.match(/require\s*\(\s*['"]([^'"]+)['"]\s*\)/);

    if (!requireMatch) {
        vscode.window.showInformationMessage('No require() statement found on current line');
        return;
    }

    const packageName = requireMatch[1];
    const fullMatch = requireMatch[0];

    const camelCaseName = toCamelCase(packageName);

    // Check if variable name already exists in scope
    if (isVariableInScope(document, camelCaseName)) {
        vscode.window.showInformationMessage(`Variable ${camelCaseName} already exists in scope`);
        return;
    }

    // Replace the line with const declaration
    const range = new vscode.Range(
        new vscode.Position(selection.active.line, 0),
        new vscode.Position(selection.active.line, lineText.length)
    );

    // Convert to const require() format
    const newText = `const ${camelCaseName} = require('${packageName}');`;
    
    editor.edit(editBuilder => {
        editBuilder.replace(range, newText);
    });

    vscode.window.showInformationMessage(`Converted to: const ${camelCaseName}`);
}

function toCamelCase(packageName: string): string {
    // Remove the @ prefix for scoped packages first
    let cleanName = packageName;
    if (cleanName.startsWith('@')) {
        cleanName = cleanName.slice(1);
    }

    // Split by ANY special character (not just alphabets and numbers) and convert to camelCase
    // This will handle: node:path, fs/promises, @types/node, lodash.debounce, abc-pkl-qtr, etc.
    return cleanName
        .split(/[^a-zA-Z0-9]/) // Split on any non-alphanumeric character
        .filter(part => part.length > 0) // Remove empty parts
        .map((part, index) => {
            if (index === 0) {
                return part.toLowerCase();
            }
            return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
        })
        .join('');
}

function isVariableInScope(document: vscode.TextDocument, variableName: string): boolean {
    // Remove all comments from the code before checking for variables
    const text = document.getText();
    const codeWithoutComments = removeComments(text);
    
    const patterns = [
        new RegExp(`\\b(const|let|var)\\s+${variableName}\\b`),
        new RegExp(`\\bfunction\\s+${variableName}\\b`),
        new RegExp(`\\bclass\\s+${variableName}\\b`)
    ];

    return patterns.some(pattern => pattern.test(codeWithoutComments));
}

function removeComments(code: string): string {
    // Remove single-line comments and multi-line comments
    let result = '';
    let i = 0;
    let inSingleQuote = false;
    let inDoubleQuote = false;
    let inMultiLineComment = false;
    let inSingleLineComment = false;
    
    while (i < code.length) {
        const char = code[i];
        const nextChar = code[i + 1];
        
        // Handle string literals - don't remove comments inside strings
        if (char === "'" && !inDoubleQuote && !inMultiLineComment && !inSingleLineComment) {
            inSingleQuote = !inSingleQuote;
            result += char;
        } else if (char === '"' && !inSingleQuote && !inMultiLineComment && !inSingleLineComment) {
            inDoubleQuote = !inDoubleQuote;
            result += char;
        }
        // Handle multi-line comments
        else if (char === '/' && nextChar === '*' && !inSingleQuote && !inDoubleQuote && !inSingleLineComment) {
            inMultiLineComment = true;
            i++; // Skip the '*'
        } else if (char === '*' && nextChar === '/' && inMultiLineComment) {
            inMultiLineComment = false;
            i++; // Skip the '/'
        }
        // Handle single-line comments
        else if (char === '/' && nextChar === '/' && !inSingleQuote && !inDoubleQuote && !inMultiLineComment) {
            inSingleLineComment = true;
            i++; // Skip the second '/'
        } else if (char === '\n' && inSingleLineComment) {
            inSingleLineComment = false;
            result += char; // Keep the newline
        }
        // Add character to result if not in comment
        else if (!inMultiLineComment && !inSingleLineComment) {
            result += char;
        }
        
        i++;
    }
    
    return result;
}