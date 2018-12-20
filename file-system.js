var ffi       = require('ffi')
var ref       = require('ref')
var struct    = require('ref-struct')
var array     = require('ref-array')
var converter = require('./converter')

var FILE_ATTRIBUTE_DIRECTORY = 16

var FILETIME = struct({
    low_date_time:  'uint32',
    high_date_time: 'uint32'
})

var WIN32_FIND_DATAA = struct({
    attributes:         'uint32',
    creation_time:      FILETIME,
    last_access_time:   FILETIME,
    last_write_time:    FILETIME,
    file_size_high:     'uint32',
    file_size_low:      'uint32',
    reserved1:          'uint32',
    reserved2:          'uint32',
    file_name:           array('char', 260),
    alternate_file_name: array('char', 14),
    file_type:          'uint32',
    creator_type:       'uint32',
    finder_flags:       'uint16'
})

var WIN32_FIND_DATAA_ptr = ref.refType(WIN32_FIND_DATAA)

var kernel32 = ffi.Library('kernel32', {
    FindFirstFileA: ['uint32', ['string', WIN32_FIND_DATAA_ptr]],
    FindClose: ['uint32', ['uint32']],
    FindNextFileA: ['uint32', ['uint32', WIN32_FIND_DATAA_ptr]]
})

function getFileStructure(rootFolder) {
    var findData = new WIN32_FIND_DATAA()

    var fileFinder = kernel32.FindFirstFileA(rootFolder, findData.ref())

    if(fileFinder == 0xffffffff)
        return null

    var fileStructure = []

    do
    {
        var fileName = converter.fromBufferToString(findData.file_name)

        var type = findData.attributes & FILE_ATTRIBUTE_DIRECTORY
            ? 'dir'
            : 'file'

        //console.log(fileName, type, fileFinder)
        fileStructure.push({
            name: fileName,
            type
        })
    }
    while(kernel32.FindNextFileA(fileFinder, findData.ref()));

    kernel32.FindClose(fileFinder)

    return fileStructure
}

module.exports.getFileStructure = getFileStructure