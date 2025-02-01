#!/usr/bin/env node

import init from "./init/index.js";


const args = process.argv.slice(2);
const command = args[0];

if (!command) {
    process.exit(1);
}


if (command == "init") {
    const repoName = args[1];
    if (!repoName) {
        console.error('Please provide a repository name: node myscript.js <repo-name>');
        process.exit(1);
    }
    init(repoName)
}