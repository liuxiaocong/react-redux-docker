import React from 'react';
import PropTypes from 'prop-types';

import 'sanitize.css/sanitize.css';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import enUS from 'antd/lib/locale-provider/en_US';
import zhCN from 'antd/lib/locale-provider/zh_CN';

import { LocaleProvider } from 'antd';
import { changeLanguage } from './actions';
import { selectCurrentLanguage } from './selectors';

class App extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
  }

  render() {
    let antdLang = zhCN;
    if (this.props.currentLanguage === 'en_GB') {
      antdLang = enUS;
    }

    return (
      <LocaleProvider locale={antdLang}>
        {this.props.children}
      </LocaleProvider>
    );
  }
}

App.propTypes = {
  children: PropTypes.node,
  currentLanguage: PropTypes.string,
};

const mapStateToProps = createSelector(
  selectCurrentLanguage(),
  (currentLanguage) => ({ currentLanguage })
);

function mapDispatchToProps(dispatch) {
  return {
    changeLanguage: (lang) => dispatch(changeLanguage(lang)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
