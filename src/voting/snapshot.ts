import { ethers } from 'ethers'

import account from '../account'

const RPC = 'https://xdai-rpc.gateway.pokt.network'
const DELEGATION_CONTRACT_ADDRESS = '0x469788fE6E9E9681C6ebF3bF78e7Fd26Fc015446'
const ABI = [
  'function delegation(address,bytes32) view returns (address)',
  'function setDelegate(bytes32,address) public'
]
const provider = new ethers.providers.JsonRpcProvider(RPC)
const contract = new ethers.Contract(DELEGATION_CONTRACT_ADDRESS, ABI, provider)

const ALL_SPACES = '0x0000000000000000000000000000000000000000000000000000000000000000'

class Snapshot {
  public async isDelegated(sourceAccount: string): Promise<boolean> {
    if (account.wallet === null) {
      return false
    }

    const [
      delegateAccount,
      abstractedAccount
    ] = await Promise.all([
      contract.delegation(sourceAccount, ALL_SPACES),
      account.getAddress()
    ])

    return delegateAccount.toLowerCase() == abstractedAccount.toLowerCase()
  }

  public prepareDelegate(abstractedAccount: string) {
    const calldata = contract.interface.encodeFunctionData("setDelegate", [
      ALL_SPACES,
      abstractedAccount
    ])

    return {
      to: DELEGATION_CONTRACT_ADDRESS,
      data: calldata
    }
  }
}

export default new Snapshot()
