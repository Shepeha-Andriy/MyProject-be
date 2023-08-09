import { downloadPdf } from '../services/downloadPdf.js';
import { getJobs } from '../utils/schedule/schedule.js';

export const downloadPdfOrderInfo = async (req, res) => {
  try {
    const data = downloadPdf(res)

    // res.status(200).json({ message: "all goods success", data });
  } catch (error) {
    res
      .status(400)
      .json({
        message: "something went wrong during get pdf info about orders",
        err: error.message,
      });
  }
}

export const test = async (req, res) => {
  try {
    const data = 'test'

    res.status(200).json({ message: "all goods success", data });
  } catch (error) {
    res.status(400).json({
      message: "something went wrong during test",
      err: error.message,
    });
  }
}

export const schedule = async (req, res) => {
  try {
    const data = getJobs()

    res.render("schedule", { data });
  } catch (error) {
    res.status(400).json({
      message: "something went wrong during schedule",
      err: error.message,
    });
  }
}
