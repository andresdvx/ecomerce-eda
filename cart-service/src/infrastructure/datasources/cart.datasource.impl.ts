import { CartDatasource } from "../../domain/datasources/cart.datasource";
import { prisma } from '../../../../shared/database/postgres';

export class CartDatasourceImpl implements CartDatasource {

    async get(): Promise<any[]> {
        return prisma.findMany();
    }

    async addProduct(data: any): Promise<void> {
        await prisma.create({ data });
    }

    async removeProduct(productId: string, userId: string): Promise<void> {
        await prisma.deleteMany({
            where: { productId, userId },
        });
    }
}