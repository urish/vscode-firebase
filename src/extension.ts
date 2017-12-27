'use strict';

import * as vscode from 'vscode';
import * as firebase from 'firebase';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
    const config = {
        apiKey: 'AIzaSyDdNy3Gv73fsu2T8DEvUoDDs4X_eUdVnJo',
        authDomain: 'uri-slides.firebaseapp.com',
        databaseURL: 'https://uri-slides.firebaseio.com',
        projectId: 'uri-slides',
        storageBucket: '',
        messagingSenderId: '311071374268'
    };
    firebase.initializeApp(config);

    let initialized = false;

    function saveDocument(doc: vscode.TextDocument) {
        const file = path.basename(doc.fileName).replace(/[^a-z0-9-]/gi, '_');
        firebase.database().ref('/live').child(file).set(doc.getText());
    }

    let disposable = vscode.commands.registerCommand('extension.shareCode', () => {
        vscode.window.showInformationMessage(`Sharing code on Firebase: ${config.databaseURL}`);
        if (!initialized) {
            vscode.workspace.onDidSaveTextDocument(saveDocument, context.subscriptions);
            initialized = true;
        }
        if (vscode.window.activeTextEditor) {
            saveDocument(vscode.window.activeTextEditor.document);
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {
}
