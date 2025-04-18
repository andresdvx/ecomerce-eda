import { z } from "zod";

export const ProductSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    description: z.string().min(1, 'Description is required'),
    price: z.number().positive('Price must be a positive number'),
    category: z.string().min(1, 'Category is required'),
});

export type ProductDto = z.infer<typeof ProductSchema>;

export const validateProduct = (product: unknown) => {
    return ProductSchema.safeParse(product);
}
