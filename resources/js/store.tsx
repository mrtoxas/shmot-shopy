import { create } from 'zustand';
import { Landing, Theme } from './types';

interface LandingState {
  isPending: boolean,
  landings: Landing[],
  currentLanding: Landing | null;
  themes: Theme[],
  setPending: (isPending: LandingState["isPending"]) => void,
  addLandings: (data: Landing) => void,
  addCurrentLanding: (data: Landing) => void,
  removeLanding: (landingId: number) => void,
  addThemes: (data: Theme) => void  
}

const useStore = create<LandingState>()((set) => ({
  isPending: false,

  landings: [],

  themes: [],

  currentLanding: null,

  setPending: (isPending) => set({ isPending }),

  addLandings: (data) => {
    set((state) => ({
      landings: Array.isArray(data) ? data : [data, ...state.landings],
    }));
  },

  addCurrentLanding: (data) => set({ currentLanding: data }),

  addThemes: (data) => set((state) => ({ themes: [...state.themes, data] })),

  removeLanding: (landingId) => {
    set((state) => ({
      landings: state.landings.filter((landing) => landing.id !== landingId),
    }));
  },

}));

export default useStore;