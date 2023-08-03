import Notification from "../models/Notification.js";

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

  return newNotifications;
};

export const deleteOne = async () => {
  
};

export const deleteAll = async () => {
  
};
