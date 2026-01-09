import { connect } from "./connect";
import {
  EXCHANGE_NAME,
  EXCHANGE_TYPE,
  NORMAL_USER_QUEUE_NAME,
  ROUTING_KEY_FOR_NORMAL_USER,
} from "./constants";

async function consume() {
  try {
    // Connect to RabbitMQ server
    const { channel } = await connect();

    await channel.assertExchange(EXCHANGE_NAME, EXCHANGE_TYPE, { durable: false }); // Declare an exchange
    await channel.assertQueue(NORMAL_USER_QUEUE_NAME, { durable: false }); // Declare a queue
    await channel.bindQueue(
      NORMAL_USER_QUEUE_NAME,
      EXCHANGE_NAME,
      ROUTING_KEY_FOR_NORMAL_USER,
    ); // Bind the queue to the exchange with the routing key

    console.log(
      `[*] Waiting for messages in ${NORMAL_USER_QUEUE_NAME}. To exit press CTRL+C`,
    );
    // Consume messages from the queue
    channel.consume(NORMAL_USER_QUEUE_NAME, (msg) => {
      if (msg) {
        const messageContent = msg.content.toString();
        console.log(`[x] Received ${msg.fields.routingKey}: '${messageContent}'`);
        channel.ack(msg); // Acknowledge the message
        console.log(`==============${Date.now()}==================`);
      }
    });
  } catch (error) {
    console.error("Error in consumer:", error);
  }
}

consume().catch((error) => {
  console.error("Unhandled error:", error);
  process.exit(1);
});
