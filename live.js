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
            switch (params.method) {
                case "login":
                    login.init(params, log, socket, response => {
                        if (response.success) {
                            logger.info("LOGIN FROM : ", socket.remotePort)
                            logger.info(response)
                        }
                        logger.info('LOGIN DATA: ', socket.remotePort, " //// ", response)
                        response = JSON.stringify({
                            "method": "login",
                            "result":
                                {
                                    "register": 0,
                                    "historic":  "51.222.106.27:3080",
                                    "liveData": "51.222.106.27:3081",
                                    "realTime": new Date().getTime(),
                                    "para_command": "01030000005045F6;0101000000503C36",
                                    "con_command": "01030000005045F6;0101000000503C36",
                                    "online_rate": 15,
                                    "offline_rate": 15,
                                },
                            "retcode": "000000"
                        });
                        socket.write(response)
                    })
                    break
                default:
                    logger.info(params)
                    break
            }
        } catch (e) {
            log.error(e);
        }
    })


    socket.on("error", (err) => {})
})

server.on("error", (err) => {})


server.on("listening", () => {
    logger.info("LIVE SERVER LISTENING: 3080");
    
})

server.listen(3080, "0.0.0.0", function() {
    var host = server.address().address;
    logger.info('LIVE Server Listening at:' + host + ":3080");
});