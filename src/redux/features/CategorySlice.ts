import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Category } from "../../types/Category";

interface CategoryState {
  categories: Category[];
}

const initialState: CategoryState = {
  categories: [
    { id: 0, name: "Review" },
    { id: 1, name: "Implement" },
    { id: 2, name: "Document" },
    { id: 3, name: "Design" },
  ],
};

export const CategorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
});

export default CategorySlice.reducer;
export const {} = CategorySlice.actions;
