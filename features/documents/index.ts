import { createSelector, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../../store";
import { Document, DocumentsState } from "./types";

export const initialState: DocumentsState = {
  documents: [],
};

const documentsSlice = createSlice({
  name: "documents",
  initialState,
  reducers: {
    setDocuments: (state: DocumentsState, action: PayloadAction<Document[]>) => {
      state.documents = action.payload;
    },
  },
});

export const { setDocuments } = documentsSlice.actions;
const selectDocumentsState = (state: RootState): DocumentsState => state.documents;
export const selectDocuments = createSelector(selectDocumentsState, (docs: DocumentsState): Document[] => docs.documents);

export default documentsSlice.reducer;