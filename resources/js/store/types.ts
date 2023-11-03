export interface CreateLandingsProps {
  name: App.Models.Landing["name"],
  clone?: App.Models.Landing["name"]
}

export interface CreateProductProps {
  landingId: App.Models.Landing["id"]
  data: {
    name: App.Models.Product["name"], 
    article: App.Models.Product["article"]
  }
}

export interface RemoveLandingProps {
  landingId: App.Models.Landing["id"];
}

export interface GetLandingWithDataProps {
  landingId: App.Models.Landing["id"];
}

export interface UpdateLandingSettingsProps {
  landingId: App.Models.Landing["id"], 
  data: App.Models.LandingSettings
}

export interface UpdateGlobalProductProps {
  landingId: App.Models.Landing["id"], 
  data: App.Models.GlobalProduct
}

export interface UpdateAdvantagesProps{
  landingId: App.Models.Landing["id"], 
  data: FormData
}

export interface GetProductWithDataProps {
  landingId: App.Models.Landing["id"], 
  productId: App.Models.Product["id"];
}

export interface UpdateProductDataProps extends GetProductWithDataProps {
  data: App.Models.ProductData
}

export interface UpdateProductImagesProps extends GetProductWithDataProps { {
  data: FormData
}

