import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import styles from './styles.css';

const AlertItem = ({ content, type }) => {
  let iconType;
  let messageClassName;

  switch (type) {
    case 'success':
      iconType = 'check-circle';
      messageClassName = styles.messageSuccess;
      break;
    case 'warning':
      iconType = 'exclamation-circle';
      messageClassName = styles.messageWarning;
      break;
    case 'error':
      iconType = 'cross-circle';
      messageClassName = styles.messageError;
      break;
    case 'loading':
      iconType = 'loading';
      messageClassName = styles.messageLoading;
      break;
    case 'info':
      iconType = 'info-circle';
      messageClassName = styles.messageInfo;
      break;
    default:
      iconType = 'info-circle';
      messageClassName = styles.messageInfo;
  }

  return (
    <div className={`${styles.message} ${messageClassName}`}>
      <Icon type={iconType} className={styles.messageIcon} />{content}
    </div>
  );
};

AlertItem.propTypes = {
  content: PropTypes.node.isRequired,
  type: PropTypes.string,
};

export default AlertItem;

