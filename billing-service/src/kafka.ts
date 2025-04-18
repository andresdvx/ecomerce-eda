import { Kafka } from "kafkajs";
import { guardarEventoMongo } from "./mongo";
import { v4 as uuidv4 } from "uuid";
import { timeStamp } from "console";

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

      const user = {
        userId: order.userId,
        userEmail: order.userEmail,
        userName: order.userName,
      };

      console.log("🧾 Factura generada desde order:", invoice);

      await producer.send({
        topic: "invoice-processing",
        messages: [{ value: JSON.stringify(invoice) }],
      });

      await producer.send({
        topic: "notifications",
        messages: [
          {
            value: JSON.stringify({
              timeStamp: new Date().toLocaleString(),
              source: "BillingService",
              topic: "notifications",
              originTopic: "invoice-processing",
              payload: {
                invoice: {
                  invoiceId: invoice.invoiceId,
                  total: invoice.total,
                },
                user: {
                  id: user.userId,
                  email: user.userEmail,
                  name: user.userName,
                },
              },
            }),
          },
        ],
      });

      await guardarEventoMongo({
        eventId: uuidv4(),
        timestamp: new Date(),
        source: "billing-service",
        topic: "invoice-processing",
        payload: order,
        snapshot: invoice,
      });

      console.log("📤 Factura enviada a Kafka → invoice-processing");
      console.log("📨 Evento emitido a Kafka → notifications");
      console.log("📦 Evento guardado en MongoDB:", invoice.invoiceId);
    },
  });
}
