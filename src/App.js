import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FadeIn from 'react-fade-in';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import * as actions from './redux/actions/BlockedActions';
import './App.css';
import Search from './components/Search';
import Loading from './components/Loading';
import Cards from './components/Card';
import { ModalHOC } from './components/Dialog';
import {
  selectBlockedList,
  selectCurrentData,
  selectDone,
  selectLoading,
  selectErrors,
} from './selectors';
import { RECENT_BLOCK, TOP_BLOCKED } from './common/consts';

const theme = createMuiTheme({
  direction: 'rtl',
  palette: {
    type: 'dark',
  },
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false, modalTitle: null };
    this.onClickHandler = this.onClickHandler.bind(this);
    this.showModal = this.showModal.bind(this);
  }

  componentDidMount() {
    const { fectchBlockedWithAxios } = this.props;
    fectchBlockedWithAxios();
  }

  onClickHandler(title) {
    this.setState({ modalTitle: title });
    this.showModal(true);
  }

  showModal(show) {
    this.setState({ showModal: show });
  }

  render() {
    const {
      loading,
      blockedList,
      done,
      userData,
      error,
    } = this.props;

    const { showModal, modalTitle } = this.state;
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


            {userData && <Cards items={userData} /> }
            { showModal
             && (
             <ModalHOC
               show={showModal}
               toggleModal={this.showModal}
               title={modalTitle}
             />
             ) }
            <br />
            { done && (
            <FadeIn>
              <Grid item>
                {/* <ButtonGroup color="primary" aria-label="top users group buttons"> */}
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => this.onClickHandler(RECENT_BLOCK)}
                >
                  {RECENT_BLOCK}
                </Button>
                {' '}
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => this.onClickHandler(TOP_BLOCKED)}
                >
                  TOP 10
                </Button>
                {/* </ButtonGroup> */}
                {' '}
              </Grid>
            </FadeIn>
            ) }

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
