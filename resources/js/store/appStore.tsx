import { create } from 'zustand';
import { Landing, Theme } from '../types';

interface LandingsState {
  isPending: boolean, 
  isOpenNewLandingDialog: boolean, 
  themes: Theme[],
  newLandingCloneName: Landing["name"] | null,
  setPending: (isPending: LandingsState["isPending"]) => void,  
  setIsOpenNewLandingDialog: (state: boolean, cloneName: Landing["name"] | null) => void,  
  addThemes: (data: Theme) => void,
}

const useAppStore = create<LandingsState>()((set) => ({
  isPending: false,

  isOpenNewLandingDialog: false,

  themes: [],

  newLandingCloneName: null,

  setIsOpenNewLandingDialog: (state, cloneName) => {
    set({ isOpenNewLandingDialog: state });
    set({ newLandingCloneName: cloneName })
  },  

  setPending: (isPending) => set({ isPending }),
  
  addThemes: (data) => set((state) => ({ themes: [...state.themes, data] })),  

}));

export default useAppStore;