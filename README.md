# anvil-aleph & forge-Aleph
## Overview

anvil-aleph and forge-aleph are tools designed to simplify the development and testing of smart contracts on the Alephium blockchain. These tools provide a seamless experience for developers by offering a local blockchain environment, account management, and deployment/testing utilities.

## Prerequisites
Docker installed on your machine.

## Getting Started
### anvil-aleph
\`\`\`sh
anvil-aleph is used to launch a local blockchain and generate accounts.
\`\`\`

#### Install anvil-aleph CLI:
\`\`\`sh
cd anvil-aleph
npm link
\`\`\`

#### Run anvil-aleph:
\`\`\`sh
anvil-aleph <number_of_accounts>
\`\`\`

This command will launch your local blockchain, create a bunch of accounts, and fund them with ALPH to be ready for use.

### forge-aleph
\`\`\`sh
forge-aleph provides modules for initializing projects, deploying contracts, and running tests.
\`\`\`

#### Install forge-aleph CLI:
\`\`\`sh
cd forge-aleph
npm link
\`\`\`

Using forge-aleph: forge-aleph comes with three modules: init, script, and test.

##### Init: Bootstraps a git repository for your project, complete with deployment scripts, contract templates, and test templates.
\`\`\`sh
forge-aleph init <name_of_repo>
\`\`\`

##### Script: Deploys your smart contracts from a deployment contract written in Ralph, eliminating the need for JavaScript.
\`\`\`sh
forge-aleph script <deployment_contract> <rpc_url> <private_key>
\`\`\`

You can generate a private key or use an existing one.

##### Test: Deploys the smart contract containing all your tests and runs them once deployed.
\`\`\`sh
forge-aleph test <test_contract> <rpc_url> <private_key>
\`\`\`

## Example Usage

Initialize a new project using:
\`\`\`sh
forge-aleph init my-new-project
\`\`\`

Deploy a contract:
\`\`\`sh
forge-aleph script MyDeploymentContract http://localhost:22973 684f1d5de35ef1...
\`\`\`

Run tests:
\`\`\`sh
forge-aleph test MyTestContract http://localhost:22973 684f1d5de35ef1...
\`\`\`

License
This project is licensed under the MIT License.
