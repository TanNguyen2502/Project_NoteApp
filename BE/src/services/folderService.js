import db from "../models/index";

let getFolder = (accountId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let findFolder = await db.Folder.findAll({
                where: { accountId: accountId.id },
                attributes: ['id', 'folderName'],
                raw: true,
            })
            if (!findFolder) findFolder = [];
            resolve({
                errCode: 0,
                data: findFolder
            })
        } catch (e) {
            reject(e);
        }
    })
}

let createNewFolder = (data) => {
    return new Promise(async(resolve, reject) => {
        try{
            await db.Folder.create({ 
                folderName: data.nameFolder,
                accountId: data.id
            })
            resolve({
                errCode: 0,
                errMessage: 'Tạo folder thành công'
            })
        } catch(e){
            reject(e); 
        }
    })
}

let deleteFolder = (folderId) => {
    return new Promise(async (resolve, reject) => {
        try{
            await db.Folder.destroy({ 
                where: { id: folderId.id } 
            })
            resolve({
                errCode: 0,
                errMessage: 'Xóa folder thành công'
            });
        } catch(e){
            reject(e);
        }
    })
}

let updateFolder = (data) => {
    return new Promise(async (resolve, reject) => {
        try{
            await db.Folder.update({ folderName: data.folderName }, {
                where: {
                    id: data.id
                }
            });
            resolve({
                errCode: 0,
                errMessage: 'Cập nhật folder thành công!'
            })
        } catch(e){
            reject(e);
        }
    })
}

module.exports = {
    getFolder: getFolder,
    createNewFolder: createNewFolder,
    deleteFolder: deleteFolder,
    updateFolder: updateFolder
}