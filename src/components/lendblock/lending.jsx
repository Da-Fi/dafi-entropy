import React,{Component} from "react";
import {withRouter} from "react-router-dom";
import {withStyles} from '@material-ui/core/styles';
import {
  Typography,
  Slider
} from '@material-ui/core';
import {colors} from '../../theme/theme'

import Snackbar from '../snackbar/snackbar'
import SupplyAsset from './supplyAsset'
import BorrowAsset from './borrowAsset'
import Loader from '../loader/loader'

import {
  ERROR,
  CONFIGURE_LENDING,
  CONFIGURE_LENDING_RETURNED,
  CONNECTION_CONNECTED,
  CONNECTION_DISCONNECTED,
  LENDING_SUPPLY_RETURNED,
  LENDING_WITHDRAW_RETURNED,
  LENDING_BORROW_RETURNED,
  LENDING_REPAY_RETURNED,
  LENDING_ENABLE_COLLATERAL_RETURNED,
  LENDING_DISABLE_COLLATERAL_RETURNED,
  LENDING_BALANCES_RETURNED
} from '../../constants/constants'

import Store from "../../stores/store";
const emitter=Store.emitter
const dispatcher=Store.dispatcher
const store=Store.store

const styles=theme => ({
  root: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  investedContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    maxWidth: '900px',
    marginTop: '40px',
  },
  loggedOut: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '100%',
    marginTop: '40px',
    [theme.breakpoints.up('md')]: {
      minWidth: '900px',
    }
  },
  introCenter: {
    maxWidth: '500px',
    textAlign: 'center',
    display: 'flex',
    padding: '24px 0px'
  },
  between: {
    width: '40px'
  },
  disaclaimer: {
    padding: '12px',
    border: '1px solid '+colors.dafiGreen,
    borderRadius: '0.75rem',
    marginBottom: '24px',
    lineHeight: '1.2',
    background: colors.dafidark,
    '& a': {
      color: colors.dafiDefaulthex,
      textDecoration: 'none',
      fontWeight: 'bold',
    },
    '& a:hover': {
      textDecoration: 'underline',
    },
  },
  lendingContainer: {
    display: 'flex',
    width: '100%',
    flexWrap: 'wrap',

  },
  supplyContainer: {
    flex: 1,
    border: '4px solid '+colors.dafiGreen,
    paddingBottom: '50px',
    borderRadius: '50px',
    background: colors.dafiDefaulthex,
    minHeight: '400px',
    margin: '12px',
    minWidth: '600px',
    height: 'fit-content'
  },
  title: {
    color: colors.dafiGreen,
    textAlign: 'center',
    background: colors.dafiDefaulthex,
    padding: '38px 24px',
    borderTopRightRadius: '50px',
    borderTopLeftRadius: '50px',
    position: 'relative'
  },
  headers: {
    padding: '0px 12px'
  },
  assetSummary: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    padding: '40px 0px 24px 0px',
    width: '100%',
    flexWrap: 'wrap',

  },
  heading: {
    flex: 2,
  },
  headingCollateral: {
    width: '80px',
  },
  headingAPY: {
    flex: 1
  },
  headingName: {
    flex: 2,
    display: 'flex',
    alignItems: 'center'
  },
  assetName: {
    paddingLeft: '52px'
  },
  limitContainer: {
    width: '300px',
    background: colors.dafiDefaulthex,
    position: 'absolute',
    bottom: '0px',
    left: '50%',
    transform: 'translate(-50%, 50%)',
    padding: '12px',
    borderRadius: '50px',
    border: '4px solid '+colors.dafiGreen,
    display: 'flex',
    color: colors.text,
    alignItems: 'center'
  },
  limit: {
    flex: 1,
    padding: '0px 16px',
    display: 'flex',
    alignItems: 'center'
  },
  limitHeading: {
    paddingRight: '12px'
  }
});

class LendBlock extends Component {

  constructor(props) {
    super()

    const account=store.getStore('account')

    this.state={
      assets: store.getStore('lendingAssets'),
      lendingSupply: store.getStore('lendingSupply'),
      lendingBorrow: store.getStore('lendingBorrow'),
      lendingBorrowLimit: store.getStore('lendingBorrowLimit'),
      usdPrices: store.getStore('usdPrices'),
      account: account,
      address: account.address? account.address.substring(0,6)+'...'+account.address.substring(account.address.length-4,account.address.length):null,
      snackbarType: null,
      snackbarMessage: null,
      loading: true
    }

    if(account&&account.address) {
      dispatcher.dispatch({type: CONFIGURE_LENDING,content: {}})
    }
  }
  componentWillMount() {
    emitter.on(ERROR,this.errorReturned);
    emitter.on(CONFIGURE_LENDING_RETURNED,this.configureLendingReturned);
    emitter.on(LENDING_BALANCES_RETURNED,this.configureLendingReturned);
    emitter.on(CONNECTION_CONNECTED,this.connectionConnected);
    emitter.on(CONNECTION_DISCONNECTED,this.connectionDisconnected);
    emitter.on(LENDING_WITHDRAW_RETURNED,this.showHash);
    emitter.on(LENDING_SUPPLY_RETURNED,this.showHash);
    emitter.on(LENDING_BORROW_RETURNED,this.showHash);
    emitter.on(LENDING_REPAY_RETURNED,this.showHash);
    emitter.on(LENDING_ENABLE_COLLATERAL_RETURNED,this.showHash);
    emitter.on(LENDING_DISABLE_COLLATERAL_RETURNED,this.showHash);
  }

