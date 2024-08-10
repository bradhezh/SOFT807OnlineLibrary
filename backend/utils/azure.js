const {DefaultAzureCredential} = require("@azure/identity")
const {SecretClient} = require("@azure/keyvault-secrets")

const nameKeyVault = 'soft807onlinelibraryzjz'
const urlKeyVault = `https://${nameKeyVault}.vault.azure.net/`

const credential = new DefaultAzureCredential()
const client = new SecretClient(urlKeyVault, credential);

const getSec = async (name) => {
  const data = await client.getSecret(name)
  return data.value
}

module.exports = {
  getSec,
}
