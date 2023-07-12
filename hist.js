const net = require("net");
let server = net.createServer();
const winston = require('winston')
const consoleTransport = new winston.transports.Console()
const myWinstonOptions = {
    transports: [consoleTransport]
}
const logger = new winston.createLogger(myWinstonOptions)

server.on("connection", (socket) => {
    logger.info("LIVE: New Connection")
    socket.setKeepAlive(true);
    socket.setTimeout(10000);
    socket.on("data", function (data) {
        try {
            let params = JSON.parse(data.toString());
            logger.info(params);
        } catch(e) {
            logger.error(e)
        }
        
    })


    socket.on("error", (err) => {})
})

server.on("error", (err) => {})


server.on("listening", () => {
    logger.info("HIST SERVER LISTENING: 3081");
})

server.listen(3081, "0.0.0.0", function() {
    var host = server.address().address;
    logger.info('HIST Server Listening at:' + host + ":3081");
});
