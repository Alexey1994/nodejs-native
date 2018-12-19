var ffi = require('ffi')

var msvcrt = ffi.Library('msvcrt', {
    'printf': ['void', ['string']]
})

msvcrt.printf("sadfas")