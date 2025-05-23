import { CartEntity } from '../../domain/entities/Cart.entity';
import { CartDatasource } from '../../domain/datasources/cart.datasource';
import { ProductToCartDto } from '../../domain/schema/cart.schema';
import { prisma } from '../../../../shared';

export class CartDatasourceImpl implements CartDatasource {
  async getCart(userId: string): Promise<CartEntity> {
    const cartItems = await prisma.cart.findMany({
      where: { userId },
      include: { product: true }
    });

    console.log('cartItems', cartItems);

    return CartEntity.fromPrismaModels(cartItems);
  }

  async addItem(data: ProductToCartDto): Promise<CartEntity> {
    await prisma.cart.upsert({
      where: {
        userId_productId: {
          userId: data.userId,
          productId: data.productId
        }
      },
      create: {
        userId: data.userId,
        productId: data.productId,
        quantity: data.quantity
      },
      update: {
        quantity: {
          increment: data.quantity
        }
      },
      include: { product: true }
    });

    return this.getCart(data.userId);
  }

  async removeItem(userId: string, productId: string): Promise<{ productId: string; userId: string; productName: string }> {
    const existingItem = await prisma.cart.findFirst({
      where: {
        userId,
        productId
      },
      include: {
        product: true
      }
    });
  
    if (!existingItem) {
      return { productId, userId, productName: '' }; 
    }
  
    await prisma.cart.deleteMany({
      where: {
        userId,
        productId
      }
    });
  
    return {
      productId,
      userId,
      productName: existingItem.product.name
    };
  }
  
}