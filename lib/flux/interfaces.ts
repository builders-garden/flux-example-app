export interface FluxPaymentSuccessfulEventPayload {
  hash: string;
  amount: string;
  customerId: string;
  productId: string;
  timestamp: Date;
  userId: string;
}

export enum FluxEventType {
  PAYMENT_SUCCESSFUL = "payment_successful",
  CUSTOMER_CREATED = "customer_created",
}

export interface FluxWebhookEventData {
  metadata: {
    id: string;
    name: string;
    eventType: FluxEventType;
    timestamp: string;
  };
  payload: FluxPaymentSuccessfulEventPayload;
}
