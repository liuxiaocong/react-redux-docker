import _ from 'lodash';

const DEFAULT_DURATION = 5000;

function MessageQueue() {
  /* list that holds messages */
  const list = [];

  let listeners = []; // listeners on list
  let idTemplate = 1; // template for generating message id
  let regTokenTemplate = 1; // template for generating register token

  const self = this;

  /**
   * Nofity all registered listeners.
   */
  const notifyAll = () => {
    const availableListeners = [];
    _.forEach(listeners, (listener) => {
      if (listener.id && _.isFunction(listener.callback)) {
        listener.callback(self.list()); // delivery a copy
        availableListeners.push(listener); // cache those available
      }
    });

    listeners = availableListeners; // get rid of those dead
  };

  /**
   * Converts duration value to number
   */
  const numberDuration = (duration) => (Number.isNaN(Number(duration)) ? DEFAULT_DURATION : Number(duration));

  /**
   * messageConfig should contain at least a type string (for the icon) and a content string.
   */
  const add = (messageConfig, durationParam) => {
    const duration = numberDuration(durationParam);

    /* When it's a duplicate. */
    const { type, content } = messageConfig;
    const duplicateMessage = _.find(list, (msg) => (msg.type === type && msg.content === content));
    if (duplicateMessage) {
      clearTimeout(duplicateMessage.timeout);
      duplicateMessage.duration = duration;
      autoRemove(duplicateMessage, duration);
      return duplicateMessage.id;
    }

    const id = idTemplate + 1;
    idTemplate += 1;
    const newMessage = _.merge({}, messageConfig, { id, duration });
    list.push(newMessage);
    notifyAll();
    if (duration) autoRemove(newMessage, duration);
    return id;
  };

  const remove = (alertId) => {
    let hasRemoved = false;
    _.remove(list, (alert) => {
      if (alert.id === alertId) {
        hasRemoved = true;
      }
      return alert.id === alertId;
    });
    notifyAll();

    return hasRemoved ? alertId : false;
  };

  const autoRemove = (newMessage, duration) => {
    newMessage.timeout = setTimeout( // eslint-disable-line no-param-reassign
      () => remove(newMessage.id), numberDuration(duration)
    );
  };

  const register = (callback) => {
    if (_.isFunction(callback)) {
      const regToken = regTokenTemplate + 1;
      regTokenTemplate += 1;
      /* 注册监听器 */
      listeners.push({ id: regToken, callback });
      /* 返回监听id */
      return regToken;
    }

    /* 注册失败 */
    return false;
  };

  const unregister = (regToken) => {
    let hasRemoved = false;
    if (regToken) {
      _.remove(listeners, (listener) => {
        if (listener.id === regToken) {
          hasRemoved = true;
          return true;
        }
        return false;
      });
    }

    return hasRemoved ? regToken : false;
  };

  this.list = () => _.cloneDeep(list);
  this.add = add;
  this.remove = remove;

  this.register = register;
  this.unregister = unregister;
}

export default MessageQueue;

