import { CronJob } from 'cron';
import Order from '../models/Order.js';

export const jobs = new Map<string, CronJob>();

export const scheduleOrderConfirmedJob = (
  order
) => {
  const jobIdOdj = order._id;
  const jobId = jobIdOdj.toString();
  try {
    const job = new CronJob(
      order.jobTime,
      async function () {

        order.jobTime = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
        order.status = 'sent'
        order.save()
        
        await scheduleOrderSentJob(order)

        job.stop();
        jobs.delete(jobId);
      },
      null,
      true
    );

    jobs.set(jobId, job);
  } catch (error) {
    console.log('shedule err')
  }
};

export const scheduleOrderSentJob = (
  order
) => {
  const jobIdOdj = order._id;
  const jobId = jobIdOdj.toString();
  try {
    const job = new CronJob(
      order.jobTime,
      async function () {

        order.jobTime = null
        order.status = 'delivered'
        order.save()

        job.stop();
        jobs.delete(jobId);
      },
      null,
      true
    );

    jobs.set(jobId, job);

  } catch (error) {
    console.log('shedule err')
  }
};

// export const scheduleJobs = async () => {
//   const notifications = await Notification.find({
//     type: {
//       $in: [
//         NotificationTypes.firstLesson,
//         NotificationTypes.negativeBalanceBeforeLessonTutor,
//         NotificationTypes.negativeBalanceBeforeLessonStudent,
//       ],
//     },
//   })
//     .populate<{ lesson: IHydratedLesson }>('lesson')
//     .exec();

//   notifications.forEach(notification => {
//     if (!notification.lesson) return;
//     try {
//       if (!notification.jobTime) {
//         throw new AppError(
//           `jobTime is missing in notification with id ${notification._id}`,
//           500
//         );
//       }

//       if (notification.jobTime < new Date()) return;
//     } catch (error) {
//       logError(error);
//     }

//     const depopulatedNotification = notification.depopulate();

//     if (notification.type === NotificationTypes.firstLesson) {
//       return scheduleFirstLessonNotificationJob(depopulatedNotification);
//     }

//     if (
//       notification.type === NotificationTypes.negativeBalanceBeforeLessonTutor
//     ) {
//       return scheduleNegativeBalanceBeforeLessonTutorNotificationJob(
//         depopulatedNotification
//       );
//     }

//     if (
//       notification.type === NotificationTypes.negativeBalanceBeforeLessonStudent
//     ) {
//       return scheduleNegativeBalanceBeforeLessonStudentNotificationJob(
//         depopulatedNotification
//       );
//     }
//   });
// };

//////////////////////////////////////////////////
// const deleteAvailableTimeStudyperiodsAndRedis = async () => {
//   logServerRunning(
//     'AvailableTime of study periods has been reset and Redis cache has been cleared.'
//   );
//   const startTime = new Date(
//     Date.now() - tutorTimeConstraintsForLessons * 60 * 1000
//   );
//   const endTime = new Date(
//     Date.now() - TimeConstraintsForSearchStudyperiods * 60 * 1000
//   );
//   await StudyPeriod.updateMany(
//     {
//       startsAt: {
//         $lt: startTime,
//         $gte: endTime,
//       },
//     },
//     { $set: { availableTime: 0 } }
//   );
//   // Deleting Redis cache.
//   await redisService.deleteKeyAll();
// };

// // Creating a cron job to execute the function every day at midnight (00:00).
// const cronSchedule = '0 0 * * *'; // '0 0 * * *' - Schedule for midnight.
// // const cronSchedule = '*/2 * * * *'; // Schedule for every 10 minutes.
// export const job = new CronJob(
//   cronSchedule,
//   deleteAvailableTimeStudyperiodsAndRedis
// );
