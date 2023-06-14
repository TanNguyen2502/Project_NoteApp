import axios from '../axios';

const loginService = (email, password) => {
    return axios.post('/auth/login', {email, password});
}
const loginGoogleService = () => {
	window.open("http://localhost:5000/auth/google", "_self");
}
const logoutService = () => {
	window.open("http://localhost:5000/auth/logout", "_self");
}
const recoveryPasswordService = (data) => {
    return axios.post('/auth/recovery-password', data);
}
const recoveryPasswordSuccessService = (data) => {
    return axios.post('/auth/recovery-password-success', data);
}

const createUserService = (data) => {
	return axios.post('/api/create-new-user', data);
}

const loadFolderService = (inputId) => {
	return axios.get(`/api/get-folder?id=${inputId}`);
}
const createFolderService = (data) => {
    return axios.post('/api/create-new-folder', data); 
}
const deleteFolderService = (inputId) => {
	return axios.delete('/api/delete-folder', {data: {id: inputId}});
}
const editFolderService = (data) => {
	return axios.put('/api/edit-folder', data);
}

const loadNoteService = (inputId) => {
	return axios.get(`/api/get-note?folderId=${inputId}`);
}
const createNoteService = (data) => {
    return axios.post('/api/create-new-note', data); 
}
const deleteNoteService = (inputId) => {
	return axios.delete('/api/delete-note', {data: {id: inputId}});
}
const editNoteService = (data) => {
	return axios.put('/api/edit-note', data);
}

export { 	
    loginService, loginGoogleService, logoutService, recoveryPasswordService, recoveryPasswordSuccessService,
	createUserService, 
    loadFolderService, createFolderService, deleteFolderService, editFolderService,
	loadNoteService, createNoteService, deleteNoteService, editNoteService
} 
