import { CronJob } from 'cron';
import Order from '../models/Order.js';

export const jobs = new Map();

export async function scheduleOrderConfirmedJob( order ) {
  const jobIdOdj = order._id;
  const jobId = jobIdOdj.toString();

  if (order.jobTime < Date.now()) {
    order.jobTime = new Date(Date.now() + 1 * 1000);
  }

  try {
    const job = new CronJob(
      order.jobTime,
      async function () {
        order.jobTime = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
        order.status = 'sent'
        order.save()
        
        scheduleOrderSentJob(order)
        
        job.stop();
        jobs.delete(jobId);
      },
      null,
      true
    );

    const populatedOrder = await order.populate("owner");
    jobs.set(jobId, populatedOrder);
  } catch (error) {
    console.log('shedule err')
  }
};

export async function scheduleOrderSentJob(order) {
  const jobIdOdj = order._id;
  const jobId = jobIdOdj.toString();

  if (order.jobTime < Date.now()) {
    order.jobTime = new Date(Date.now() + 1 * 1000);
  }

  try {
    const job = new CronJob(
      order.jobTime,
      async function () {
        order.jobTime = null;
        order.status = "delivered";
        order.save();

        job.stop();
        jobs.delete(jobId);
      },
      null,
      true
    );

    const populatedOrder = await order.populate('owner')
    jobs.set(jobId, populatedOrder);
  } catch (error) {
    console.log('shedule err')
  }
};

export const scheduleJobs = async () => {
  const orders = await Order.find({
    $or: [{ status: "confirmed" }, { status: "sent" }],
  }).exec()

  for (const order of orders) {
    if (!order) return;
    try {
      if (!order.jobTime) {
        throw new Error(`jobTime is missing in order with id ${order._id}`);
      }
    } catch (error) {
      console.log(error);
    }

    if (order.status === "confirmed") {
      await scheduleOrderConfirmedJob(order);
    }

    if (order.status === "sent") {
      await scheduleOrderSentJob(order);
    }
  }

  console.log(jobs);
  console.log('job sheduled successfully');
  return 'job sheduled successfully'
};
