import * as orderService from "../services/order.js";

export const create = async (req, res) => {
  try {
    const data = await orderService.createPayment(req.body);
    // const orderId = await orderService.createOrder({ ...req.body, userId: req.userId, orderId: data.id })
   
    // res.status(200).json({ message: "payment successfully created", data: {...data, orderId} });
    res.status(200).json({ message: "payment successfully created", data: {...data} });
  } catch (error) {
    res
      .status(400)
      .json({
        message: "something went wrong during create order",
        err: error.message,
      });
  }
};

export const capture = async (req, res) => {
  try {
    const data = await orderService.capturePayment(req.body.orderID);
    // const order = await orderService.captureOrder(req.body.orderID)

    res.status(200).json({ message: "payment successfully captured", data });
  } catch (error) {
    res.status(400).json({
      message: "something went wrong during capture order",
      err: error.message,
    });
  }
};

export const failed = async (req, res) => {
  try {
    const data = await orderService.failedPayment(req.body.orderID);

    res.status(200).json({ message: "payment failed", data });
  } catch (error) {
    res.status(400).json({
      message: "something went wrong during payment failed",
      err: error.message,
    });
  }
};

export const cancel = async (req, res) => {
  try {
    const data = await orderService.cancelOrder(req.body.orderID);

    res.status(200).json({ message: "payment successfully canceled", data });
  } catch (error) {
    res.status(400).json({
      message: "something went wrong during order canceled",
      err: error.message,
    });
  }
};
