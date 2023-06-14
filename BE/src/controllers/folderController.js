import folderService from '../services/folderService';

let handleGetFolder = async (req, res) => {
    if(!req.query){
        return res.status(300).json({
            errCode: -1,
            message: 'Nhập thiếu dữ liệu!'
        })
    }
    let data = await folderService.getFolder(req.query);
    return res.status(200).json(data);
}

let handleCreateNewFolder = async (req, res) => {
    if(!req.body.nameFolder || !req.body.id){
        return res.status(300).json({
            errCode: -1,
            message: 'Nhập thiếu dữ liệu!'
        })
    }
    let data = await folderService.createNewFolder(req.body);
    return res.status(200).json(data);
}

let handleEditFolder = async (req, res) => {
    if(!req.body.folderName || !req.body.id){
        return res.status(300).json({
            errCode: -1,
            message: 'Nhập thiếu dữ liệu!'
        })
    }
    let data = await folderService.updateFolder(req.body);
    return res.status(200).json(data);
}

let handleDeleteFolder = async (req, res) => {
    if(!req.body){
        return res.status(300).json({
            errCode: -1,
            message: 'Nhập thiếu dữ liệu!'
        })
    }
    let data = await folderService.deleteFolder(req.body);
    return res.status(200).json(data);
}

module.exports = {
    handleGetFolder: handleGetFolder,
    handleCreateNewFolder: handleCreateNewFolder,
    handleEditFolder: handleEditFolder,
    handleDeleteFolder: handleDeleteFolder
}