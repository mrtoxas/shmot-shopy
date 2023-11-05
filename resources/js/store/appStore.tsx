import { create } from 'zustand';

interface AppState {
  isPending: boolean,
  isPagePending: boolean,
  isOpenNewLandingDialog: boolean,
  isOpenNewProductDialog: boolean,
  newLandingCloneName: App.Models.Landing["name"] | null,  

  setPending: (isPending: AppState["isPending"]) => void,
  setIsOpenNewProductDialog: () => void,
  toggleNewLandingDialog: (state?: boolean) => void,
  setPagePending: (isPagePending: boolean) => void,
  setNewLandingCloneName: (cloneName: App.Models.Landing["name"]) => void;
  toggleNewProductDialog: (state: boolean) => void;
}

const useAppStore = create<AppState>()((set) => ({
  isPending: false,
  isPagePending: false,
  isOpenNewLandingDialog: false,
  isOpenNewProductDialog: false,
  newLandingCloneName: null,

  setPending: (isPending) => set({ isPending }),

  setIsOpenNewProductDialog: () => {
    set({ isOpenNewProductDialog: true });
  },

  toggleNewLandingDialog: (state) => {
    set((s) => ({ isOpenNewLandingDialog: state ? state : !s.isOpenNewLandingDialog }));
  },

  setPagePending: (isPagePending) => set({ isPagePending }),

  setNewLandingCloneName: (cloneName) => set({ newLandingCloneName: cloneName }),

  toggleNewProductDialog: (state) => {
    set((s) => ({ isOpenNewProductDialog: state ? state : !s.isOpenNewProductDialog }));
  },

}));

export default useAppStore;