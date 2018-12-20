function fromBufferToString(buffer) {
    var string = ''

    for(var i = 0; i < buffer.length && buffer[i]; ++i)
        string += String.fromCharCode(buffer[i])

    return string
}

module.exports.fromBufferToString = fromBufferToString