import { create } from 'zustand';
import { Landing, Theme } from '../types';

interface LandingsState {
  isPending: boolean,
  isOpenNewLandingDialog: boolean,
  themes: Theme[],
  newLandingCloneName: Landing["name"] | null,
  setPending: (isPending: LandingsState["isPending"]) => void,
  addThemes: (data: Theme) => void,
  setIsOpenNewLandingDialog: (cloneName: Landing["name"] | null) => void,
  toggleNewLandingDialog: (state?: boolean) => void,
}

const useAppStore = create<LandingsState>()((set) => ({
  isPending: false,

  isOpenNewLandingDialog: false,

  themes: [],

  newLandingCloneName: null,

  setIsOpenNewLandingDialog: (cloneName) => {
    set({ isOpenNewLandingDialog: true });
    set({ newLandingCloneName: cloneName })
  },

  toggleNewLandingDialog: (state) => {
    set((s) => ({ isOpenNewLandingDialog: state ? state : !s.isOpenNewLandingDialog }));
  },

  setPending: (isPending) => set({ isPending }),

  addThemes: (data) => set((state) => ({ themes: [...state.themes, data] })),

}));

export default useAppStore;