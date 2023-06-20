import { createSlice } from '@reduxjs/toolkit';

export const studentSlice = createSlice({
    name: 'student',
    initialState: {
        students: []
    },
    reducers: {
        addStudent: (state, action) => {
            state.students.push(action.payload)
        },
        editStudent: (state, action) => {
            return {
                ...state,
                students: state.students.map((student, idx) => student.uuid === action.payload.uuid ? {...student, name: action.payload.name, email: action.payload.email, phone: action.payload.phone} : student)
            }

        },
        removeStudent: (state, action) => ({
            ...state,
            students: state.students.filter((e) => e.uuid !== action.payload)
        }),
    }
})

export const { addStudent, editStudent, removeStudent } = studentSlice.actions;

export default studentSlice.reducer