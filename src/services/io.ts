import { Server } from 'socket.io'

class Io {
  io: Server
  users = new Map()

  async init(server) {
    this.io = new Server(server, {
      cors: {
        origin: 'http://localhost:3000',
        credentials: true,
      },
    });
    
    this.onConnection()
  }

  async onConnection() {
    this.io.on('connection', socket => {
      socket.on("add-user", (userId) => {
        if (this.users.has(userId)) {
          this.users.delete(userId)
        }
        console.log(userId)
        this.users.set(userId, socket.id);
      });
    });
  }
}

export default new Io()
