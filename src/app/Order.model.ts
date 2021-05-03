export interface LineItem {
  productId: number;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: string;
  date: Date;
  items: Array<LineItem>;
}
