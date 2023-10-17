import { create } from 'zustand';
import { Landing, Theme } from './types';
import { AxiosResponse } from 'axios';

interface CreateLandingProps {
  name: Landing["name"],
  clone?: Landing["name"]
}

interface LandingState {
  isPending: boolean,
  landings: Landing[],
  currentLanding: Landing | null;
  themes: Theme[],
  setPending: (isPending: LandingState["isPending"]) => void,
  addCurrentLanding: (data: Landing) => void,
  removeLanding: (id: Landing["id"]) => Promise<AxiosResponse>,
  createLanding: (props: CreateLandingProps) => Promise<AxiosResponse>,
  getLandings: () => Promise<AxiosResponse>,
  addThemes: (data: Theme) => void
}

const useStore = create<LandingState>()((set) => ({
  isPending: false,

  landings: [],

  themes: [],

  currentLanding: null,

  setPending: (isPending) => set({ isPending }),

  addCurrentLanding: (data) => set({ currentLanding: data }),

  addThemes: (data) => set((state) => ({ themes: [...state.themes, data] })),

  removeLanding: async (id) => {
    const response = await window.axios.delete(route('landings.destroy', { id }));
    set((state) => ({
      landings: state.landings.filter((landing) => landing.id !== id),
    }));
    return response;
  },

  getLandings: async () => {
    const response = await window.axios.get(route('landings.index'));
    const { data } = response;
    set((state) => ({
      landings: Array.isArray(data) ? data : [data, ...state.landings],
    }));
    return response;
  },

  createLanding: async ({ name, clone }) => {
    const response = await window.axios.post(route('landings.store', { name, ...(clone && { clone }) }));
    const { data } = response;
    const responseData = Array.isArray(data.data) ? data.data : [data.data];
    set((state) => ({
        landings: [...responseData, ...state.landings],
    }));
    return response;
  }

}));

export default useStore;