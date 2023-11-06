import { AxiosResponse } from "axios"

export interface LandingsState {
  landings: App.Models.Landing[],
  templates: App.Models.LandingTemplate[],
  currentLanding: App.Models.Landing | null,
  currentProduct: App.Models.Product | null,

  removeLanding: (
    landingId: App.Models.Landing["id"]
  ) => Promise<AxiosResponse>,

  createLanding: (
    name: App.Models.Landing["name"],
    clone?: App.Models.Landing["name"]
  ) => Promise<AxiosResponse>,

  createProduct: (
    landingId: App.Models.Landing["id"],
    data: {
      name: App.Models.Product["name"],
      article: App.Models.Product["article"]
    }
  ) => Promise<AxiosResponse>,

  getLandings: () => Promise<AxiosResponse>,

  getLandingWithData: (
    landingId: App.Models.Landing["id"]
  ) => Promise<AxiosResponse>,

  getProductWithData: (
    landingId: App.Models.Landing["id"],
    productId: App.Models.Product["id"]
  ) => Promise<AxiosResponse>,

  updateLandingSettings: (
    landingId: App.Models.Landing["id"],
    data: App.Models.LandingSettings
  ) => Promise<AxiosResponse>,

  updateGlobalProduct: (
    landingId: App.Models.Landing["id"],
    data: App.Models.GlobalProduct
  ) => Promise<AxiosResponse>,

  updateAdvantages: (
    landingId: App.Models.Landing["id"],
    data: FormData
  ) => Promise<AxiosResponse>,

  updateProductData: (
    landingId: App.Models.Landing["id"],
    productId: App.Models.Product["id"],
    data: App.Models.ProductData
  ) => Promise<AxiosResponse>,

  updateProductImages: (
    landingId: App.Models.Landing["id"],
    productId: App.Models.Product["id"],
    data: FormData
  ) => Promise<AxiosResponse>,

  updateProductFeatures: (
    landingId: App.Models.Landing["id"],
    productId: App.Models.Product["id"],
    data: Partial<App.Models.ProductFeature>[]
  ) => Promise<AxiosResponse>,

  updateProductVariants: (
    landingId: App.Models.Landing["id"],
    productId: App.Models.Product["id"],
    data: Partial<App.Models.ProductVariants>[]
  ) => Promise<AxiosResponse>,

  removeProduct: (
    landingId: App.Models.Landing["id"],
    productId: App.Models.Product["id"],
  ) => Promise<AxiosResponse>,

  getTemplates: () => Promise<AxiosResponse>,

  clearCurrentLanding: () => void,
}