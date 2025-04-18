import { PrismaClient } from '@prisma/client';
import { KafkaProductPublisher } from '../infrastructure/kafka/kafka-product.publisher';
import { prisma } from '../../../shared';

const publisher = new KafkaProductPublisher();

async function seed() {
  await publisher.connect();
  
  const products = [
    {
        name: "Laptop HP Pavilion",
        description: "15.6\" FHD, Intel Core i7, 16GB RAM, 512GB SSD",
        price: 899.99,
        category: "Tecnología"
      },
      {
        name: "MacBook Pro 14\"",
        description: "M1 Pro chip, 16GB RAM, 1TB SSD",
        price: 1999.99,
        category: "Tecnología"
      },
      {
        name: "Samsung Galaxy S23",
        description: "6.1\" AMOLED, 128GB, 5G",
        price: 799.99,
        category: "Tecnología"
      },
      {
        name: "Sony WH-1000XM5",
        description: "Wireless noise-canceling headphones",
        price: 349.99,
        category: "Tecnología"
      },
      {
        name: "Dell Ultrasharp U2723QE",
        description: "27\" 4K USB-C Monitor",
        price: 599.99,
        category: "Tecnología"
      }
  ];

  for (const product of products) {
    const created = await prisma.product.create({
      data: {
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category
      },
    });
    
    await publisher.publishProductCreated(created);
  }

}

seed().catch(console.error);