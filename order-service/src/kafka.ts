import { Kafka } from "kafkajs";

export const kafka = new Kafka({
  clientId: "order-service",
  brokers: [process.env.KAFKA_BROKER!],
});

export const producer = kafka.producer();

export async function connectKafkaProducer() {
  await producer.connect();
  console.log("✅ Conectado a Kafka desde order-service");
}