  componentWillUnmount() {
    emitter.removeListener(ERROR,this.errorReturned);
    emitter.removeListener(CONNECTION_CONNECTED,this.connectionConnected);
    emitter.removeListener(CONNECTION_DISCONNECTED,this.connectionDisconnected);
    emitter.removeListener(CONFIGURE_LENDING_RETURNED,this.configureLendingReturned);
    emitter.removeListener(LENDING_BALANCES_RETURNED,this.configureLendingReturned);
    emitter.removeListener(LENDING_WITHDRAW_RETURNED,this.showHash);
    emitter.removeListener(LENDING_SUPPLY_RETURNED,this.showHash);
    emitter.removeListener(LENDING_BORROW_RETURNED,this.showHash);
    emitter.removeListener(LENDING_REPAY_RETURNED,this.showHash);
    emitter.removeListener(LENDING_ENABLE_COLLATERAL_RETURNED,this.showHash);
    emitter.removeListener(LENDING_DISABLE_COLLATERAL_RETURNED,this.showHash);
  };

  configureLendingReturned=(balances) => {
    this.setState({
      assets: store.getStore('lendingAssets'),
      lendingSupply: store.getStore('lendingSupply'),
      lendingBorrow: store.getStore('lendingBorrow'),
      lendingBorrowLimit: store.getStore('lendingBorrowLimit'),
      loading: false
    })
  };

  connectionConnected=() => {
    const account=store.getStore('account')

    this.setState({
      loading: true,
      account: account,
      address: account.address? account.address.substring(0,6)+'...'+account.address.substring(account.address.length-4,account.address.length):null
    })

    dispatcher.dispatch({type: CONFIGURE_LENDING,content: {}})

    const that=this
    setTimeout(() => {
      const snackbarObj={snackbarMessage: 'Wallet successfully connected',snackbarType: 'Info'}
      that.setState(snackbarObj)
    })
  };

  connectionDisconnected=() => {
    this.setState({
      account: null,
      address: null
    })
  }

  errorReturned=(error) => {
    const snackbarObj={snackbarMessage: null,snackbarType: null}
    this.setState(snackbarObj)
    this.setState({loading: false})
    const that=this
    setTimeout(() => {
      const snackbarObj={snackbarMessage: error.toString(),snackbarType: 'Error'}
      that.setState(snackbarObj)
    })
  };

  showHash=(txHash) => {
    const snackbarObj={snackbarMessage: null,snackbarType: null}
    this.setState(snackbarObj)
    this.setState({loading: false})
    const that=this
    setTimeout(() => {
      const snackbarObj={snackbarMessage: txHash,snackbarType: 'Hash'}
      that.setState(snackbarObj)
    })
  };

  render() {
    const {classes}=this.props;
    const {
      loading,
      account,
      snackbarMessage,
      lendingSupply,
      lendingBorrow,
      lendingBorrowLimit
    }=this.state

    if(!account||!account.address) {
      return (
        <div className={classes.root}>
          <div className={classes.loggedOut}>
            <Typography variant={'h5'} className={classes.disaclaimer}>This project is in beta. Use at your own risk.</Typography>
            <div className={classes.introCenter}>
              <Typography variant='h4'>Connect your wallet to continue</Typography>
            </div>
          </div>
          { snackbarMessage&&this.renderSnackbar()}
        </div>
      )
    }

    return (
      <div className={classes.root}>
        <div className={classes.investedContainer}>
          <Typography variant={'h5'} className={classes.disaclaimer}>This project is in beta. Use at your own risk.</Typography>
          <div className={classes.lendingContainer}>
            <div className={classes.supplyContainer}>
              <div className={classes.title} >
                <Typography variant='h4'>Supply Balance</Typography>
                <Typography variant='h1'>${lendingSupply? lendingSupply.toFixed(2):'0.00'}</Typography>
              </div>
              {this.renderSupplyHeaders()}
              {this.renderSupplyAssets()}
            </div>
            <div className={classes.supplyContainer}>
              <div className={classes.title} >
                <Typography variant='h4'>Borrow Balance</Typography>
                <Typography variant='h1'>${lendingBorrow? lendingBorrow.toFixed(2):'0.00'}</Typography>
                <div className={classes.limitContainer}>
                  <Typography variant='h4' className={classes.limitHeading}>Limit</Typography>
                  <div className={classes.limit}>
                    <Slider
                      className={classes.slider}
                      disabled={true}
                      marks={[
                        {
                          value: 0,
                          label: '0%',
                        },
                        {
                          value: 25,
                        },
                        {
                          value: 50,
                          label: '50%',
                        },
                        {
                          value: 75,
                        },
                        {
                          value: 100,
                          label: '100%',
                        },
                      ]}
                      defaultValue={0}
                      value={lendingBorrow*100/lendingBorrowLimit}
                    />
                  </div>
                </div>
              </div>
              {this.renderBorrowHeaders()}
              {this.renderBorrowAssets()}
            </div>
          </div>
        </div>
        { loading&&<Loader />}
        { snackbarMessage&&this.renderSnackbar()}
      </div>
    )
  };

