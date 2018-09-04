/**
*
* ProgressModal
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import styles from './styles.css';

const ProgressModal = ({ hasMask }) => {
  let modal = (
    <div className={styles.modalContainer}>
      <div className={styles.skCircle}>
        <div className={`${styles.skCircle1} ${styles.skChild}`}></div>
        <div className={`${styles.skCircle2} ${styles.skChild}`}></div>
        <div className={`${styles.skCircle3} ${styles.skChild}`}></div>
        <div className={`${styles.skCircle4} ${styles.skChild}`}></div>
        <div className={`${styles.skCircle5} ${styles.skChild}`}></div>
        <div className={`${styles.skCircle6} ${styles.skChild}`}></div>
        <div className={`${styles.skCircle7} ${styles.skChild}`}></div>
        <div className={`${styles.skCircle8} ${styles.skChild}`}></div>
        <div className={`${styles.skCircle9} ${styles.skChild}`}></div>
        <div className={`${styles.skCircle10} ${styles.skChild}`}></div>
        <div className={`${styles.skCircle11} ${styles.skChild}`}></div>
        <div className={`${styles.skCircle12} ${styles.skChild}`}></div>
      </div>
    </div>
  );

  if (hasMask) {
    modal = (
      <div className={styles.modalMask}>
        {modal}
      </div>
    );
  }

  return modal;
};

ProgressModal.propTypes = {
  hasMask: PropTypes.bool,
};

let bodyModalDiv;
function showModal(config = {}) {
  if (!bodyModalDiv) {
    bodyModalDiv = document.createElement('div');
    document.body.appendChild(bodyModalDiv);
  }
  const hasMask = !!config.mask; // potentially not a boolean

  ReactDOM.render(<ProgressModal hasMask={hasMask} />, bodyModalDiv);
  if (hasMask) document.body.style.overflow = 'hidden';
}

function hideModal() {
  if (!bodyModalDiv) {
    bodyModalDiv = document.createElement('div');
    document.body.appendChild(bodyModalDiv);
  }

  ReactDOM.render(<div />, bodyModalDiv);
  document.body.style.overflow = '';
}


const ProgressModalExport = {
  show: showModal,
  hide: hideModal,
};
export default ProgressModalExport;
