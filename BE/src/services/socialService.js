import db from "../models/index";

let checkUser = (checkId) => {
    return new Promise(async(resolve, reject) => {
        try{
            let userSocial = await db.User.findOne({
                where: { idSocial: checkId }
            });
            if(userSocial){
                resolve(true)
            } else{
                resolve(false)
            }
        } catch(e){
            reject(e);
        }
    })
}

let manageAccount = (value) => {
    return new Promise(async(resolve, reject) => {
        try{
            let data = {};
            let checkIdSocial = await checkUser(value.id);
            if(checkIdSocial === true){
                let user = await db.User.findOne({
                    attributes: ['id', 'idSocial', 'nameLogin'],
                    where: { idSocial: value.id },
                    raw: true
                });
                if(user){
                    data.user = user;
                }
            } else{
                await db.User.create({ 
                    idSocial: value.id,
                    nameLogin: value.displayName
                })
                let user = await db.User.findOne({
                    attributes: ['id', 'idSocial', 'nameLogin'],
                    where: { idSocial: value.id },
                    raw: true
                });
                if(user){
                    data.user = user;
                }
            }
            resolve(data)
        } catch(e){
            reject(e);
        }
    })
}

module.exports = {
    manageAccount: manageAccount
}