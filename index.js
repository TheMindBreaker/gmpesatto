const net = require("net");
let server = net.createServer();

server.on("connection", (socket) => {
    console.log("New Connection")
    socket.setKeepAlive(true);
    socket.setTimeout(10000);
    socket.on("data", function (data) {
        try {
            let params = JSON.parse(data.toString());
            console.log(params);
        } catch(e) {
            console.log(e)
        }
        
    })

    socket.on("timeout", () => {
        login.logout(socket.remotePort, socket.remoteAddress, clients[socket.remotePort].id);
        delete clients[socket.remotePort];
    })

    socket.on("error", (err) => {})
})

server.on("error", (err) => {})


server.on("listening", () => {
    log.info("SERVER LISTENING: 3080");
})
