const aws = require('aws-sdk')

const secmgr = new aws.SecretsManager({
  region: 'ap-southeast-2',
})

const getSec = async (name) => {
  const data = await secmgr.getSecretValue({
    SecretId: name,
  }).promise()

  if ('SecretString' in data) {
    return data.SecretString
  }
  const buff = new Buffer.from(data.SecretBinary, 'base64')
  return buff.toString('ascii')
}

module.exports = {
  getSec,
}
