function FileCommanderComponent(parent) {
    var fileCommanderWrapper = document.createElement('file-commander-wrapper')

    var fileCommander = {
        wrapper: fileCommanderWrapper,
        rootPath: 'C:\\'
    }

    function DirectoryComponent(parent, name) {
        var directoryWrapper = document.createElement('directory-wrapper')
        var nameTextNode = document.createTextNode(name)

        directoryWrapper.onclick = function() {
            fileCommander.rootPath += name + '\\'
            updateFileCommander()
        }

        directoryWrapper.appendChild(nameTextNode)
        parent.appendChild(directoryWrapper)
    }

    function FileComponent(parent, name) {
        var fileWrapper = document.createElement('file-wrapper')
        var nameTextNode = document.createTextNode(name)
        fileWrapper.appendChild(nameTextNode)
        parent.appendChild(fileWrapper)
    }

    function updateFileCommander() {
        fileCommanderWrapper.innerHTML = ''

        send('files', {path: fileCommander.rootPath + '*'}, function(files) {
            files.forEach(file => {
                if(file.type == 'dir') {
                    DirectoryComponent(fileCommanderWrapper, file.name)
                }
                else if(file.type == 'file') {
                    FileComponent(fileCommanderWrapper, file.name)
                }
            })
        })
    }

    updateFileCommander()

    parent.appendChild(fileCommanderWrapper)
}