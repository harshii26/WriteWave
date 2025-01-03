import React from "react";
import axios from "axios";

const ReportDashboard = () => {
  // Function to handle report download
  const handleReportDownload = async (url, fileName) => {
    try {
      const response = await axios.get(url, { responseType: "blob" });
      const reportUrl = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = reportUrl;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); // Clean up
    } catch (error) {
      console.error(`Error downloading ${fileName}:`, error);
    }
  };

  return (
    <div className="report-dashboard">
      

      {/* Button Section */}
      <div className="report-buttons">
        <button
          className="report-btn"
          onClick={() => handleReportDownload("http://localhost:4000/api/v1/reports/generate-users", "user_report.pdf")}
        >
          Download User Report
        </button>

        <button
          className="report-btn"
          onClick={() => handleReportDownload("/api/v1/reports/generate-posts", "post_report.pdf")}
        >
          Download Post Report
        </button>

        {/* <button
          className="report-btn"
          onClick={() => handleReportDownload("/api/reports/generate-notifications", "notification_report.pdf")}
        >
          Download Notification Report
        </button> */}
      </div>
    </div>
  );
};

export default ReportDashboard;
