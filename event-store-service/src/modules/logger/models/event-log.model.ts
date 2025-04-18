import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class EventLogModel extends Document {
  @Prop({ required: true })
  eventId: string;

  @Prop({ required: true })
  timestamp: string;

  @Prop({ required: true })
  source: string;

  @Prop({ required: true })
  topic: string;

  @Prop({ type: Object, required: true })
  payload: Record<string, any>;

  @Prop({ type: Object, default: {} })
  snapshot: Record<string, any>;
}

export const EventLogSchema = SchemaFactory.createForClass(EventLogModel);
