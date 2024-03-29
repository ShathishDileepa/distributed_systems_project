import mongoose from 'mongoose';


import { app } from "./app";
import { EventCreatedListener } from './events/listeners/event-created-listener';
import { ExpirationCompleteListener } from './events/listeners/expiration-complete-listener';
import { PaymentCreatedListener } from './events/listeners/payment-created-listener';
import { natsWrapper } from './nats-wrapper';

// * For connecting to mongoDB instance
const start = async () => {

  // * Check for is JWT_KEY environment varable exists or not
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  
  // * Check for is MONGO_URI environment varable exists or not
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }
  
  // * Check for is NATS_URL environment varable exists or not
  if (!process.env.NATS_URL) {
    throw new Error('NATS_URL must be defined');
  }
  
  // * Check for is NATS_CLIENT_ID environment varable exists or not
  if (!process.env.NATS_CLIENT_ID) {
    throw new Error('NATS_CLIENT_ID must be defined');
  }
  
  // * Check for is NATS_CLUSTER_ID environment varable exists or not
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error('NATS_CLUSTER_ID must be defined');
  }

  try {
    // * connecting to NATS
    await natsWrapper.connect(process.env.NATS_CLUSTER_ID, process.env.NATS_CLIENT_ID, process.env.NATS_URL);

    // * disconnects and remove client from active list
    natsWrapper.client.on('close', () => {
      console.log('NAT connection closed');
      process.exit();
    })
      
    // * delete client from active lists from NAT when closed
    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());

    // * added Event created & updated, expiration complete and payment created listener
    new EventCreatedListener(natsWrapper.client).listen();
    new ExpirationCompleteListener(natsWrapper.client).listen();
    new PaymentCreatedListener(natsWrapper.client).listen();

    // * connecting to Mongoose
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    console.log("Connected to MongoDB instance");
  } catch (err) {
    console.log(err);
  }
}

app.listen(3000, () => {
  console.log('Order Service : Listening on port 3000!');
});

// * running start function for connection to mongoDB instance
start();