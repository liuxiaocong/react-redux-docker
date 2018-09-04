import 'whatwg-fetch';
import URL from 'url';
import querystring from 'querystring';
import message from 'components/message';
import i18n from 'i18next';
import ProgressModal from 'components/ProgressModal';
import appConfig from 'config';
import errorCodeHandler from './errorCode';

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           An object containing either "data" or "error"
 */
export default function request(url, options) {
  const config = Object.assign({}, options, { credentials: 'include' });

  let fetchUrl = url;

  const systemBaseUrl = `${appConfig.serverHost}`;

  fetchUrl = systemBaseUrl + fetchUrl;


  if (config.method === 'POST' && !config.headers && !config.form) {
    config.headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
    const params = config.body;
    Object.keys(params).forEach((key) => {
      if (typeof params[key] === 'string' || params[key] instanceof String) {
        params[key] = params[key].trim();
      }
    });
    config.body = JSON.stringify(params);
  }

  const urlParams = config.urlParams || {};
  // cache config
  const isGetMethod = config.method === 'GET' || config.method === undefined;
  if (config.cache !== true && isGetMethod) {
    urlParams.ts = new Date().getTime();
  }

  // URL Params
  if (Object.keys(urlParams).length) {
    const urlObject = URL.parse(fetchUrl, true);
    let params = querystring.parse(urlObject.search.slice(1));
    params = Object.assign({}, params, urlParams);
    fetchUrl = URL.resolve(urlObject.href, `?${querystring.stringify(params)}`);
    delete config.urlParams;
  }

  // add token to headers
  const token = localStorage.getItem('index_manage_token');

  if (token) {
    if (config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      config.headers = {
        Authorization: `Bearer ${token}`,
      };
    }
  }

  //  Timeout Promise
  handleProgressModal('show', config.feedback);
  // const fetchPromise = fetch(fetchUrl, config);
  // const promise = timeoutPromise(15 * 1000, fetchPromise);
  const promise = timeoutFetchWithRetries(fetchUrl, config);

  promise.catch((error) => {
    console.log(error); // eslint-disable-line
    const errorData = {
      success: false,
      message: error.toString(),
    };
    handleProgressModal('hide', config.feedback);
    handleFeedback(errorData, config.feedback);
  });

  if (config.headers && config.headers.Accept === 'image/png') {
    return promise.then((response) => response.blob());
  }

  if (config.headers && config.headers.Accept === 'text/html') {
    return promise.then((response) => response.text());
  }


  return promise
    .then(checkStatus)
    .then(parseJSON)
    .then((responseJson = {}) => {
      handleProgressModal('hide', config.feedback);
      if (!config.customHandler) {
        handleFeedback(handleErrorCode(responseJson));
      }
      return responseJson;
    }).catch((error) => handleError(error, config.feedback));
}

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  try {
    return response.json();
  } catch (e) {
    throw new Error(i18n.t('error.system_error'));
  }
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {objct} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(i18n.t('error.system_error'));
  error.response = response;
  throw error;
}

/**
 * Handle feedback - global alert
 */
function handleFeedback(errorData) {
  const msg = errorData.message || i18n.t('error.system_error');

  if (!errorData.success) {
    // All error for now. But errorData does have a level attr
    if (errorData.level === 'warning') {
      message.warning(msg, errorData.duration || 5000);
    } else {
      message.error(msg, errorData.duration || 5000);
    }
  }
}

/**
 * Handle feedback - global progress
 */
function handleProgressModal(action, config = {}) {
  const modalConfig = Object.assign({
    progress: false,
  }, config);

  if (modalConfig.progress && action === 'show') {
    ProgressModal.show(modalConfig.progress || {});
  }

  if (modalConfig.progress && action === 'hide') {
    ProgressModal.hide();
  }
}

/**
 * Timeout Promise
 */
function timeoutPromise(ms, promise) {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      const timeoutError = new Error(i18n.t('error.request_timeout'));
      timeoutError.isCustomTimeout = true;
      reject(timeoutError);
    }, ms);
    promise.then(
      (res) => {
        clearTimeout(timeoutId);
        resolve(res);
      },
      (err) => {
        clearTimeout(timeoutId);
        reject(err);
      }
    );
  });
}

function timeoutFetchWithRetries(fetchUrl, config) {
  const ms = config.timeout || 15000;
  const retries = config.retry || 3;

  return new Promise((resolve, reject) => {
    let triedTimes = 1;
    const promiseSuccessHandler = (res) => resolve(res);
    const promiseFailureHanlder = (err) => {
      if (err.isCustomTimeout && triedTimes++ < retries) { // eslint-disable-line
        timeoutPromise(ms, fetch(fetchUrl, config)).then(
          promiseSuccessHandler,
          promiseFailureHanlder
        );
      } else {
        reject(err);
      }
    };

    timeoutPromise(ms, fetch(fetchUrl, config)).then(
      promiseSuccessHandler,
      promiseFailureHanlder
    );
  });
}

/**
 * Handle Error
 */
function handleError(error) {
  const msg = error.message || i18n.t('error.system_error');
  message.error(msg);

  return { error };
}


/**
 * Handle Error Code
 */
function handleErrorCode(data) {
  if (!data.success) {
    return errorCodeHandler(data);
  }
  return {
    success: true,
  };
}

