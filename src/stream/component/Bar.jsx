import React from "react";
import PropTypes from "prop-types";
import styles from "./Bar.module.css";

export default function Bar({ redScore, blueScore }) {
  const totalScore = redScore + blueScore;
  const redPercentage = ((redScore / totalScore) * 100).toFixed(1);
  const bluePercentage = ((blueScore / totalScore) * 100).toFixed(1);

  return (
    <div className={styles.progress_bar_container}>
      <div
        className={styles.red_bar}
        style={{ width: `${redPercentage}%` }}
      >
        {redPercentage > 10 && <span className={styles.score_label}>{redPercentage}%</span>}
      </div>
      <div
        className={styles.blue_bar}
        style={{ width: `${bluePercentage}%` }}
      >
        {bluePercentage > 10 && <span className={styles.score_label}>{bluePercentage}%</span>}
      </div>
    </div>
  );
};

Bar.propTypes = {
  redScore: PropTypes.number,
  blueScore: PropTypes.number
}
