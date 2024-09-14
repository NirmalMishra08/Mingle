import {createSlice}  from '@reduxjs/toolkit'

 const authSlice = createSlice({
    name:'auth',
    initialState:{
        user:null,
        suggestedUser:[],
        userProfile:null,
        selectedUser:null,

    },
    reducers:{
        //actions
        setAuthUser:(state,action)=>{
            state.user = action.payload;
        },
        setSuggestedUsers:(state,action)=>{
             state.suggestedUser = action.payload;
        },
        setUserProfile:(state,action)=>{
            state.userProfile = action.payload;
        },
        setSelectedUser:(state,action)=>{
            state.selectedUser = action.payload;
        },
    }
 });
 export const {setAuthUser,setSuggestedUsers,setUserProfile,setSelectedUser} = authSlice.actions;
 export default authSlice.reducer;