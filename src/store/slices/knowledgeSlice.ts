import {createSlice} from '@reduxjs/toolkit';
import {knowledgeTree} from '../../data/mockKnowledge';

const knowledgeSlice = createSlice({
  name: 'knowledge',
  initialState: knowledgeTree,
  reducers: {
    replaceTree(_state, action) {
      return action.payload;
    }
  }
});

export const { replaceTree } = knowledgeSlice.actions;
export const knowledgeReducer = knowledgeSlice.reducer;

