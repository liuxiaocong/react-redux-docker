import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { createSelector } from 'reselect';
import { translate } from 'react-i18next';
import { selectCurrentUser } from 'containers/App/selectors';
import { loadUserInfo } from 'containers/App/actions';
import styles from './styles.css';

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {

  }

  render() {
    const currentUser = this.props.currentUser;
    const t = this.props.t;
    const name = currentUser ? currentUser.name : '';

    return (
      <div>
        Test
      </div>
    );
  }
}

Test.propTypes = {
  t: PropTypes.func,
  currentUser: PropTypes.object,
  loadUserInfo: PropTypes.func,
};

const mapStateToProps = createSelector(
  selectCurrentUser(),
  (currentUser) => ({
    currentUser: currentUser && currentUser.toJS(),
  }),
);

const mapDispatchToProps = (dispatch) => ({});

export default translate()(connect(mapStateToProps, mapDispatchToProps)(Test));
