const http = require('http')
const server = http.createServer()

server.on('request', (request, response) => {
  response.end('hello')
})

server.listen('8888', () => {
  console.log('服务启动成功，请使用 8888 端口打开')
})