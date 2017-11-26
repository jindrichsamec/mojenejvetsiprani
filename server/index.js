const io = require('socket.io')();
const redis = require('./redis')();

const WISH_REDIS_KEY = 'wishes:list'

async function onWishAdded(data) {
  await redis.hset(WISH_REDIS_KEY, data.id, JSON.stringify(data));
}

async function onWishRemoved(data) {
  await redis.hdel(WISH_REDIS_KEY, data.id);
}

async function onWishUpdated(data) {
  const wishExists = await redis.hexists(WISH_REDIS_KEY, data.id);
  if (wishExists) {
    await redis.hset(WISH_REDIS_KEY, data.id, JSON.stringify(data));
  }
}

async function getWishList() {
  const serialized = await redis.hvals(WISH_REDIS_KEY)
  return serialized.map(s => JSON.parse(s))
}

io.on('connection', socket => {

  getWishList().then((wishes) => socket.emit('WISH_LIST', wishes));

  const actions = [
    { event: 'WISH_ADDED', handler: onWishAdded },
    { event: 'WISH_REMOVED', handler: onWishRemoved },
    { event: 'WISH_UPDATED', handler: onWishUpdated }
  ]
  actions.map(action => {
    socket.on(action.event, (data) => {
      console.info('=> incoming', action.event, data)
      action.handler(data).then(() => {
        console.info('<= outgoing', action.event, data)
        socket.broadcast.emit(action.event, data);
      })
    })
  })

})

const PORT = process.env.PORT || 5000;
io.listen(PORT);
console.log(`listening on port ${PORT}...`)
