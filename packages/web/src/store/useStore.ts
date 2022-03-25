import create from 'zustand';
import createUserSlice, { UserSlice } from './userSlice';

export type AppState = UserSlice;

const useStore = create<AppState>((set, get) => ({
  ...createUserSlice(set, get),
}));

export default useStore;
