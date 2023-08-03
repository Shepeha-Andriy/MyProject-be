import * as notificationService from "../services/notification.js";

export const getMy = async (req, res) => {
  try {
    const data = await notificationService.getMy(req.userId);

    res.status(200).json({ message: "get my notifications success", data });
  } catch (error) {
    res.status(400).json({
      message: "something went wrong during get my notifications",
      err: error.message,
    });
  }
};

export const create = async (req, res) => {
  try {
    const data = await notificationService.create(req.userId, 'test', 'тест');

    res.status(200).json({ message: "create notification success", data });
  } catch (error) {
    res.status(400).json({
      message: "something went wrong during create notification",
      err: error.message,
    });
  }
};

export const deleteOne = async (req, res) => {
  try {
    const data = await notificationService.deleteOne();

    res.status(200).json({ message: "delete one notification success", data });
  } catch (error) {
    res.status(400).json({
      message: "something went wrong during delete one notification",
      err: error.message,
    });
  }
};

export const deleteAll = async (req, res) => {
  try {
    const data = await notificationService.deleteAll();

    res.status(200).json({ message: "delete all notification success", data });
  } catch (error) {
    res.status(400).json({
      message: "something went wrong during delete all notification",
      err: error.message,
    });
  }
};
