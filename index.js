const fs = require('fs')
const http = require('http')
const server = http.createServer()
const path = require('path')
const publicDir = path.resolve(__dirname, 'public')

server.on('request', (request, response) => {
  const { url } = request
  console.log(url)
  switch (url) {
    case '/index.html':
      response.setHeader('Content-Type', 'text/html; charset=utf-8')
      fs.readFile(path.resolve(publicDir, 'index.html'), (error, data) => {
        if (error) throw error
        response.end(data.toString())
      })
      break
    case '/style.css':
      response.setHeader('Content-Type', 'text/css; charset=utf-8')
      fs.readFile(path.resolve(publicDir, 'style.css'), (error, data) => {
        if (error) throw error
        response.end(data.toString())
      })
      break
    case '/main.js':
      response.setHeader('Content-Type', 'text/javascript; charset=utf-8')
      fs.readFile(path.resolve(publicDir, 'main.js'), (error, data) => {
        if (error) throw error
        response.end(data.toString())
      })
      break
  }
})

server.listen('8888', () => {
  console.log('服务启动成功，请使用 8888 端口打开')
})