// billing-service/src/mongo.ts
import mongoose from "mongoose";

export async function connectMongo() {
  await mongoose.connect(process.env.MONGO_URI!);
  console.log("✅ Conectado a MongoDB desde billing-service");
}

// ✅ Define el modelo una sola vez, al cargar el módulo
const EventModel =
  mongoose.models.Event ||
  mongoose.model(
    "Event",
    new mongoose.Schema({
      eventId: String,
      timestamp: Date,
      source: String,
      topic: String,
      payload: Object,
      snapshot: Object,
    })
  );

export async function guardarEventoMongo(data: {
  eventId: string;
  timestamp: Date;
  source: string;
  topic: string;
  payload: any;
  snapshot: any;
}) {
  await EventModel.create(data);
  console.log("📦 Evento guardado en MongoDB:", data.eventId);
}
