const fs = require('fs')
const http = require('http')
const server = http.createServer()
const path = require('path')
const publicDir = path.resolve(__dirname, 'public')
const url = require('url')

server.on('request', (request, response) => {
  const { pathname } = url.parse(request.url)
  const filename = pathname.substr(1) || 'index.html'
  // response.setHeader('Content-Type', 'text/html; charset=utf-8')
  fs.readFile(path.resolve(publicDir, filename), (error, data) => {
    if (error) {
      if (error.errno === -4058) {
        response.statusCode = 404
        fs.readFile(path.resolve(publicDir, '404.html'), (error, data) => {
          response.end(data.toString())
        })
      } else if (error.errno === -4068) {
        response.statusCode = 403
        response.end('无权查看目录内容')
      } else {
        response.statusCode = 500
        response.end('服务器发生未知错误，请稍后重试')
      }
    } else {
      response.end(data.toString())
    }
  })
})

server.listen('8888', () => {
  console.log('服务启动成功，请使用 8888 端口打开')
})