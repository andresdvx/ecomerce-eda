import dotenv from "dotenv";
import { connectKafkaConsumer } from "./kafka";
import { connectMongo } from "./mongo";

dotenv.config();

const start = async () => {
  await connectMongo();
  await connectKafkaConsumer();
};

start();
