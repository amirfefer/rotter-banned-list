import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FadeIn from 'react-fade-in';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import * as actions from './redux/actions/BlockedActions';
import './App.css';
import Search from './components/Search';
import Loading from './components/Loading';
import Cards from './components/Card';
import {
  selectBlockedList,
  selectCurrentData,
  selectDone,
  selectLoading,
  selectErrors,
} from './selectors';

const theme = createMuiTheme({
  direction: 'rtl',
  palette: {
    type: 'dark',
  },
});

class App extends Component {
  componentDidMount() {
    const { fectchBlockedWithAxios } = this.props;
    fectchBlockedWithAxios();
  }

  render() {
    const {
      loading,
      blockedList,
      done,
      userData,
      error,
    } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <header className="App-header">
            {!done ? (
              <Loading error={error} loading={loading} />) : (
                <>
                {' '}
                <br />
                <FadeIn>
                    <Search list={blockedList} />
                  </FadeIn>
                {' '}
                <br />
              </>
            )}
            { userData && <Cards items={userData} /> }

          </header>
        </div>
      </MuiThemeProvider>
    );
  }
}
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

const mapStateToProps = (state) => ({
  blockedList: selectBlockedList(state),
  loading: selectLoading(state),
  done: selectDone(state),
  userData: selectCurrentData(state),
  error: selectErrors(state),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
