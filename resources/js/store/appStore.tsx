import { create } from 'zustand';

interface LandingsState {
  isPending: boolean,
  isOpenNewLandingDialog: boolean,
  newLandingCloneName: App.Models.Landing["name"] | null,
  isPagePending: boolean,

  setPending: (isPending: LandingsState["isPending"]) => void,
  setIsOpenNewLandingDialog: (cloneName: App.Models.Landing["name"] | null) => void,
  toggleNewLandingDialog: (state?: boolean) => void,
  setPagePending: (isPagePending: boolean) => void,
}

const useAppStore = create<LandingsState>()((set) => ({
  isPending: false,

  isPagePending: false,

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

  setPagePending: (isPagePending) => set({ isPagePending })

}));

export default useAppStore;