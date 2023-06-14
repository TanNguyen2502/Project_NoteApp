import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createUserService, loginGoogleService, logoutService } from '../Service';

const UserSlice = createSlice ({
    name: 'dataUser',
    initialState: {
        userSQL: '',
        userSocial: '',
        statusLogin: false,
        userNewPassword: '',
        userEmailRecovery: ''
    },
    reducers: {
        saveUserSQL: (state, action) => {
            state.userSQL = action.payload;
        },
        saveUserSocial: (state, action) => {
            state.userSocial = action.payload;
        },
        loginAccountSuccess: (state, action) => {
            state.statusLogin = true;
        },
        logoutAccountSuccess: (state, action) => {
            state.statusLogin = false;
        },
        saveNewPassword: (state, action) => {
            state.userNewPassword = action.payload.passwordForget;
            state.userEmailRecovery = action.payload.emailForget;
        },
        clearUserState: (state, action) => {
            state.userSQL = '';
            state.userSocial = '';
        },
        clearNewPassword: (state, action) => {
            state.userNewPassword = '';
            state.userEmailRecovery = '';
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginSocialGoogle.fulfilled, (state, action) => {})
        builder.addCase(loginSocialGoogle.rejected, (state, action) => {})
        builder.addCase(logoutSQLSocial.fulfilled, (state, action) => {})
        builder.addCase(logoutSQLSocial.rejected, (state, action) => {})
        builder.addCase(createUserSQL.fulfilled, (state, action) => {})
        builder.addCase(createUserSQL.rejected, (state, action) => {})
    }
})

export const { saveUserSQL, saveUserSocial, clearUserState, saveNewPassword, clearNewPassword,
                loginAccountSuccess, logoutAccountSuccess, } = UserSlice.actions;

export const loginSocialGoogle = createAsyncThunk('loginSocialGoogle', async() => {
    let res = await loginGoogleService();
    const jsonData = await res.json();
    return jsonData;
});

export const logoutSQLSocial = createAsyncThunk('logoutSQLSocial', async() => {
    let res = await logoutService();
    const jsonData = await res.json();
    return jsonData;
});

export const createUserSQL = createAsyncThunk('createUserSQL', async(data, { rejectWithValue }) => {
    try {
        let res = await createUserService(data);
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

export default UserSlice.reducer;