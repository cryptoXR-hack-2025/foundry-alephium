import { web3, NodeProvider, waitForTxConfirmation,Contract, TransactionBuilder } from '@alephium/web3';
import { PrivateKeyWallet } from '@alephium/web3-wallet';


export default async function script(scriptPath, rpcUrl, privateKey) {
    // Configure the network provider
    const nodeProvider = new NodeProvider(rpcUrl)
    web3.setCurrentNodeProvider(nodeProvider)
    const nodeUrl = 'http://127.0.0.1:22973'
    const builder = TransactionBuilder.from(nodeUrl)
    builder.buildExecuteScriptTx()
    const wallet = new PrivateKeyWallet(privateKey)
    console.log(`Deploy from wallet address: ${wallet.address}`)

    try {
        // Build the project (this will compile your Ralph contracts)
        // const project = Project.default()
        // await project.build()

        // Get the TokenFaucet contract and Deploy script
        const tokenFaucet = project.artifacts.contracts['TokenFaucet']
        const deployScript = project.artifacts.scripts['Deploy']

        if (!tokenFaucet || !deployScript) {
            throw new Error('Contract or deploy script not found')
        }

        // Execute the deploy script
        console.log('Executing deploy script...')
        // deploy here

        console.log('Waiting for transaction confirmation...')
        const txId = // tx id
        // it will query the tx status every 4 seconds and wait for 2 block confirmations
        await waitForTxConfirmation(txId, 2, 4000)

    } catch (error) {
        console.error('Error during deployment:', error)
        process.exit(1)
    }
}
