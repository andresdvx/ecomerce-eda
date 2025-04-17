import { z } from "zod";

const idType = z.string().uuid({message: 'The id should be a valid uuid'});

const productToCart = z.object({
    userId: idType,
    productId: idType,
    quantity: z.number().min(1, {message: 'The quantity should be a valid number'}).max(100, {message: 'The quantity should be less than 100'}),
});

export type ProductToCartDto = z.infer<typeof productToCart>;

export const validateProductToCart = (data: unknown) => {
    return productToCart.safeParse(data)
}

export const validateUserId = (id: string)=>{
    return idType.safeParse(id)
}