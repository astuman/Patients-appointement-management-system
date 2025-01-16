import React from "react";
// import "./singleReport.scss";

const SinglePatient = ({ report }) => {
  // console.log(report)
  return (
    <div className="report-item">
      <div className="report-item-row">
        <span>Patient's name: </span>
        <p>
          {report.firstName} {report.lastName}
        </p>
      </div>
      <div className="report-item-row">
        <span>Age: </span>
        <p>{report.email}</p>
      </div>
      <div className="report-item-row">
        <span>DOB: </span>
        <p>{report.dob}</p>
      </div>
      <div className="report-item-row">
        <span>Address: </span>
        <p>{report.address}</p>
      </div>

      <div className="report-item-row">
        <span>Date: </span>
        <p>{report.createdAt}</p>
      </div>
    </div>
  );
};

export default SinglePatient;