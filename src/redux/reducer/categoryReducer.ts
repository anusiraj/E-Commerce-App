import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";

import { Category } from "../../types/Category";

const initialState: Category[] = []
export const fetchAllCategories = createAsyncThunk(
    'fetchAllCategories',
    async(selectedCategory) => {
        try {
            const jsondata = await fetch("https://api.escuelajs.co/api/v1/categories")
            const data: Category|Error = await jsondata.json()
            return data
        }
        catch (e: any) {
            console.log(e)
        }
    }
)
const categorySlice = createSlice({
    name: "categorySlice",
    initialState: initialState,
    reducers: {
    },
    extraReducers: (build) => {
        build.addCase(fetchAllCategories.fulfilled, (state, action: Category | any) => {
            if (action.payload && "message" in action.payload) {
                return state
            } else if (!action.payload) {
                return state
            }
            return action.payload
        })
        build.addCase(fetchAllCategories.rejected, (state, action) => {
            console.log("error in fetching data")
            return state
        })
        build.addCase(fetchAllCategories.pending, (state, action) => {
            console.log("data is loading ...")
            return state
        })
    }
})
const categoryReducer = categorySlice.reducer
export default categoryReducer
