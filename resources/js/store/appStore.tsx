import { create } from 'zustand';

interface LandingsState {
  isPending: boolean,
  isOpenNewLandingDialog: boolean,
  isOpenNewProductDialog: boolean,
  newLandingCloneName: App.Models.Landing["name"] | null,
  isPagePending: boolean,

  setPending: (isPending: LandingsState["isPending"]) => void,
  setIsOpenNewLandingDialog: (cloneName: App.Models.Landing["name"] | null) => void,
  setIsOpenNewProductDialog: () => void,
  toggleNewLandingDialog: (state?: boolean) => void,
  setPagePending: (isPagePending: boolean) => void,
}

const useAppStore = create<LandingsState>()((set) => ({
  isPending: false,

  isPagePending: false,

  isOpenNewLandingDialog: false,

  themes: [],

  newLandingCloneName: null,

  setIsOpenNewProductDialog: () => {
    set({ isOpenNewProductDialog: true });
  },

  toggleNewLandingDialog: (state) => {
    set((s) => ({ isOpenNewLandingDialog: state ? state : !s.isOpenNewLandingDialog }));
  },

  toggleNewProductDialog: (state) => {
    set((s) => ({ isOpenNewProductDialog: state ? state : !s.isOpenNewProductDialog }));
  },

  setPending: (isPending) => set({ isPending }),

  setPagePending: (isPagePending) => set({ isPagePending }),

  setNewLandingCloneName: (cloneName) => set({ newLandingCloneName: cloneName })

}));

export default useAppStore;