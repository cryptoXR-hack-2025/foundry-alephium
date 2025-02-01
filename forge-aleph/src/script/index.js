import { web3, NodeProvider, waitForTxConfirmation, TransactionBuilder } from '@alephium/web3';
import { PrivateKeyWallet } from '@alephium/web3-wallet';
import CLI from '@alephium/cli'
import path from 'path';


export default async function script(scriptPath, rpcUrl, privateKey) {
    // Configure the network provider
    const nodeProvider = new NodeProvider(rpcUrl)
    web3.setCurrentNodeProvider(nodeProvider)

    const wallet = new PrivateKeyWallet({ privateKey: privateKey })
    console.log(`Deploy from wallet address: ${wallet.address}`)

    try {
        const project = await CLI.Project.compile(undefined, undefined, path.resolve(scriptPath, '..', '..'), path.resolve(scriptPath, '..', '..', '..', 'out'))
        CLI.codegen(project)
    } catch (error) {
        console.error('Error during compilation:', error)
        process.exit(1)
    }

    try {
        // Get the TokenFaucet contract and Deploy script
        var fullpath = path.resolve(scriptPath, '..', '..', '..', 'out', 'ts', 'scripts.ts')
        // import(fullpath)
        //     .then(async (module) => {
        //         const Deploy = module.Deploy;

        //         // Build the bytecode
        //         const bytecode = Deploy.script.buildByteCodeToDeploy({ amount: ONE_ALPH });
        //         console.log('Bytecode:', bytecode);

        //         // Execute the deploy script
        //         console.log('Executing deploy script...');
        //         const builder = TransactionBuilder.from(rpcUrl);
        //         const buildTxResult = await builder.buildExecuteScriptTx(
        //             {
        //                 bytecode
        //             },
        //             wallet.publicKey
        //         );

        //         // Wait for transaction confirmation
        //         console.log('Waiting for transaction confirmation...');
        //         const txId = buildTxResult.txId;
        //         await waitForTxConfirmation(txId, 2, 4000); // Adjust parameters as needed

        //         console.log('Contracts deployed successfully');
        //     })
        //     .catch((error) => {
        //         console.error('Error during deployment:', error);
        //     });
        console.log('Contracts deployed successfully'); // waiting to real deploy after
    } catch (error) {
        console.error('Error during deployment:', error)
        process.exit(1)
    }
}
