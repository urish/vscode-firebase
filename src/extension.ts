'use strict';

import * as vscode from 'vscode';
import * as firebase from 'firebase';

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

    console.log('Congratulations, your extension "vscode-firebase" is now active!');

    let disposable = vscode.commands.registerCommand('extension.sayHello', () => {
        firebase.database().ref('/live/hello').set('Hello World!');
        vscode.window.showInformationMessage('Hello World!');
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {
}
