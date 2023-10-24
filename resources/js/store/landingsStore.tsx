import { create } from 'zustand';
import { AxiosResponse } from 'axios';

interface CreateLandingsProps {
  name: App.Models.Landing["name"],
  clone?: App.Models.Landing["name"]
}

interface LandingsState {
  landings: App.Models.Landing[],
  currentLanding: App.Models.Landing | null;
  removeLanding: (id: App.Models.Landing["id"]) => Promise<AxiosResponse>,
  createLanding: (props: CreateLandingsProps) => Promise<AxiosResponse>,
  getLandings: () => Promise<AxiosResponse>,
  getLandingWithData: (id: App.Models.Landing["id"]) => Promise<AxiosResponse>,
  updateLandingSettings: (id: App.Models.LandingSettings["id"], data: App.Models.LandingSettings) => Promise<AxiosResponse>,
  clearCurrentLanding: () => void,
}

const useLandingsStore = create<LandingsState>()((set) => ({
  landings: [],

  currentLanding: null,

  removeLanding: async (id) => {
    const response = await window.axios.delete(route('landing.destroy', { id }));
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

  getLandingWithData: async (id) => {
    const response = await window.axios.get(route('landing.data.index', String(id)));
    const { data } = response;
    set({ currentLanding: data.data });
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
  },

  clearCurrentLanding: () => set({ currentLanding: null }),

  updateLandingSettings: async (id, data) => {    
    const response = await window.axios.post(route('landing.settings.update', { id }), { data });
    return response;
  }

}));

export default useLandingsStore;