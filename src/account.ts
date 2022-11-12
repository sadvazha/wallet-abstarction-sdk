import {
  Wallet,
  TypedDataDomain, TypedDataField
} from 'ethers'

const ERROR_NO_WALLET = 'ERROR_NO_WALLET'

class Account {
  public wallet: Wallet | null = null

  public new() {
    this.wallet = Wallet.createRandom()
  }

  public getAddress(): Promise<string> {
    if (this.wallet === null) {
      throw new Error(ERROR_NO_WALLET)
    }

    return this.wallet.getAddress()
  }

  public signTypedData(
    domain: TypedDataDomain,
    types: Record<string, Array<TypedDataField>>,
    value: Record<string, any>
  ): Promise<string> {
    if (this.wallet === null) {
      throw new Error(ERROR_NO_WALLET)
    }

    return this.wallet._signTypedData(domain, types, value)
  }
}

export default new Account()
