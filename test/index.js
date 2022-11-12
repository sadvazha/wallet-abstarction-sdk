const wasaSDK = require('../dist').default

const main = async () => {
  wasaSDK.account.generate()
  await wasaSDK.voting.snapshot.vote('nakrmili.eth', '0xfa7a35e233200f8536e05e5af705ff3768be4d54f165581ffa9200db4803582e', 1)
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
