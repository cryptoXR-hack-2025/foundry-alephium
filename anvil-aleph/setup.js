import { TransactionBuilder, DUST_AMOUNT } from '@alephium/web3'
import { HDWallet } from '@alephium/web3-wallet'
import { NodeProvider, ExplorerProvider } from '@alephium/web3'


const nodeUrl = 'http://127.0.0.1:22973';
const explorerUrl = 'http://127.0.0.1:9090';
const nodeProvider = new NodeProvider(nodeUrl);
const explorerProvider = new ExplorerProvider(explorerUrl);
const builder = TransactionBuilder.from(nodeUrl)

const mnemonic_master = "vault alarm sad mass witness property virus style good flower rice alpha viable evidence run glare pretty scout evil judge enroll refuse another lava";
const master_signer = new HDWallet({mnemonic:mnemonic_master, nodeProvider:nodeProvider, explorerProvider:explorerProvider});
const account_master = await master_signer.deriveAndAddNewAccount(0);
const master_balance = 1000000000000000000000000n;

const master_data = {
    mnemonic_master: mnemonic_master,
    master_signer: master_signer,
    master_address: account_master.address,
    master_pubkey: account_master.publicKey
}

const init_accounts = async (nbAccounts) => {
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

const feed_accounts = async (accounts, master_data) => {
    const amount = master_data.master_balance / accounts.length;
    const senderAddress = account_master.address;
    const senderPublicKey = account_master.publicKey;

    for (const account of accounts) {
        const receiverAddress = account.address;
        const buildTxResult = await builder.buildTransferTx(
          {
            signerAddress: senderAddress,
            destinations: [{
              address: receiverAddress,
              attoAlphAmount: DUST_AMOUNT,
              tokens: [{
                id: '19246e8c2899bc258a1156e08466e3cdd3323da756d8a543c7fc911847b96f00',
                amount: amount
              }]
            }]
          },
          senderPublicKey
        )
        const result = await master_signer.signAndSubmitUnsignedTx({
            signerAddress: account_master.address,
            unsignedTx: buildTxResult.unsignedTx
        })
    }
}

init_accounts(5)
