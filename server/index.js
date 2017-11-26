const io = require('socket.io')();

const wishes = []

function onWishAdded(data) {
  wishes.push(data)
}

function onWishRemoved(data) {
  const index = wishes.findIndex(((w) => w.name === data.name))
  wishes.splice(index, 1);
}

function onWishUpdated(data) {
  const index = wishes.findIndex(((w) => w.name === data.name))
  wishes[index] = data;
}

io.on('connection', socket => {

  socket.emit('WISH_LIST', wishes)

  const actions = [
    { event: 'WISH_ADDED', handler: onWishAdded },
    { event: 'WISH_REMOVED', handler: onWishRemoved },
    { event: 'WISH_UPDATED', handler: onWishUpdated }
  ]
  actions.map(action => {
    socket.on(action.event, (data) => {
      action.handler(data)
      socket.broadcast.emit(action.event, data);
    })
  })

})

const PORT = process.env.PORT || 5000;
io.listen(PORT);
console.log(`listening on port ${PORT}...`)
