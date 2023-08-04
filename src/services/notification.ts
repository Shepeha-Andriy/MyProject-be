import Notification from "../models/Notification.js";
import Io from './io.js'

export const getMy = async (userId) => {
  const notifications = await Notification.find({ user: userId })

  return notifications
};

export const create = async (userId, enMsg, uaMsg) => {
  const newNotifications = await Notification.create({
    user: userId,
    uaMessage: uaMsg,
    enMessage: enMsg
  })

  Io.io.to(Io.users.get(userId)).emit("message", { enMessage: 'socketTest' });

  return newNotifications;
};

export const deleteOne = async () => {
  
};

export const deleteAll = async () => {
  
};
