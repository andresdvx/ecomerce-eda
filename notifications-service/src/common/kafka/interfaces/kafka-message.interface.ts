export interface KafkaMessageValue {
  timestamp: string;
  source: string;
  topic: string;
  originTopic: string;
  payload: Record<string, any>;
  snapshot: Record<string, any>;
}
