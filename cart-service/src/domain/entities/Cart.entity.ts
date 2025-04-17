import { Product } from "../../../../shared";

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartPrismaModel {
  id: string;
  userId: string;
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
  };
  productId: string;
  quantity: number;
}

export class CartEntity {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly products: Array<Product & { quantity: number }>,
    public readonly totalItems: number
  ) {}

  static fromPrismaModels(cartItems: CartPrismaModel[]): CartEntity {
    if (!cartItems.length) {
      return new CartEntity('', '', [], 0);
    }

    const userId = cartItems[0].userId;
    const cartId = cartItems[0].id;

    return new CartEntity(
      cartId,
      userId,
      cartItems.map(item => ({
        ...item.product,
        quantity: item.quantity
      })),
      cartItems.reduce((sum, item) => sum + item.quantity, 0)
    );
  }

  static fromPrismaModel(cartItem: CartPrismaModel): CartEntity {
    return new CartEntity(
      cartItem.id,
      cartItem.userId,
      [{
        ...cartItem.product,
        quantity: cartItem.quantity
      }],
      cartItem.quantity
    );
  }
}