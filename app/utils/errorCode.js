/**
 * Error Code Wiki:
 * https://birdsystem.atlassian.net/wiki/pages/viewpage.action?pageId=39387273
 *
 */
import i18n from 'i18next';
import { browserHistory } from 'react-router';

export const ERROR_LEVEL_IGNORE = 'ignore';
export const ERROR_LEVEL_WARNING = 'warning';
export const ERROR_LEVEL_ERROR = 'error';
export const ERROR_LEVEL_FATAL = 'fatal';

const handlerMap = {
  // System errors
  // Generic error code
  100101: (data) => errorAssessment(false, data.message, ERROR_LEVEL_ERROR),
  // Missing required param [%s]
  100102: (data) => errorAssessment(false, data.message || i18n.t('error.invalid_param'), ERROR_LEVEL_ERROR),
  // Deprecated. Invalid param [%s]
  100103: (data) => errorAssessment(false, data.message || i18n.t('error.invalid_param'), ERROR_LEVEL_ERROR),
  // Service not available
  100104: () => errorAssessment(false, i18n.t('error.service_not_available'), ERROR_LEVEL_ERROR),
  // Cannot find %s [%s]
  100105: () => errorAssessment(false, i18n.t('error.cannot_find_record'), ERROR_LEVEL_ERROR),
  // Unable write to log
  100108: () => errorAssessment(false, i18n.t('error.unable_to_log'), ERROR_LEVEL_ERROR),
  // Method is not allowed
  100109: () => errorAssessment(false, i18n.t('error.method_not_allowed'), ERROR_LEVEL_ERROR),
  // Deprecated. Username or password or apikey is invalid.
  100110: () => errorAssessment(false, i18n.t('error.invalid_username_or_password'), ERROR_LEVEL_ERROR),
  // Deprecated. Please login first
  100111: () => {
    const invalidPreviousRouteRegex = /^\/(login|signup|forgot-password|reset-password|set-password)/g;
    const callback = window.location.pathname;
    if (!callback.match(invalidPreviousRouteRegex)) {
      browserHistory.push(`/login?service=${callback}`);
    } else {
      browserHistory.push('/login');
    }
    return errorAssessment(false, i18n.t('error.please_login_first'), ERROR_LEVEL_WARNING, 5000);
  },

  // Account is not activated
  100201: () => errorAssessment(false, i18n.t('error.account_not_activated'), ERROR_LEVEL_ERROR),
  // Invalid username or password
  100202: () => errorAssessment(false, i18n.t('error.invalid_username_or_password'), ERROR_LEVEL_ERROR),
  // Access denied, please login first
  100203: () => {
    const invalidPreviousRouteRegex = /^\/(login|signup|forgot-password|reset-password|set-password)/g;
    const callback = window.location.pathname;
    if (!callback.match(invalidPreviousRouteRegex)) {
      browserHistory.push(`/login?service=${callback}`);
    } else {
      browserHistory.push('/login');
    }
    return errorAssessment(false, i18n.t('error.please_login_first'), ERROR_LEVEL_WARNING, 5000);
  },

  // Business errors
  // Something wrong with external service
  200201: () => errorAssessment(false, i18n.t('error.external_service_error'), ERROR_LEVEL_ERROR),
};

/**
 * Assessment templates - ignore
 *
 */
function ignore() { // eslint-disable-line
  return errorAssessment(false, '', ERROR_LEVEL_IGNORE); // No messages to delivery, please ignore
}

function defaultHandler(code) {
  if (code && code.toString() && code.toString().length > 0) {
    code = code.toString(); // eslint-disable-line
    if (code[0] === '1') { // general purpose error code
      return errorAssessment(false, i18n.t('error.system_error'), ERROR_LEVEL_ERROR);
    } else if (code[0] === '2') { // business error code
      return errorAssessment(false, i18n.t('error.system_error'), ERROR_LEVEL_ERROR);
    }

    return errorAssessment(false, i18n.t('error.system_error'), ERROR_LEVEL_ERROR);
  }

  return errorAssessment(false, i18n.t('error.system_error'), ERROR_LEVEL_FATAL);
}

/**
 *  The data structure of handler's return value.
 *
 */

function errorAssessment(success, message, level, duration) {
  return {
    success,
    message,
    level,
    duration,
  };
}

export default function errorCodeHandler(data) {
  const handler = handlerMap[data.errCode] || defaultHandler;

  return handler(data);
}
