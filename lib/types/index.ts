export type IdentifyData = {
  userId: string;
}

export type ScreenType = "desktop" | "tablet" | "mobile";

export type ScreenInfo = {
  userId: string,
  data: {
    resolution: string,
    type: ScreenType
  }
}

export type CartData = {
  userId: string,
  event: "added_to_cart" | string,
  data: {
    productName: string,
    numberOfProduct: string,
    price: string,
  }
}