import { create } from 'zustand';

interface LandingsState {
  isPending: boolean,
  isOpenNewLandingDialog: boolean,  
  newLandingCloneName: App.Models.Landing["name"] | null,
  setPending: (isPending: LandingsState["isPending"]) => void,
  setIsOpenNewLandingDialog: (cloneName: App.Models.Landing["name"] | null) => void,
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

}));

export default useAppStore;