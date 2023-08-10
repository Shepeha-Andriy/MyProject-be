import fetch from "node-fetch";
import donent from "dotenv";
import Order from "../models/Order.js";
import { scheduleOrderConfirmedJob } from "../utils/schedule/schedule.js";
donent.config();

const { CLIENT_ID, APP_SECRET } = process.env;
const base = "https://api-m.sandbox.paypal.com";

//create Payment
export async function createPayment(data) {
  const accessToken = await generateAccessToken();
  const url = `${base}/v2/checkout/orders`;
  const response = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: data.product.price,
          },
          description: data.product.description,
        },
      ],
    }),
  });

  return handleResponse(response);
}

//capture Payment
export async function capturePayment(orderId) {
  const accessToken = await generateAccessToken();
  const url = `${base}/v2/checkout/orders/${orderId}/capture`;
  const response = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return handleResponse(response);
}

//fail Payment
export async function failedPayment(orderId) {
  await Order.findOneAndDelete({ orderId });

  return 1;
}

//cancel Payment
export async function cancelOrder(orderId) {
  return 1;
}

// create Order
export const createOrder = async (data) => {
  const order = await Order.create({
    owner: data.userId,
    orderId: data.orderId,
    items: data.items,
    amount: data.amount,
    cost: data.price
  });

  return order._id;
};

// capture Order
export const captureOrder = async (orderId) => {
  const order = await Order.findOne({ orderId });

  if (!order) {
    throw Error("order not found");
  }

  order.status = "confirmed";
  // order.jobTime = new Date(Date.now() + 3 * 60 * 60 * 1000);
  order.jobTime = new Date(Date.now() + 20 * 1000);
  await order.save();

  scheduleOrderConfirmedJob(order);

  return order;
};

// auxiliary func for payment  допоміжні функції для пейментів
export async function generateAccessToken() {
  const auth = Buffer.from(CLIENT_ID + ":" + APP_SECRET).toString("base64");
  const response = await fetch(`${base}/v1/oauth2/token`, {
    method: "post",
    body: "grant_type=client_credentials",
    headers: {
      Authorization: `Basic ${auth}`,
    },
  });

  const jsonData = await handleResponse(response);
  return jsonData.access_token;
}

async function handleResponse(response) {
  if (response.status === 200 || response.status === 201) {
    return response.json();
  }

  const errorMessage = await response.text();
  throw new Error(errorMessage);
}
