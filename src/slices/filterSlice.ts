import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface FieldsState {
    [key: string]: string[] | number[] | string
}

const initialState: FieldsState = {}

const filterSlice = createSlice({
    initialState,
    name: "filterFieldsReducer",
    reducers: {
        updateFieldFilter: (state, action: PayloadAction<{ key: string, value: string | number[] }>) => {
            const {key, value} = action.payload;
            if (key === "name") {
                state[key] = value;
            } else if (typeof value === "string") {
                if (!state[key]) {
                    state[key] = key === "name" ? value : [value];
                } else {
                    const stringArray = state[key] as string[];
                    state[key] = stringArray.includes(value) ?
                        stringArray.filter(item => item !== value) :
                        [...stringArray, value]
                }
            } else if (Array.isArray(value)) {
                state[key] = value
            }
            // console.log(JSON.parse(JSON.stringify(state)));
            if (state[key] && state[key].length === 0) {
                delete state[key]; // Mutates the draft directly
            }
        },
        resetFieldFilter: () => initialState
    },
})

export const {updateFieldFilter, resetFieldFilter} = filterSlice.actions;

export const selectFilteredFieldState = (state: { filterFieldsReducer: FieldsState }) => state.filterFieldsReducer

export default filterSlice.reducer;
