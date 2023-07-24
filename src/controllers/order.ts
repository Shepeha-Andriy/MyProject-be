import * as orderService from "../services/order.js";

export const create = async (req, res) => {
  try {
    const data = await orderService.createPayment(req.body);
   
    res.status(200).json({ message: "payment successfully created", data });
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

    res.status(200).json({ message: "payment successfully captured", data });
  } catch (error) {
    res.status(400).json({
      message: "something went wrong during capture order",
      err: error.message,
    });
  }
};
