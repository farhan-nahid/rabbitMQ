import amqp from "amqplib";

export async function connect() {
  try {
    const connection = await amqp.connect("amqp://admin:admin123@localhost:5672");
    const channel = await connection.createChannel();

    return { connection, channel };
  } catch (error) {
    console.error("Error in connection:", error);
    throw error;
  }
}
