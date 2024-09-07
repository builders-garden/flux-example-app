export interface FluxPaymentSuccessfulEventPayload {
  hash: string;
  amount: string;
  customerId: string;
  customerAddress: string;
  productId: string;
  timestamp: Date;
  userId: string;
}

export enum FluxEventType {
  PAYMENT_SUCCESSFUL = "PAYMENT_SUCCESSFUL",
  CUSTOMER_CREATED = "CUSTOMER_CREATED",
  SUBSCRIPTION_CREATED = "SUBSCRIPTION_CREATED",
  SUBSCRIPTION_CANCELLED = "SUBSCRIPTION_CANCELLED",
}

export interface FluxWebhookEventData {
  metadata: {
    id: string;
    name: string;
    eventType: FluxEventType;
    timestamp: string;
  };
  eventData: FluxPaymentSuccessfulEventPayload;
}
