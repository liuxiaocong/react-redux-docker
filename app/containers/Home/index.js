import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { createSelector } from 'reselect';
import { translate } from 'react-i18next';
import { selectCurrentUser } from 'containers/App/selectors';
import { loadUserInfo } from 'containers/App/actions';
import styles from './styles.css';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'account',
      autoLogin: true,
    };
  }

  componentDidMount() {

  }

  render() {
    const currentUser = this.props.currentUser;
    const t = this.props.t;
    const name = currentUser ? currentUser.name : '';

    return (
      <div>
        <div>{t('common.test_text')}</div>
        <div>User Name: {name}</div>
        <div>{ !currentUser && <button onClick={() => this.props.loadUserInfo()}>Login</button>}</div>
        <div><button>English</button> <button>中文</button></div>
        <div><Link to="/template">open template page</Link></div>
        <div><Link to="/home/test">open home test</Link></div>

        <div className={styles.childWrap}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
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

const mapDispatchToProps = (dispatch) => ({
  loadUserInfo: () => dispatch(loadUserInfo()),
});

export default translate()(connect(mapStateToProps, mapDispatchToProps)(HomePage));
