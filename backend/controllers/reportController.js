import PDFKit from "pdfkit";
import {User} from "../models/userSchema.js";
//import Blog from "../models/blogSchema.js";
// import Notification from "../models/notification.model.js";

// Generate User Report
export const generateUserReport = async (req, res) => {
    try {
      const employees = await User.find({}, "name email phone education role");
  
      if (employees.length === 0) {
        return res.status(404).json({ message: "No users records found." });
      }
  
      const doc = new PDFKit();
      const fileName = "User_Report.pdf";
  
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", `attachment; filename=\"${fileName}\"`);
      doc.pipe(res);
  
      // Title
      doc.fontSize(18).text("Inspire Studio - WriteWave", { align: "center" });
      doc.moveDown(0.5);
      doc.fontSize(14).text("User Report", { align: "center" });
      doc.moveDown(2);
  
      // Table headers
      const columnWidths = [100, 300]; // Adjust the column widths
      const rowHeight = 20;
      const startX = 50;
      let currentY = doc.y;
  
      // Iterate over employees and format each user's data as a table row
      employees.forEach((emp, index) => {
        const userData = [
          ["Name", emp.name || "N/A"],
          ["Email", emp.email || "N/A"],
          ["Education", emp.education || "N/A"],
          ["Phone", emp.phone || "N/A"],
          ["Role", emp.role || "N/A"]
        ];
  
        userData.forEach(([label, value]) => {
          // Label Column
          doc
            .rect(startX, currentY, columnWidths[0], rowHeight)
            .stroke()
            .fontSize(12)
            .text(label, startX + 5, currentY + 5, { width: columnWidths[0] - 10 });
  
          // Value Column
          doc
            .rect(startX + columnWidths[0], currentY, columnWidths[1], rowHeight)
            .stroke()
            .fontSize(12)
            .text(value, startX + columnWidths[0] + 5, currentY + 5, { width: columnWidths[1] - 10 });
  
          currentY += rowHeight;
        });
  
        // Separator after each user, except the last one
        if (index < employees.length - 1) {
            currentY += 10; // Add spacing between users
            doc
              .fontSize(10)
              .text(
                "",
                startX,
                currentY,
                { align: "left" }
              );
            currentY += 15; 
          }
      });
  
      doc.end();
    } catch (error) {
      console.error("Error generating user report:", error);
      res.status(500).json({ message: "Error generating user report" });
    }
  };
  

// Generate Blog Report
// export const generatePostReport = async (req, res) => {
//     try {
//       const posts = await Blog.find({})
//         .populate("user", "username")
//         .select("text img likes comments");
  
//       if (posts.length === 0) {
//         return res.status(404).json({ message: "No posts found." });
//       }
  
//       const doc = new PDFKit();
//       const fileName = "Blog_Report.pdf";
  
//       res.setHeader("Content-Type", "application/pdf");
//       res.setHeader("Content-Disposition", attachment; filename=\"${fileName}\");
//       doc.pipe(res);
  
//       // Title
//       doc.fontSize(18).text("Inspire Studio - WriteWave", { align: "center" });
//       doc.moveDown(0.5);
//       doc.fontSize(14).text("Post Report", { align: "center" });
//       doc.moveDown(2);
  
//       // Table headers
//       const columnWidths = [150, 250]; // Adjust the column widths
//       const rowHeight = 20;
//       const startX = 50;
//       let currentY = doc.y;
  
//       // Iterate over posts and format each post's data as a table row
//       posts.forEach((post, index) => {
//         const postData = [
//           ["Username", post.user.username || "N/A"],
//           ["Text", post.text || "N/A"],
//           ["Image", post.img ? "Yes" : "No"],
//           ["Likes", post.likes.length.toString()],
//           ["Comments", post.comments.length.toString()],
//         ];
  
//         postData.forEach(([label, value]) => {
//           // Label Column
//           doc
//             .rect(startX, currentY, columnWidths[0], rowHeight)
//             .stroke()
//             .fontSize(12)
//             .text(label, startX + 5, currentY + 5, { width: columnWidths[0] - 10 });
  
//           // Value Column
//           doc
//             .rect(startX + columnWidths[0], currentY, columnWidths[1], rowHeight)
//             .stroke()
//             .fontSize(12)
//             .text(value, startX + columnWidths[0] + 5, currentY + 5, { width: columnWidths[1] - 10 });
//   r 
//           currentY += rowHeight;
//         });
  
//         // Separator after each post, except the last one
//         if (index < posts.length - 1) {
//           currentY += 10; // Add spacing between posts
//           doc
//             .fontSize(10)
//             .text(
//               "",
//               startX,
//               currentY,
//               { align: "left" }
//             );
//           currentY += 15; // Adjust for the separator height
//         }
//       });
  
//       doc.end();
//     } catch (error) {
//       console.error("Error generating post report:", error);
//       res.status(500).json({ message: "Error generating post report" });
//     }
//   };
  
// // Generate Notification Report
// export const generateNotificationReport = async (req, res) => {
//     try {
//       const notifications = await Notification.find({})
//         .populate("from", "username")
//         .populate("to", "username")
//         .select("type read");
  
//       if (notifications.length === 0) {
//         return res.status(404).json({ message: "No notifications found." });
//       }
  
//       const doc = new PDFKit();
//       const fileName = "Notification_Report.pdf";
  
//       res.setHeader("Content-Type", "application/pdf");
//       res.setHeader("Content-Disposition", attachment; filename=\"${fileName}\");
//       doc.pipe(res);
  
//       // Title
//       doc.fontSize(18).text("Inspire Studio - SnapMINT", { align: "center" });
//       doc.moveDown(0.5);
//       doc.fontSize(14).text("Notification Report", { align: "center" });
//       doc.moveDown(2);
  
//       // Table headers
//       const columnWidths = [150, 250]; // Adjust the column widths
//       const rowHeight = 20;
//       const startX = 50;
//       let currentY = doc.y;
  
//       // Iterate over notifications and format each notification's data as a table row
//       notifications.forEach((notification, index) => {
//         const notificationData = [
//           ["From", notification.from.username || "N/A"],
//           ["To", notification.to.username || "N/A"],
//           ["Type", notification.type || "N/A"],
//           ["Read", notification.read ? "Yes" : "No"],
//         ];
  
//         notificationData.forEach(([label, value]) => {
//           // Label Column
//           doc
//             .rect(startX, currentY, columnWidths[0], rowHeight)
//             .stroke()
//             .fontSize(12)
//             .text(label, startX + 5, currentY + 5, { width: columnWidths[0] - 10 });
  
//           // Value Column
//           doc
//             .rect(startX + columnWidths[0], currentY, columnWidths[1], rowHeight)
//             .stroke()
//             .fontSize(12)
//             .text(value, startX + columnWidths[0] + 5, currentY + 5, { width: columnWidths[1] - 10 });
  
//           currentY += rowHeight;
//         });
  
//         // Separator after each notification, except the last one
//         if (index < notifications.length - 1) {
//           currentY += 10; // Add spacing between notifications
//           doc
//             .fontSize(10)
//             .text(
//               "",
//               startX,
//               currentY,
//               { align: "left" }
//             );
//           currentY += 15; // Adjust for the separator height
//         }
//       });
  
//       doc.end();
//     } catch (error) {
//       console.error("Error generating notification report:", error);
//       res.status(500).json({ message: "Error generating notification report" });
//     }
//   };