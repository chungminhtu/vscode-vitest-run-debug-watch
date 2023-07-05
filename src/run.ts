import * as vscode from 'vscode';
import * as path from 'path';

function buildVitestArgs(text: string) {
    return ['vitest run -t', text];
}

export function watchInTerminal(text: string, filename: string) {
    const terminal = vscode.window.activeTerminal || vscode.window.createTerminal(`vitest - ${text}`);
    terminal.sendText( `cd ${path.dirname(filename)} && npx vitest -t ${text}`, true);
    terminal.show();
}

export function runInTerminal(text: string, filename: string) {
    const terminal = vscode.window.activeTerminal || vscode.window.createTerminal(`vitest - ${text}`);
    terminal.sendText( `cd ${path.dirname(filename)} && npx vitest run -t ${text}`, true);
    terminal.show();
}

function buildDebugConfig(
    cwd: string,
    text: string
): vscode.DebugConfiguration {
    return {
        name: 'Debug vitest case',
        request: 'launch',
        runtimeArgs: buildVitestArgs(text),
        cwd,
        runtimeExecutable: 'npx',
        skipFiles: ['<node_internals>/**'],
        type: 'pwa-node',
        console: 'integratedTerminal',
        internalConsoleOptions: 'neverOpen'
    };
}

export function debugInTermial(text: string, filename: string) {
    const casePath = path.dirname(filename);
    const config = buildDebugConfig(casePath, text);
    vscode.debug.startDebugging(undefined, config);
}
