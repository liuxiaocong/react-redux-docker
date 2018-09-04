import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { translate } from 'react-i18next';
import { selectData, selectSagaData } from './selectors';
import { test, testSaga } from './actions';
import styles from './styles.css';

class Template extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {

  }


  doTest() {
    this.props.test(this.dataInput.value);
  }

  doSagaTest() {
    this.props.testSaga(this.sagaDataInput.value);
  }

  render() {
    const currentUser = this.props.currentUser;
    const t = this.props.t;
    const name = currentUser ? currentUser.name : '';

    return (
      <div className={styles.main}>
        <div>Template, user name: {name}</div>
        <div> Current data: {this.props.data}</div>
        <div className={styles.wrap}>
          <input ref={(dataInput) => { this.dataInput = dataInput; }} placeholder="input data to reducer" />
          <button onClick={() => { console.log(this); this.doTest(); }}>Test</button>
        </div>
        <div> Current sagaData: {this.props.sagaData}</div>
        <div className={styles.wrap}>
          <input ref={(sagaDataInput) => { this.sagaDataInput = sagaDataInput; }} placeholder="input data, catch by saga, then update reducer" />
          <button onClick={() => { this.doSagaTest(); }}>Test Saga</button>
        </div>
      </div>
    );
  }
}

Template.propTypes = {
  currentUser: PropTypes.object,
  t: PropTypes.func,
  test: PropTypes.func,
  testSaga: PropTypes.func,
  data: PropTypes.string,
  sagaData: PropTypes.string,
};

const mapStateToProps = createSelector(
  selectData(),
  selectSagaData(),
  (data, sagaData) => ({
    data,
    sagaData,
  }),
);

const mapDispatchToProps = (dispatch) => ({
  testSaga: (sagaData) => dispatch(testSaga(sagaData)),
  test: (data) => dispatch(test(data)),
});

export default translate()(connect(mapStateToProps, mapDispatchToProps)(Template));
