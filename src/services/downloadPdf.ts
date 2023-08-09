import fs from "fs";
import path from "path";
import PDFDocument from "pdfkit";
import { pathToSrc } from "../utils/Constants.js";
export const downloadPdf = async (res) => {
  const doc = new PDFDocument();
  const pdfPath = path.join(pathToSrc, "orders.pdf");

  doc.text("Hello World");
  doc.pipe(fs.createWriteStream(pdfPath));
  doc.end();

  setTimeout(() => {
    if (fs.existsSync(pdfPath)) {
      res.download(pdfPath, "orders.pdf", (err) => {
        if (err) {
          throw Error("Error while downloading PDF");
        }

        // fs.unlinkSync(pdfPath);

        return true
      });
    } else {
      throw Error("PDF file not generated");
    }
  }, 1000);
}
