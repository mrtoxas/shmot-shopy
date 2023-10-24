import { create } from 'zustand';
import { AxiosResponse } from 'axios';

interface CreateLandingsProps {
  name: App.Models.Landing["name"],
  clone?: App.Models.Landing["name"]
}

interface LandingsState {
  landings: App.Models.Landing[],
  currentLanding: App.Models.Landing | null,
  
  removeLanding: (landingId: App.Models.Landing["id"]) => Promise<AxiosResponse>,
  createLanding: (props: CreateLandingsProps) => Promise<AxiosResponse>,
  getLandings: () => Promise<AxiosResponse>,
  getLandingWithData: (landingId: App.Models.Landing["id"]) => Promise<AxiosResponse>,
  updateLandingSettings: (landingId: App.Models.LandingSettings["id"], data: App.Models.LandingSettings) => Promise<AxiosResponse>,
  clearCurrentLanding: () => void,
  
}

const useLandingsStore = create<LandingsState>()((set) => ({
  landings: [],

  currentLanding: null,

  removeLanding: async (landingId) => {
    const response = await window.axios.delete(route('landing.destroy', { landingId }));
    set((state) => ({
      landings: state.landings.filter((landing) => landing.id !== landingId),
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

  getLandingWithData: async (landingId) => {
    const response = await window.axios.get(route('landing.data.index', String(landingId)));
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

  updateLandingSettings: async (landingId, data) => {    
    const response = await window.axios.post(route('landing.settings.update', { landingId: landingId }), { data });
    return response;
  },  

}));

export default useLandingsStore;