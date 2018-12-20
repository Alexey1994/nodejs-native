var express = require('express')
var bodyParser = require('body-parser')
var fileSystem = require('./file-system')

var server = express()

server.use(bodyParser.json())
server.use(express.static(__dirname + '/view'))

server.post('/files', function(request, response) {
    var path = request.body.path
    var files = fileSystem.getFileStructure(path)
    response.send(files)
})

server.listen(8000)