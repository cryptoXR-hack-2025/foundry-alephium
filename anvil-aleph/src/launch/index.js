import { exec } from 'child_process';

export async function runAlephiumNode() {
    console.log("Launching Alephium Node, may take a minute...\n")
    return new Promise((resolve, reject) => {
        const process = exec('docker compose -f launch/docker-compose.yml up -d');
        process.on('close', (code) => {
            if (code === 0) {
                console.log("Alephium Node ready to use.");
                resolve();
            } else {
                reject(new Error(`Process exited with code ${code}`));
            }
        });
    });
};


export async function killAlephiumNode() {
    console.log("Killing Alephium Node, may take a minute...\n")
    return new Promise((resolve, reject) => {
        const process = exec('docker compose -f launch/docker-compose.yml down');
        process.on('close', (code) => {
            if (code === 0) {
                console.log("Alephium Node down.");
                resolve();
            } else {
                reject(new Error(`Process exited with code ${code}`));
            }
        });
    });
};
