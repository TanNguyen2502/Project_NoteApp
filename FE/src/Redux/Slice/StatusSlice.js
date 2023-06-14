import { createSlice } from '@reduxjs/toolkit';

const StatusSlice = createSlice ({
    name: 'statusApp',
    initialState: {
        statusFromCreate: false,
        statusFromForget: false,
        statusCreateFolder: false,
        statusEditFolder: false,
        currentFolder: '',
        currentNote: ''
    },
    reducers: {
        successCreateAccount: (state, action) => {
            state.statusFromCreate = true;
            state.statusFromForget = false;
        },
        successForgetPassword: (state, action) => {
            state.statusFromForget = true;
            state.statusFromCreate = false;
        },
        getCurrentFolder: (state, action) => {
            state.currentFolder = action.payload;
        },
        getCurrentNote: (state, action) => {
            state.currentNote = action.payload;
        },
        openCreateFolderModal: (state, action) => {
            state.statusCreateFolder = true;
        },
        openCreateNoteModal: (state, action) => {
            state.statusCreateFolder = false;
        },
        openEditFolderModal: (state, action) => {
            state.statusEditFolder = true;
        },
        openEditNoteModal: (state, action) => {
            state.statusEditFolder = false;
        }
    }
})

export const {  successCreateAccount, successForgetPassword, 
                getCurrentFolder, openCreateFolderModal, openCreateNoteModal, 
                openEditFolderModal, openEditNoteModal, getCurrentNote } = StatusSlice.actions;

export default StatusSlice.reducer;