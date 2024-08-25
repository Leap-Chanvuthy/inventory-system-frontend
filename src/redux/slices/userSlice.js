import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    users: [], 
    status: 'idle',
    error: null,
    loading: false,
};

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
 
        setUsers(state, action) {
            state.users = action.payload;
            state.status = 'succeeded';
            state.loading = false;
        },

        addUser(state, action) {
            state.users.push(action.payload);
        },

        updateUser(state, action) {
            const { id, updatedUser } = action.payload;
            const index = state.users.findIndex(user => user.id === id);
            if (index !== -1) {
                state.users[index] = { ...state.users[index], ...updatedUser };
            }
        },

        deleteUser(state, action) {
            const id = action.payload;
            state.users = state.users.filter(user => user.id !== id);
        },

        setStatus(state, action) {
            state.status = action.payload;
        },

        setLoading(state, action) {
            state.loading = action.payload;
        },

        setError(state, action) {
            state.error = action.payload;
            state.status = 'failed';
            state.loading = false;
        },
    },
});


export const {
    setUsers,
    addUser,
    updateUser,
    deleteUser,
    setStatus,
    setLoading,
    setError,
} = userSlice.actions;


export default userSlice.reducer;
