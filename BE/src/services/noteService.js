import db from "../models/index";

let getNote = (folder) => {
    return new Promise(async (resolve, reject) => {
        try {
            let findNote = await db.Note.findAll({
                where: { folderId: folder.folderId },
                attributes: ['id', 'nameNote', 'accountId', 'contentText', 'contentHTML', 'folderId' ],
                raw: true,
            })
            if (!findNote) findNote = [];
            resolve({
                errCode: 0,
                data: findNote
            })
        } catch (e) {
            reject(e);
        }
    })
}

let createNewNote = (data) => {
    return new Promise(async(resolve, reject) => {
        try{
            await db.Note.create({ 
                nameNote: data.nameNote,
                accountId: data.accountId,
                folderId: data.folderId
            })
            resolve({
                errCode: 0,
                errMessage: 'Tạo note thành công'
            })
        } catch(e){
            reject(e); 
        }
    })
}

let deleteNote = (noteId) => {
    return new Promise(async (resolve, reject) => {
        try{
            await db.Note.destroy({ 
                where: { id: noteId.id } 
            })
            resolve({
                errCode: 0,
                errMessage: 'Xóa note thành công'
            });
        } catch(e){
            reject(e);
        }
    })
}

let updateNote = (data) => {
    return new Promise(async (resolve, reject) => {
        try{
            await db.Note.update({ 
                nameNote: data.nameNote,
                contentText: data.contentText,
                contentHTML: data.contentHTML
            }, {
                where: {
                    id: data.id
                }
            });
            resolve({
                errCode: 0,
                errMessage: 'Cập nhật note thành công!'
            })
        } catch(e){
            reject(e);
        }
    })
}

module.exports = {
    getNote: getNote,
    createNewNote: createNewNote,
    deleteNote: deleteNote,
    updateNote: updateNote,
}

