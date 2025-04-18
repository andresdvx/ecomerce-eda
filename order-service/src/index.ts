import express from "express";
import dotenv from "dotenv";
import { connectKafkaProducer, producer } from "./kafka";

dotenv.config();
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🟢 Order-service activo");
});

app.post("/api/orders", async (req, res) => {
  const { userId, items } = req.body;

  const order = {
    orderId: `ORDER_${Date.now()}`,
    userId,
    items,
    total: items.reduce(
      (sum: number, item: any) => sum + item.price * item.quantity,
      0
    ),
    createdAt: new Date(),
  };

  await producer.send({
    topic: "order-created",
    messages: [{ value: JSON.stringify(order) }],
  });

  console.log("🟢 Orden enviada a Kafka:", order);
  res.status(201).send(order);
});

const start = async () => {
  await connectKafkaProducer();
  app.listen(process.env.PORT || 3001, () =>
    console.log(
      `🚀 order-service corriendo en puerto ${process.env.PORT || 3001}`
    )
  );
};

start();
