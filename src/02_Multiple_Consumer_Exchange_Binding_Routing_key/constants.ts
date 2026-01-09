const EXCHANGE_NAME = "email_exchange";
const ROUTING_KEY_FOR_SUBSCRIBED_USER = "send_email_subscribed";
const ROUTING_KEY_FOR_NORMAL_USER = "send_email_normal";
const SUBSCRIBED_USER_QUEUE_NAME = "subscribed_email_queue";
const NORMAL_USER_QUEUE_NAME = "normal_email_queue";
const EXCHANGE_TYPE = "direct";

export {
  EXCHANGE_NAME,
  EXCHANGE_TYPE,
  NORMAL_USER_QUEUE_NAME,
  ROUTING_KEY_FOR_NORMAL_USER,
  ROUTING_KEY_FOR_SUBSCRIBED_USER,
  SUBSCRIBED_USER_QUEUE_NAME
};

