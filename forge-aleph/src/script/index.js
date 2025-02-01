import { web3, NodeProvider, waitForTxConfirmation, TransactionBuilder } from '@alephium/web3';
import { PrivateKeyWallet } from '@alephium/web3-wallet';
import CLI from '@alephium/cli'
import path from 'path';


export default async function script(scriptPath, rpcUrl, privateKey) {
    // Configure the network provider
    const nodeProvider = new NodeProvider(rpcUrl)
    web3.setCurrentNodeProvider(nodeProvider)
    // const builder = TransactionBuilder.from(nodeUrl)
    // builder.buildExecuteScriptTx()
    const wallet = new PrivateKeyWallet({ privateKey: privateKey })
    console.log(`Deploy from wallet address: ${wallet.address}`)

    try {
        const project = await CLI.Project.compile(undefined,undefined,path.resolve(scriptPath, '..','..'), path.resolve(scriptPath, '..','..','..','out'))
        CLI.codegen(project)


    } catch (error) {
        console.error('Error during compilation:', error)
        process.exit(1)
    }

    try {
        // Get the TokenFaucet contract and Deploy script
        import {Deploy} from path.resolve(scriptPath, '..','..','..','out','scripts.ts')
        const bytecode = Deploy.script.buildByteCodeToDeploy({ amount: ONE_ALPH })



        // Execute the deploy script
        console.log('Executing deploy script...')
        // deploy here

        console.log('Waiting for transaction confirmation...')
        const txId = // tx id
        // it will query the tx status every 4 seconds and wait for 2 block confirmations
        await waitForTxConfirmation(txId, 2, 4000)
        console.log("Contracts deployed succesfully")
    } catch (error) {
        console.error('Error during deployment:', error)
        process.exit(1)
    }
}

// script("toto/script/myToken.s.ral", "http://localhost:22973", "684f1d5de35ef1bdec1ee5087032e139f60f947258ab747d1e0c337f217d2e81")