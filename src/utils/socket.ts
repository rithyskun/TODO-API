function socket(io: any) {
    io.on('connection', (socket: any) => {
      socket.on('connected', () => {
        console.log('client connected!')
      })
  
      socket.on('disconnect', () => {
        console.log('client disconnected!')
      })
    })
  }
  
  export default socket
  