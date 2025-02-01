#!/usr/bin/env node

import init_context from "./setup/index.js";
import { runAlephiumNode, killAlephiumNode } from "./launch/index.js";
import readline from 'readline';

const arg = process.argv[2];
let nbAccounts = 10;

if (arg) {
    nbAccounts = arg;
}

await runAlephiumNode();
const accounts = await init_context()
console.log(accounts)


console.log('Listening on port 22973. Press "CTRL+C" to shut down the blockchain.');

process.on('SIGINT', async () => {
    await killAlephiumNode()
    process.exit(0);
});

// Keep the process running
setInterval(() => {}, 1000);

