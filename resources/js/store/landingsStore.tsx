import { create } from 'zustand';
import { LandingsState } from './types';

const useLandingsStore = create<LandingsState>()((set) => ({
  landings: [],

  templates: [],

  currentLanding: null,

  currentProduct: null,

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

  createLanding: async (name, clone) => {
    const response = await window.axios.post(route('api.landings.store', { name, ...(clone && { clone }) }));
    const { data } = response;
    const responseData = Array.isArray(data.data) ? data.data : [data.data];
    set((state) => ({
      landings: [...responseData, ...state.landings],
    }));
    return response;
  },

  updateLandingSettings: async (landingId, data) => {
    const response = await window.axios.post(route('api.settings.update', { landingId }), { data });
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

    set((state) => {
      if (state.currentLanding && state.currentLanding.products) {
        return {
          currentLanding: {
            ...state.currentLanding, 
            products: [...state.currentLanding.products, resdata.data]
          }
        };             
      }
      return state;
    });  

    return response;
  },

  removeProduct: async (landingId, productId) => {
    const response = await window.axios.delete(route('api.product.destroy', { landingId, productId }));

    set((state) => {
      if (state.currentLanding && state.currentLanding.products) {
        return {
          currentLanding: {
            ...state.currentLanding, 
            products: state.currentLanding.products.filter((e) => e.id !== productId)
          }
        };             
      }
      return state;
    });  

    return response;
  },

  getProductWithData: async (landingId, productId) => {
    const response = await window.axios.get(route('api.product.index', { landingId, productId }));
    const { data } = response;
    set({ currentProduct: data.data });
    return response;
  },

  updateProductData: async (landingId, productId, data) => {
    const response = await window.axios.post(route('api.productData.update', { landingId, productId }), { data });
    return response;
  },

  updateProductImages: async (landingId, productId, data) => {
    const response = await window.axios.post(route('api.productImages.update', { landingId, productId }), data);
    return response;
  },

  updateProductFeatures: async (landingId, productId, data) => {
    const response = await window.axios.post(route('api.productFeatures.update', { landingId, productId }), data);
    return response;
  },

  updateProductVariants: async (landingId, productId, data) => {
    const response = await window.axios.post(route('api.productVariants.update', { landingId, productId }), data);
    return response;
  },
  
}));

export default useLandingsStore;