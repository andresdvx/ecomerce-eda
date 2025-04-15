export interface BuildKafkaMessageInterface {
  targetTopic: string;
  originTopic: string;
  payload: any;
  snapShot?: Record<string, any>;
}