  onSearchChanged=(event) => {
    let val=[]
    val[event.target.id]=event.target.value
    this.setState(val)
  }

  onChange=(event) => {
    let val=[]
    val[event.target.id]=event.target.checked
    this.setState(val)
  };

  renderSupplyHeaders=() => {
    const {classes}=this.props
    return (
      <div className={classes.headers}>
        <div className={classes.assetSummary}>
          <div className={classes.headingName}>
            <Typography variant={'h4'} className={classes.assetName}>Asset</Typography>
          </div>
          <div className={classes.headingAPY}>
            <Typography variant={'h4'} noWrap align='right'>APY</Typography>
          </div>
          <div className={classes.heading}>
            <Typography variant={'h4'} noWrap align='right'>Wallet</Typography>
          </div>
          <div className={classes.heading}>
            <Typography variant={'h4'} noWrap align='right'>Supplied</Typography>
          </div>
        </div>
      </div>
    )
  }

  renderBorrowHeaders=() => {
    const {classes}=this.props
    return (
      <div className={classes.headers}>
        <div className={classes.assetSummary}>
          <div className={classes.headingName}>
            <Typography variant={'h4'} className={classes.assetName}>Asset</Typography>
          </div>
          <div className={classes.headingAPY}>
            <Typography variant={'h4'} noWrap align='right'>APY</Typography>
          </div>
          <div className={classes.heading}>
            <Typography variant={'h4'} noWrap align='right'>Wallet</Typography>
          </div>
          <div className={classes.heading}>
            <Typography variant={'h4'} noWrap align='right'>Borrowed</Typography>
          </div>
          <div className={classes.heading}>
            <Typography variant={'h4'} noWrap align='right'>liquidity</Typography>
          </div>
        </div>
      </div>
    )
  }

  sortSupply=(a,b) => {
    if(a.supplyBalance>b.supplyBalance) {
      return -1
    } else if(a.supplyBalance<b.supplyBalance) {
      return 1
    } else if(a.balance>b.balance) {
      return -1
    } else if(a.balance<b.balance) {
      return 1
    } else {
      return 0
    }
  }

  sortBorrow=(a,b) => {
    if(a.borrowBalance>b.borrowBalance) {
      return -1
    } else if(a.borrowBalance<b.borrowBalance) {
      return 1
    } else if(a.balance>b.balance) {
      return -1
    } else if(a.balance<b.balance) {
      return 1
    } else {
      return 0
    }
  }

  renderSupplyAssets=() => {
    const {
      assets,
      lendingBorrowLimit,
      lendingBorrow
    }=this.state

    return assets.sort(this.sortSupply).map((asset) => {
      return (
        <SupplyAsset key={'supply_'+asset.address} asset={asset} startLoading={this.startLoading} limit={lendingBorrowLimit} limitUsed={lendingBorrow} />
      )
    })
  }

  renderBorrowAssets=() => {
    const {
      assets,
      lendingBorrowLimit,
      lendingBorrow
    }=this.state

    return assets.sort(this.sortBorrow).map((asset) => {
      return (
        <BorrowAsset key={'borrow_'+asset.address} asset={asset} startLoading={this.startLoading} limit={lendingBorrowLimit} limitUsed={lendingBorrow} />
      )
    })
  }

  startLoading=() => {
    this.setState({loading: true})
  }

  renderSnackbar=() => {
    var {
      snackbarType,
      snackbarMessage
    }=this.state
    return <Snackbar type={snackbarType} message={snackbarMessage} open={true} />
  };
}

export default withRouter(withStyles(styles)(LendBlock));
