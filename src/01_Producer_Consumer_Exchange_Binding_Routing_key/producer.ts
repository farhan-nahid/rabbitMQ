import { connect } from "./connect";
import { EXCHANGE_NAME, EXCHANGE_TYPE, QUEUE_NAME, ROUTING_KEY } from "./constants";

async function produce() {
  try {
    // Connect to RabbitMQ server
    const { connection, channel } = await connect();

    const messages = {
      from: "John Doe <john.doe@example.com>",
      to: "Jane Smith <jane.smith@example.com>",
      subject: "Hello from RabbitMQ",
      body: "This is a test email sent via RabbitMQ.",
    };

    await channel.assertExchange(EXCHANGE_NAME, EXCHANGE_TYPE, { durable: false }); // Declare an exchange
    await channel.assertQueue(QUEUE_NAME, { durable: false }); // Declare a queue
    await channel.bindQueue(QUEUE_NAME, EXCHANGE_NAME, ROUTING_KEY); // Bind the queue to the exchange with the routing key

    // Publish message to the exchange with the routing key
    channel.publish(EXCHANGE_NAME, ROUTING_KEY, Buffer.from(JSON.stringify(messages)));
    console.log(`[x] Sent ${ROUTING_KEY}: '${JSON.stringify(messages)}'`);

    // Close the channel and connection after a short delay to ensure the message is sent
    setTimeout(async () => {
      await channel.close();
      await connection.close();
    }, 500);
  } catch (error) {
    console.error("Error in producer:", error);
  }
}

produce().catch((error) => {
  console.error("Unhandled error:", error);
  process.exit(1);
});
