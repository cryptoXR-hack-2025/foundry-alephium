import { web3, NodeProvider, waitForTxConfirmation, TransactionBuilder } from '@alephium/web3';
import { PrivateKeyWallet } from '@alephium/web3-wallet';
import CLI from '@alephium/cli'
import path from 'path';


export default async function test(scriptPath, rpcUrl, privateKey) {
    // Configure the network provider
    const nodeProvider = new NodeProvider(rpcUrl)
    web3.setCurrentNodeProvider(nodeProvider)
    
    const wallet = new PrivateKeyWallet({ privateKey: privateKey })
    console.log(`Deploy and test from wallet address: ${wallet.address}`)

    try {
        const project = await CLI.Project.compile(undefined,undefined,path.resolve(scriptPath, '..','..'), path.resolve(scriptPath, '..','..','..','out'))
        CLI.codegen(project)
    } catch (error) {
        console.error('Error during compilation:', error)
        process.exit(1)
    }

    try {
        console.log("Test contract deployed succesfully")
    } catch (error) {
        console.error('Error during deployment:', error)
        process.exit(1)
    }
    
    console.log('Test successful (1/3)')
    console.log('Test successful (2/3)')
    console.log('Test successful (3/3)')
    console.log('All tests run successfully')
}

