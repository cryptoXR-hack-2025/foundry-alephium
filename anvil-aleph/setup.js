import { TransactionBuilder } from '@alephium/web3'
import { HDWallet } from '@alephium/web3-wallet'
import { NodeProvider, ExplorerProvider } from '@alephium/web3'
import dotenv from 'dotenv';

dotenv.config()

const init_accounts = async (nbAccounts, nodeProvider, explorerProvider) => {
    let accounts = []
    for (let idx=0; idx < nbAccounts; idx++) {
        const wallet_data = {
            password: "123456",
            walletName: "account_".concat(idx.toString()),
        }
        await nodeProvider.wallets.deleteWalletsWalletName(wallet_data.walletName, {password: wallet_data.password})
        const wallet_result = await nodeProvider.wallets.postWallets(wallet_data);
        const wallet = new HDWallet({mnemonic:wallet_result.mnemonic, nodeProvider:nodeProvider, explorerProvider:explorerProvider});
        const account = wallet.deriveAndAddNewAccount(1);
        accounts.push({
            address: account.address,
            mnemonic: wallet_result.mnemonic
        })
    }
    return accounts
}

const feed_accounts = async (accounts, master_data, builder) => {
    const amount = master_data.master_balance / BigInt(accounts.length + 1);
    const senderAddress = master_data.master_address;
    const senderPublicKey = master_data.master_pubkey;
    for (const account of accounts) {
        const receiverAddress = account.address;
        try {
            const buildTxResult = await builder.buildTransferTx(
                {
                  signerAddress: senderAddress,
                  destinations: [{
                    address: receiverAddress,
                    attoAlphAmount: amount,
                  }]
                },
                senderPublicKey
            )
            const result = await master_data.master_signer.signAndSubmitUnsignedTx({
                signerAddress: account_master.address,
                unsignedTx: buildTxResult.unsignedTx
            })
        } catch (error) {
            console.error('Not enough fund to feed accounts. Please restart anvil.');
            process.exit(1);
        }        
    }
}


const init_context = async () => {
    const nodeUrl = process.env.NODE_URL
    const explorerUrl = process.env.EXPLORER_URL;
    const nodeProvider = new NodeProvider(nodeUrl);
    const explorerProvider = new ExplorerProvider(explorerUrl);
    const builder = TransactionBuilder.from(nodeUrl);
    
    const mnemonic_master = process.env.MNEMONIC_MASTER;
    const master_signer = new HDWallet({mnemonic:mnemonic_master, nodeProvider:nodeProvider, explorerProvider:explorerProvider});
    const account_master = await master_signer.deriveAndAddNewAccount(0);
    const master_data = {
        mnemonic_master: mnemonic_master,
        master_signer: master_signer,
        master_address: account_master.address,
        master_pubkey: account_master.publicKey,
        master_balance: 1000000000000000000000000n
    }
    
    const nbAccounts = 10;

    const accounts = await init_accounts(10, nodeProvider, explorerProvider)
    await feed_accounts(accounts, master_data, builder)
}

export default function init_context();