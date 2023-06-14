import express from "express";

import userController from "../controllers/userController";
import folderController from "../controllers/folderController";
import noteController from "../controllers/noteController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.post('/auth/login', userController.handleLogin);
    router.post('/auth/recovery-password', userController.recoveryPassword);
    router.post('/auth/recovery-password-success', userController.recoveryPasswordSuccess);

    router.post('/api/create-new-user', userController.handleCreateNewUser);

    router.get('/api/get-folder', folderController.handleGetFolder);
    router.post('/api/create-new-folder', folderController.handleCreateNewFolder); 
    router.put('/api/edit-folder', folderController.handleEditFolder);
    router.delete('/api/delete-folder', folderController.handleDeleteFolder);

    router.get('/api/get-note', noteController.handleGetNote);
    router.post('/api/create-new-note', noteController.handleCreateNewNote); 
    router.put('/api/edit-note', noteController.handleEditNote);
    router.delete('/api/delete-note', noteController.handleDeleteNote);

    return app.use("/", router);
}

module.exports = initWebRoutes;


