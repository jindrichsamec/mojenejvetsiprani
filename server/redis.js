'use strict'

const { createClient } = require('then-redis')

module.exports = () => {
  const {REDIS_URL} = process.env
  console.info(`Connecting to redis server on ${REDIS_URL}`)
  const client = createClient(REDIS_URL)

  client.on('error', function (err) {
    console.error('redis client error ', err)
  })
  return client
}
