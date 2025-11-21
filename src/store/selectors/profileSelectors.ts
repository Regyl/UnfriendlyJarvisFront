import {RootState} from '..';

export const selectProfile = (state: RootState) => state.profile;
export const selectFeed = (state: RootState) => state.feed;
export const selectKnowledgeTree = (state: RootState) => state.knowledge;

