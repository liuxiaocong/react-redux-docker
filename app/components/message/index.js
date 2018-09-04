import React from 'react';
import ReactDOM from 'react-dom';
import { TransitionMotion, spring } from 'react-motion';
import { Modal } from 'antd';
import MessageQueue from './MessageQueue';
import MessageItem from './MessageItem';
import cssStyles from './styles.css';

const messageQueue = new MessageQueue();

class AlertContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    };
  }

  componentDidMount() {
    const self = this;
    this.messageQueue = messageQueue.register((messages) => self.setState({ messages }));
  }

  componentWillUnmount() {
    const listenerId = this.messageQueue;
    messageQueue.unregister(listenerId);
  }

  getStyles() {
    return this.state.messages.map((message) => ({
      key: `${message.id}`,
      data: message,
      style: { maxHeight: spring(120, { stiffness: 129, stamping: 13 }) },
    })) || [];
  }

  willEnter() {
    return { maxHeight: 0 };
  }

  willLeave() {
    return { maxHeight: spring(0) };
  }

  render() {
    return (
      <div className={cssStyles.messageMask}>

        <TransitionMotion
          willEnter={this.willEnter}
          willLeave={this.willLeave}
          styles={this.getStyles()}
        >
          {
            (styles) => (
              <div>
                {
                  styles.map(({ key, data, style }) => (
                    <div
                      key={key}
                      className={cssStyles.messageContainer}
                      style={{ maxHeight: style.maxHeight }}
                    >
                      <MessageItem
                        content={data.content}
                        type={data.type}
                        id={data.id}
                      />
                      <br />
                    </div>
                  ))
                }
              </div>
            )
          }
        </TransitionMotion>
      </div>
    );
  }
}

const messageDiv = document.createElement('div');
document.body.appendChild(messageDiv);

ReactDOM.render(<AlertContainer />, messageDiv);

const errorMessageQueue = new MessageQueue();

const message = {
  success: (content, duration) => messageQueue.add({ type: 'success', content }, duration),
  error: (content, duration) => {
    // new errors would be ignored until the first and only error is considered
    // outdated and cleared by queue
    if (errorMessageQueue.list().length) return false;
    const alertId = errorMessageQueue.add({ type: 'error', content }, duration);
    Modal.error({
      content,
      onCancel: () => errorMessageQueue.remove(alertId),
      maskClosable: true,
    });
    return alertId;
  },
  info: (content, duration) => messageQueue.add({ type: 'info', content }, duration),
  warning: (content, duration) => messageQueue.add({ type: 'warning', content }, duration),
  warn: (content, duration) => messageQueue.add({ type: 'warning', content }, duration),
  loading: (content, duration) => messageQueue.add({ type: 'loading', content }, duration),
  destroy: messageQueue.remove,
};

export default message;
