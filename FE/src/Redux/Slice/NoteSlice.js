import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createNoteService, deleteNoteService, editNoteService } from '../../Redux/Service';

const NoteSlice = createSlice ({
    name: 'dataNote',
    initialState: [],
    reducers: {
        addNoteRedux: (state, action) => {
            let folder = { Id_Note: Math.floor(Math.random() * 10000), nameNote: action.payload.nameNote, idFolder: action.payload.idFolder, contentText: '', contentHTML: '' }
            state.push(folder)
        },
        deleteNoteRedux: (state, action) => {
            let findNote = state.find(item => item.Id_Note === action.payload.Id_Note);
            if(findNote){
                return state.filter(item => item.Id_Note !== action.payload.Id_Note)
            }
        },
        editNoteRedux: (state, action) => {
            const { id, name } = action.payload;
            let findNote = state.find(item => item.Id_Note === id);
            if(findNote){
                findNote.nameNote = name;
            }
        },
        editContentNoteRedux: (state, action) => {
            const { id, contentHTML, contentText } = action.payload;
            let findNote = state.find(item => item.Id_Note === id);
            if(findNote){
                findNote.contentHTML = contentHTML;
                findNote.contentText = contentText;
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createNoteSQL.fulfilled, (state, action) => {})
        builder.addCase(createNoteSQL.rejected, (state, action) => {})
        builder.addCase(deleteNoteSQL.fulfilled, (state, action) => {})
        builder.addCase(deleteNoteSQL.rejected, (state, action) => {})
        builder.addCase(editNoteSQL.fulfilled, (state, action) => {})
        builder.addCase(editNoteSQL.rejected, (state, action) => {})
    }
})

export const { addNoteRedux, deleteNoteRedux, editNoteRedux, editContentNoteRedux } = NoteSlice.actions;

export const createNoteSQL = createAsyncThunk('createNoteSQL', async(data, { rejectWithValue }) => {
    try {
        let res = await createNoteService(data);
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

export const deleteNoteSQL = createAsyncThunk('deleteNoteSQL', async(data, { rejectWithValue }) => {
    try {
        let res = await deleteNoteService(data);
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

export const editNoteSQL = createAsyncThunk('editNoteSQL', async(data, { rejectWithValue }) => {
    try {
        let res = await editNoteService(data);
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

export default NoteSlice.reducer;