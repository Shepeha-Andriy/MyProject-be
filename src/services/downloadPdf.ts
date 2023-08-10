import fs from "fs";
import path from "path";
import PDFDocument from "pdfkit";
import { pathToSrc } from "../utils/Constants.js";
import Order from "../models/Order.js";

export const downloadPdf = async (res, userId) => {
  const orders = await Order.find({ owner: userId })
  if (!orders) {
    throw Error('Orders not found')
  }

  const doc = new PDFDocument();
  const pdfPath = path.join(pathToSrc, '..', '/uploads', "orders.pdf");

  doc.font("Helvetica-Bold");
  doc.text("Orders List", { align: "center", underline: true });
  doc.moveDown();

  doc.font("Helvetica");
  orders.forEach((order) => {
    doc.text(`Order ID: ${order.orderId}`);
    doc.text(`Status: ${order.status}`);
    doc.text(`Created At: ${order.createdAt}`);
    doc.moveDown();
  });
  doc.pipe(fs.createWriteStream(pdfPath));
  doc.end();

  setTimeout(() => {
    if (fs.existsSync(pdfPath)) {
      res.download(pdfPath, "orders.pdf", (err) => {
        if (err) {
          throw Error("Error while downloading PDF");
        }

        fs.unlinkSync(pdfPath);

        return true
      });
    } else {
      throw Error("PDF file not generated");
    }
  }, 1000);
}
