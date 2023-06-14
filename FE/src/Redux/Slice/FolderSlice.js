import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createFolderService, deleteFolderService, editFolderService } from '../../Redux/Service';

const FolderSlice = createSlice ({
    name: 'dataFolder',
    initialState: [],
    reducers: {
        addFolderRedux: (state, action) => {
            let folder = { Id_Folder: Math.floor(Math.random() * 10000), folderName: action.payload }
            state.push(folder)
        },
        deleteFolderRedux: (state, action) => {
            let findFolder = state.find(item => item.Id_Folder === action.payload.Id_Folder);
            if(findFolder){
                return state.filter(item => item.Id_Folder !== action.payload.Id_Folder)
            }
        },
        editFolderRedux: (state, action) => {
            const { id, name } = action.payload;
            let findFolder = state.find(item => item.Id_Folder === id);
            if(findFolder){
                findFolder.folderName = name;
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createFolderSQL.fulfilled, (state, action) => {})
        builder.addCase(createFolderSQL.rejected, (state, action) => {})
        builder.addCase(deleteFolderSQL.fulfilled, (state, action) => {})
        builder.addCase(deleteFolderSQL.rejected, (state, action) => {})
        builder.addCase(editFolderSQL.fulfilled, (state, action) => {})
        builder.addCase(editFolderSQL.rejected, (state, action) => {})
    }
})

export const { addFolderRedux, deleteFolderRedux, editFolderRedux } = FolderSlice.actions;

export const createFolderSQL = createAsyncThunk('createFolderSQL', async(data, { rejectWithValue }) => {
    try {
        let res = await createFolderService(data);
        if(res && res.errCode === 0){
            const jsonData = await res.json();
            return jsonData;
        } else{ 
            console.log(res.errCode);
            console.log(res.errMessage);
        }
    } catch (e) {
        rejectWithValue(e.response);
    }
});

export const deleteFolderSQL = createAsyncThunk('deleteFolderSQL', async(data, { rejectWithValue }) => {
    try {
        let res = await deleteFolderService(data);
        if(res && res.errCode === 0){
            const jsonData = await res.json();
            return jsonData;
        } else{ 
            console.log(res.errCode);
            console.log(res.errMessage);
        }
    } catch (e) {
        rejectWithValue(e.response);
    }
});

export const editFolderSQL = createAsyncThunk('editFolderSQL', async(data, { rejectWithValue }) => {
    try {
        let res = await editFolderService(data);
        if(res && res.errCode === 0){
            const jsonData = await res.json();
            return jsonData;
        } else{ 
            console.log(res.errCode);
            console.log(res.errMessage);
        }
    } catch (e) {
        rejectWithValue(e.response);
    }
});

export default FolderSlice.reducer;