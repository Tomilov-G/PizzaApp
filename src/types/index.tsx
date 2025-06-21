export interface PizzaData {
  id: number;
  imageUrl: string;
  title: string;
  types: number[];
  description: string,
  sizes: number[];
  price: number;
  category?: number;
  rating?: number;
  count?: number,
}
export interface CartItem {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  type: "тонкое" | "традиционное";
  size: number;                   
  count: number;                   
}

export type PlusPizza = Pick<PizzaData, 'id'>;
export type PizzaCategoryData = Pick<PizzaData, 'id' | 'title'>;


