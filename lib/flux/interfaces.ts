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
  PAYMENT_SUCCESSFUL = "payment_successful",
  CUSTOMER_CREATED = "customer_created",
  SUBSCRIPTION_CREATED = "subscription_created",
  SUBSCRIPTION_CANCELLED = "subscription_cancelled",
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
