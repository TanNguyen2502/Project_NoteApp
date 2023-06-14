import noteService from '../services/noteService';

let handleGetNote = async (req, res) => {
    if(!req.query){
        return res.status(300).json({
            errCode: -1,
            message: 'Nhập thiếu dữ liệu!'
        })
    }
    let data = await noteService.getNote(req.query);
    return res.status(200).json(data);
}

let handleCreateNewNote = async (req, res) => {
    if(!req.body.nameNote || !req.body.folderId || !req.body.accountId){
        return res.status(300).json({
            errCode: -1,
            message: 'Nhập thiếu dữ liệu!'
        })
    }
    let data = await noteService.createNewNote(req.body);
    return res.status(200).json(data);
}

let handleEditNote = async (req, res) => {
    if(!req.body.id){
        return res.status(300).json({
            errCode: -1,
            message: 'Nhập thiếu dữ liệu!'
        })
    }
    let data = await noteService.updateNote(req.body);
    return res.status(200).json(data);
}

let handleDeleteNote = async (req, res) => {
    if(!req.body){
        return res.status(300).json({
            errCode: -1,
            message: 'Nhập thiếu dữ liệu!'
        })
    }
    let data = await noteService.deleteNote(req.body);
    return res.status(200).json(data);
}

module.exports = {
    handleGetNote: handleGetNote,
    handleCreateNewNote: handleCreateNewNote,
    handleEditNote: handleEditNote,
    handleDeleteNote: handleDeleteNote
}
