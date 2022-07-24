import React from "react";
import { ProgressBar } from "react-bootstrap";
import { FaPen, FaLowVision, FaGraduationCap } from "react-icons/fa";

import "./style.scss";

function getProgress(done, total) {
  return (100 * done) / total;
}

export default function CardStatus(props) {
  const status = props.status;

  if (!status) {
    return <>No status</>;
  }

  const minView = props.minView;

  let speakingProgress = getProgress(
    status.speakingSuccessLearns,
    status.speakingSuccessLearns + status.speakingSuccessLeft
  );

  let writingProgress = getProgress(
    status.writingSuccessLearns,
    status.writingSuccessLearns + status.writingSuccessLeft
  );

  let colorClass;
  if (status.speakingSuccessLeft + status.writingSuccessLeft === 0) {
    colorClass = "success";
  } else if (status.totalLearns === 0) {
    colorClass = "primary";
  } else if (status.totalLearns > 0) {
    colorClass = "danger";
  }

  return (
    <>
      {minView === true && (
        <div className={"text-" + colorClass}>
          <span className="status-part">
            <FaGraduationCap />
            {status.totalLearns}
          </span>
          <span className="status-part">
            <FaLowVision />
            {status.speakingSuccessLearns}/{status.speakingSuccessLeft}
          </span>
          <span className="status-part">
            <FaPen />
            {status.writingSuccessLearns}/{status.writingSuccessLeft}
          </span>
        </div>
      )}

      {minView !== true && (
        <div className="card-status-wrapper">
          <b>Status: </b>
          <div>
            Guessing:{" "}
            {`${status.speakingSuccessLearns} / ${status.speakingSuccessLeft}`}{" "}
            <ProgressBar variant="info" now={speakingProgress} />
          </div>
          <div>
            Writing:{" "}
            {`${status.writingSuccessLearns} / ${status.writingSuccessLeft}`}{" "}
            <ProgressBar variant="info" now={writingProgress} />
          </div>
          <div>
            <div>Total learns: {status.totalLearns}</div>
          </div>
        </div>
      )}
    </>
  );
}
