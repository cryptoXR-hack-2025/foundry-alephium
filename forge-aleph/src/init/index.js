#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';


const directory_structure = {
    'src/script': ['myToken.s.ral'],
    'src/contracts': ['myToken.ral', 'withdraw.ral'],
    'src/test': ['myToken.t.ral'],
    '.': ['Readme.md', '.gitignore', '.foundry.toml']
};

const currentWorkingDirectory = process.cwd();

const __dirname = path.dirname(new URL(import.meta.url).pathname);


function initialCommit(repoPath) {
    if (!fs.existsSync(path.join(repoPath, '.git'))) {
        execSync('git init -b main', { cwd: repoPath, stdio: 'inherit' });
        console.log('Initialized Git repository on branch main');
    }

    execSync('git add .', { cwd: repoPath, stdio: 'inherit' });
    execSync('git commit -m "initial commit on foundry alephium"', { cwd: repoPath, stdio: 'inherit' });
    console.log('Initial commit created: "initial commit on foundry alephium"');
}

function getFileContent(fileName) {
    const filePath = path.join(__dirname,'template', fileName);
    if (fs.existsSync(filePath)) {
        return fs.readFileSync(filePath, 'utf-8');
    } else {
        console.error(`Error: ${fileName} does not exist in the current directory.`);
        process.exit(1);
    }
}


function createStructure(repoPath) {
    Object.entries(directory_structure).forEach(([dir, files]) => {
        const dirPath = path.join(repoPath, dir);
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
            console.log(`Created directory: ${dirPath}`);
        }
        files.forEach(file => {
            const filePath = path.join(dirPath, file);
            if (!fs.existsSync(filePath)) {
                fs.writeFileSync(filePath, getFileContent(file));
                console.log(`Created file: ${filePath}`);
            }
        });
    });
}

function createRepo(repoName) {
    const repoPath = path.join(currentWorkingDirectory, repoName);
    
    fs.mkdirSync(repoPath, { recursive: true });
    console.log(`Created repository directory: ${repoPath}`);
    return repoPath;
}


export default function init(repoName) {
    const repoPath = createRepo(repoName);
    createStructure(repoPath);
    initialCommit(repoPath);
}

