import React,{Component} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import {createMuiTheme,MuiThemeProvider} from '@material-ui/core/styles';

import {
  Switch,
  Route
} from "react-router-dom";
import IpfsRouter from 'ipfs-react-router'
import interestTheme from './theme'
import './i18n';

import Dashboard from './components/dashboard/dashboard';
import Entropy from './components/vault/vault';
import APR from './components/apr';
import Streamgen from './components/streamgen';
import Manage from './components/manage';
import Performance from './components/performance';
import ZeroSwap from './components/zap';
import IDai from './components/idai';
import Experimental from './components/experimental';
import NewCover from './components/cover/newCover';
import EntropyXgrid from './components/incubator/entropyxgrid';
import SEO from './components/seo';
import {injected} from "./stores/connectors";

import {
  CONNECTION_CONNECTED,
} from './constants'

import Store from "./stores";

const emitter=Store.emitter
const store=Store.store


class App extends Component {

  initalState={};
  updateAccount() {
    window.ethereum.on('accountsChanged',function(accounts) {
      store.setStore({account: {address: accounts[0]}})

      const web3context=store.getStore('web3context')
      if(web3context) {
        emitter.emit(CONNECTION_CONNECTED)
      }
    })
  }
  componentDidMount() {
    injected.isAuthorized().then(isAuthorized => {
      if(isAuthorized) {
        injected.activate()
          .then((a) => {
            store.setStore({account: {address: a.account},web3context: {library: {provider: a.provider}}})
            emitter.emit(CONNECTION_CONNECTED)
          })
          .catch((e) => {
            console.log(e)
          })
      } else {

      }
    });

    if(window.ethereum) {
      this.updateAccount()
    } else {
      window.addEventListener('ethereum#initialized',this.updateAccount,{
        once: true,
      });
    }
  }

  render() {
    return (
      <MuiThemeProvider theme={createMuiTheme(interestTheme)}>
        <CssBaseline />
        <IpfsRouter>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            maxWidth: '100%',
            alignItems: 'center',
            background: '#363640'
          }}>
            <SEO />
            <Switch>
              <Route path="/stats">
                <Dashboard />
                <APR />
              </Route>
              <Route path="/streamgen">
                <Dashboard />

                <Streamgen />
              </Route>
              <Route path="/zeroswap">
                <Dashboard />
                <ZeroSwap />
              </Route>
              <Route path="/idai">
                <IDai />

              </Route>
              <Route path="/performance">
                <Dashboard />
                <Performance />
              </Route>
              <Route path="/manage">
                <Dashboard />
                <Manage />
              </Route>
              <Route path="/entropy">
                <Dashboard />
                <Entropy />
              </Route>

              <Route path="/experimental">
                <Dashboard />
                <Experimental />
              </Route>
              <Route path="/Incubator">
                <Dashboard />
                <EntropyXgrid />
              </Route>
              <Route path="/cover">
                <Dashboard />
                <NewCover />
              </Route>
              <Route path="/">
                <Dashboard />
              </Route>
            </Switch>


          </div>

        </IpfsRouter>

      </MuiThemeProvider>

    );
  }
}



export default App;
