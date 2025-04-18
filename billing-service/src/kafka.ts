import { Kafka } from "kafkajs";
import { guardarEventoMongo } from "./mongo";
import { v4 as uuidv4 } from "uuid";

const kafka = new Kafka({
  clientId: "billing-service",
  brokers: [process.env.KAFKA_BROKER!],
});

const consumer = kafka.consumer({ groupId: "billing-group" });
const producer = kafka.producer();

export async function connectKafkaConsumer() {
  await consumer.connect();
  await producer.connect();
  await consumer.subscribe({ topic: "order-created", fromBeginning: true });

  console.log("📥 Billing-service escuchando 'order-created'...");

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const order = JSON.parse(message.value!.toString());

      const invoice = {
        invoiceId: `INV_${Date.now()}`,
        orderId: order.orderId,
        userId: order.userId,
        total: order.total,
        issuedAt: new Date(),
      };

      console.log("🧾 Factura generada desde order:", invoice);

      await producer.send({
        topic: "invoice-processing",
        messages: [{ value: JSON.stringify(invoice) }],
      });

      await guardarEventoMongo({
        eventId: uuidv4(),
        timestamp: new Date(),
        source: "billing-service",
        topic: "invoice-processing",
        payload: order,
        snapshot: invoice,
      });

      console.log(
        "📤 Factura enviada a Kafka → invoice-processing y guardada en MongoDB"
      );
    },
  });
}
