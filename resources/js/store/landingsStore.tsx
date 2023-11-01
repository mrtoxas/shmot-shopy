import { create } from 'zustand';
import { AxiosResponse } from 'axios';
import { 
  CreateLandingsProps, 
  CreateProductProps,
  RemoveLandingProps,
  GetLandingWithDataProps,
  UpdateLandingSettingsProps,
  UpdateGlobalProductProps,
  UpdateAdvantagesProps
} from './types'


interface LandingsState {
  landings: App.Models.Landing[],
  templates: App.Models.LandingTemplate[],
  currentLanding: App.Models.Landing | null,
  
  removeLanding: (props: RemoveLandingProps) => Promise<AxiosResponse>,
  createLanding: (props: CreateLandingsProps) => Promise<AxiosResponse>,
  createProduct: (props: CreateProductProps) => Promise<AxiosResponse>,
  getLandings: () => Promise<AxiosResponse>,
  getLandingWithData: (props: GetLandingWithDataProps) => Promise<AxiosResponse>,    
  updateLandingSettings: (props: UpdateLandingSettingsProps) => Promise<AxiosResponse>,
  updateGlobalProduct: (props: UpdateGlobalProductProps) => Promise<AxiosResponse>,
  updateAdvantages: (props: UpdateAdvantagesProps) => Promise<AxiosResponse>,
  clearCurrentLanding: () => void,
}

const useLandingsStore = create<LandingsState>()((set) => ({
  landings: [],

  templates: [],

  currentLanding: null,

  clearCurrentLanding: () => set({ currentLanding: null }),

  getLandings: async () => {
    const response = await window.axios.get(route('api.landings.all'));
    const { data } = response;
    set((state) => ({
      landings: Array.isArray(data) ? data : [data, ...state.landings],
    }));
    return response;
  },

  getLandingWithData: async (landingId) => {
    const response = await window.axios.get(route('api.landingData.index', String(landingId)));
    const { data } = response;
    set({ currentLanding: data.data });
    return response;
  },

  createLanding: async ({ name, clone }) => {
    const response = await window.axios.post(route('api.landings.store', { name, ...(clone && { clone }) }));
    const { data } = response;
    const responseData = Array.isArray(data.data) ? data.data : [data.data];
    set((state) => ({
      landings: [...responseData, ...state.landings],
    }));
    return response;
  },

  updateLandingSettings: async (landingId, data) => {    
    const response = await window.axios.post(route('api.settings.update', { landingId: landingId }), { data });
    return response;
  },  

  updateGlobalProduct: async (landingId, data) => {    
    const response = await window.axios.post(route('api.globalProduct.update', { landingId: landingId }), { data });
    return response;
  },

  updateAdvantages: async (landingId, formData) => {    
    const response = await window.axios.post(route('api.advantages.update', { landingId }), formData);
    return response;
  },

  removeLanding: async (landingId) => {
    const response = await window.axios.delete(route('api.landing.destroy', { landingId }));
    set((state) => ({
      landings: state.landings.filter((landing) => landing.id !== landingId),
    }));
    return response;
  },

  getTemplates: async () => {
    const response = await window.axios.get(route('api.templates.all'));
    const { data } = response;
    set({ templates: data });
    return response;
  },

  createProduct: async (landingId, data) => {
    const response = await window.axios.post(route('api.products.store', { landingId: landingId }), data);
    const { data: resdata } = response;

    set((state) => ({
      currentLanding: {...state.currentLanding, products: [...state.currentLanding.products, resdata.data]}
    }));

    return response;
  },

  removeProduct: async (landingId, productId) => {
    const response = await window.axios.delete(route('api.product.destroy', { landingId, productId }));

    set((state) => ({
      currentLanding: {...state.currentLanding, products: state.currentLanding.products.filter((e) => e.id !== productId)}
    }));

    return response;
  },
}));

export default useLandingsStore;