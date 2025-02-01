#!/usr/bin/env node

import init from "./init/index.js";
import script from "./script/index.js";


const args = process.argv.slice(2);
const command = args[0];

if (!command) {
    console.error('Please provide a command : init, script or test');
    process.exit(1);
}

if (command == "init") {
    const repoName = args[1];
    if (!repoName) {
        console.error('Please provide a repository name: forge-aleph init <repo-name>');
        process.exit(1);
    }
    init(repoName)
}

if (command == "script") {
    const scriptPath = args[1];
    const rpcUrl = args[2];
    const privateKey = args[3];
    if (!scriptPath) {
        console.error('Please provide a path for script: forge-aleph script <myscript>');
        process.exit(1);
    }
    if (!rpcUrl) {
        console.error('Please provide an rpc url');
        process.exit(1);
    }
    if (!privateKey) {
        console.error('Please provide a private key');
        process.exit(1);
    }
    script(scriptPath,rpcUrl,privateKey)
}

if (command == "test") {
}