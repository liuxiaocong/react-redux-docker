import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { translate } from 'react-i18next';
import Login from 'ant-design-pro/lib/Login';
import { selectCurrentUser } from 'containers/App/selectors';
import styles from './styles.css';

const { UserName, Password, Submit } = Login;

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'account',
      autoLogin: true,
    };
  }

  componentDidMount() {
    if (this.props.location && this.props.location.query) {
      const query = this.props.location.query;
      if (query.service) {
        this.props.saveCallbackRoute(query.service);
      }
    }
  }

  onTabChange = (type) => {
    this.setState({ type });
  }

  handleSubmit = (err, values) => {

  }

  render() {
    const { t } = this.props;
    const { type } = this.state;
    return (
      <div className={styles.main}>
        <Login
          defaultActiveKey={type}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
        >
          <UserName name="username" placeholder={t('common.username')} />
          <Password name="password" placeholder={t('common.password')} />
          <Submit>{t('common.login')}</Submit>
        </Login>
      </div>
    );
  }
}

LoginPage.propTypes = {
  t: PropTypes.func,
  saveCallbackRoute: PropTypes.func,
  location: PropTypes.object,
};

const mapStateToProps = createSelector(
   selectCurrentUser(),
   (currentUser) => ({
     currentUser,
   }),
 );

const mapDispatchToProps = (dispatch) => ({
  login: (formData) => dispatch(login(formData)),
});

export default translate()(connect(mapStateToProps, mapDispatchToProps)(LoginPage));
