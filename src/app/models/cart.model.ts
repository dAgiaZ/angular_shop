export interface Cart {
  id?: number; // User id
  products: {
        id: number,
        quantity: number,
  }[];
}

