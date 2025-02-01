#!/usr/bin/env node

import init_context from "./setup/index.js";
import { runAlephiumNode, killAlephiumNode } from "./launch/index.js";

const arg = process.argv[2];
let nbAccounts = 10;

if (arg) {
    nbAccounts = arg;
}


console.log(`
    ___               _ __      ___    __           __  
   /   |  ____ _   __(_) /     /   |  / /__  ____  / /_ 
  / /| | / __ \\ | / / / /_____/ /| | / / _ \\/ __ \\/ __ \\
 / ___ |/ / / / |/ / / /_____/ ___ |/ /  __/ /_/ / / / /
/_/  |_/_/ /_/|___/_/_/     /_/  |_/_/\\___/ .___/_/ /_/ 
                                         /_/            
`);
console.log('https://github.com/cryptoXR-hack-2025/foundry-alephium.git\n')
await runAlephiumNode();
const accounts = await init_context()

console.log(`
    Available Accounts
    ==================
    `)

for (let i = 0; i < accounts.length; i++) {
    console.log(`(${i}) ${accounts[i].address} (Balance : ${accounts[i].balance})`)
}

console.log(`
    Private keys
    ==================
    `)

for (let i = 0; i < accounts.length; i++) {
    console.log(`(${i}) ${accounts[i].pv_key.privateKey}`)
}

console.log(`
    Chain ID
    ==================
    4
    `)    


console.log('\nListening on http://localhost:22973. Press "CTRL+C" to shut down the blockchain.');

process.on('SIGINT', async () => {
    await killAlephiumNode()
    process.exit(0);
});

// Keep the process running
setInterval(() => {}, 1000);

