export interface LineItem {
  productId: number;
  quantity: number;
  unitPrice: number;
}

export const enum OrderStatus {
  ordered = 1,
  waitingForProducts,
}

export interface Order {
  id: string;
  date: Date;
  status: OrderStatus;
  items: Array<LineItem>;
}
