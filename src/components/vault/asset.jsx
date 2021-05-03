import React,{Component} from "react";
import {withRouter} from "react-router-dom";
import {withStyles} from '@material-ui/core/styles';

import {
  Typography,
  TextField,
  Button
} from '@material-ui/core';

import WarningIcon from '@material-ui/icons/Warning';

import {
  ERROR,
  DEPOSIT_VAULT,
  DEPOSIT_VAULT_RETURNED,
  WITHDRAW_VAULT,
  WITHDRAW_VAULT_RETURNED,
  DEPOSIT_ALL_VAULT,
  DEPOSIT_ALL_VAULT_RETURNED,
  WITHDRAW_ALL_VAULT,
  WITHDRAW_ALL_VAULT_RETURNED
} from '../../constants'

import {colors} from '../../theme/theme.jsx';

import Store from "../../stores";
const emitter=Store.emitter
const dispatcher=Store.dispatcher
const store=Store.store

const styles=theme => ({
  root: {

    flexGrow: 1,
    [theme.breakpoints.down('xl')]: {
      maxWidth: '1200px',
      minWidth: '0%',
      flexGrow: 1,
      flexShrink: 1,

    }
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  value: {
    cursor: 'pointer',
    color: colors.contrastText
  },
  actionInput: {
    padding: '0px 0px 12px 0px',
    fontSize: '0.5rem',
    fontFamily: 'Eczar',
    fontWeight: '600'


  },
  balances: {
    maxWidth: '97%',
    minWidth: '0%',
    textAlign: 'right',
    paddingRight: '24px',
    cursor: 'pointer'

  },
  vaultContainer: {
    display: 'flex',
    flex: '1',
    flexDirection: 'column',
    maxWidth: '97%',
    minWidth: '0',
    width: 'fit',
    background: 'rgba(26,26,26,0)',

  },
  actionsContainer: {
    paddingBottom: '12px',
    background: colors.dafilight, ///surrounding area asset input
    display: 'flex',
    flexDirection: 'column',
    maxwidth: '97%',
    minWidth: '0',
    flex: '1',
    padding: '24px',
    width: 'fit',

    [theme.breakpoints.down('xl')]: {
      flexDirection: 'column',
      width: 'auto',
      flexGrow: 1,
      flexShrink: 1
    }
  },
  title: {
    paddingRight: '24px'
  },
  actionButton: {

    height: '32px',
    width: 'fit',
    fontSize: '0.625rem',
    border: '2px solid '+colors.dafiDefaulthex,
    padding: '6px 12px',
    variant: 'contained',
    fontFamily: [
      '"Eczar"',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      '"RobotoC"',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      background: colors.dafiDefaultHex,
      borderColor: colors.dafifuschia,
      fontColor: colors.dafifuschia,
      boxShadow: 'none'
    },
    '&:active': {
      boxShadow: 'none',
      background: colors.dafiDefaulthex,
      borderColor: colors.dafiGeen,
      fontColor: colors.dafiGreen
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)'
    }

  },
  tradeContainer: {
    flex: 1,
    background: 'rgba(26,26,26,0)',
    border: '3px solid '+colors.dafident,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 'fit'
  },
  sepperator: {
    borderBottom: '1px solid '+colors.purple,
    margin: '24px',
    [theme.breakpoints.down('xl')]: {
      maxWidth: '100%',
      minWidth: '0%',
      borderBottom: '1px solid'+colors.purple,
      margin: '24px'

    }
  },
  scaleContainer: {
    display: 'flex',

    justifyContent: 'space-between',
    padding: '0px 0px 12px 0px',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  scale: {

    minWidth: '10px'
  },
  buttonText: {
    fontWeight: '500',
    font: '"RobotoC"',
    color: "#00f"
  },
  headingContainer: {
    borderRadius: '24px',
    width: '97%',
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  heading: {
    paddingBottom: '12px',
    flex: 1,
    flexShrink: 0,
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  right: {
    textAlign: 'right'
  },
  buttons: {

    display: 'flex',
    width: '90%'
  },
  disabledContainer: {
    width: '97%',
    paddingTop: '12px',
    textAlign: 'center'
  },
  assetSummary: {
    display: 'flex',
    flex: 1,
    maxWidth: '97%',
    width: '75%',
    paddingBottom: '12px',
    background: colors.dafilight,
    border: '4px solid '+colors.dafiGreen, //toplevel border
    borderRadius: '16px',
    padding: '24px',
    [theme.breakpoints.down('xl')]: {
      flexDirection: 'column'
    },
  },
  headingEarning: {
    flex: 1,
    padding: '12px'
  },
  headingStrategy: {
    padding: '12px',
    width: '256px'
  },
  grey: {
    color: colors.darkBlack
  },
  flexy: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  fullWidth: {
    minWidth: '100%',
    margin: '18px 0px',
    borderBottom: '1px solid '+colors.dafiGreen
  },
  assetSummarySectionheader: {
    width: '97%'
  },
  link: {
    cursor: 'pointer',
    textDecoration: 'underline'
  },
});


class Asset extends Component {

  constructor() {
    super()

    this.state={
      amount: '',
      amountError: false,
      redeemAmount: '',
      redeemAmountError: false,
      account: store.getStore('account'),
    }
  }

  componentWillMount() {
    emitter.on(DEPOSIT_VAULT_RETURNED,this.depositReturned);
    emitter.on(WITHDRAW_VAULT_RETURNED,this.withdrawReturned);
    emitter.on(DEPOSIT_ALL_VAULT_RETURNED,this.depositReturned);
    emitter.on(WITHDRAW_ALL_VAULT_RETURNED,this.withdrawReturned);
    emitter.on(ERROR,this.errorReturned);
  }

  componentWillUnmount() {
    emitter.removeListener(DEPOSIT_VAULT_RETURNED,this.depositReturned);
    emitter.removeListener(WITHDRAW_VAULT_RETURNED,this.withdrawReturned);
    emitter.removeListener(DEPOSIT_ALL_VAULT_RETURNED,this.depositReturned);
    emitter.removeListener(WITHDRAW_ALL_VAULT_RETURNED,this.withdrawReturned);
    emitter.removeListener(ERROR,this.errorReturned);
  };

  depositReturned=() => {
    this.setState({loading: false,amount: ''})
  };

  withdrawReturned=(txHash) => {
    this.setState({loading: false,redeemAmount: ''})
  };

  errorReturned=(error) => {
    this.setState({loading: false})
  };

  render() {
    const {classes,asset}=this.props;
    const {
      amount,
      amountError,
      redeemAmount,
      redeemAmountError,
      loading
    }=this.state

    return (
      <div className={classes.root}>

        <div className={classes.actionsContainer} style={{background: colors.dafifmj}}>
          <div className={classes.tradeContainer}>
            <div className={classes.balances}>
              <Typography variant='body1' style={{fontFamily: '"Eczar"'}} onClick={() => {this.setAmount(100)}} className={classes.value} noWrap>{'Wallet '+(asset.balance? (Math.floor(asset.balance*10000)/10000).toFixed(4):'0.0000')} {asset.tokenSymbol? asset.tokenSymbol:asset.symbol}</Typography>
            </div>
            <TextField
              fullWidth
              className={classes.actionInput}
              id='amount'
              value={amount}
              error={amountError}
              onChange={this.onChange}
              disabled={loading}
              placeholder="0.00"
              variant="outlined"
              onKeyDown={this.inputKeyDown}
            />
            <div className={classes.scaleContainer}>
              <Button
                className={classes.scale}
                variant='text'
                disabled={loading}
                color="primary"
                onClick={() => {this.setAmount(25)}}>
                <Typography style={{fontFamily: '"Eczar"'}} variant={'body1'}>25%</Typography>
              </Button>
              <Button
                className={classes.scale}
                variant='text'
                disabled={loading}
                color="primary"
                onClick={() => {this.setAmount(50)}}>
                <Typography style={{fontFamily: '"Eczar"'}} variant={'body1'}>50%</Typography>
              </Button>
              <Button
                className={classes.scale}
                variant='text'
                disabled={loading}
                color="primary"
                onClick={() => {this.setAmount(75)}}>
                <Typography style={{fontFamily: '"Eczar"'}} variant={'body1'}>75%</Typography>
              </Button>
              <Button
                className={classes.scale}
                variant='text'
                disabled={loading}
                color="primary"
                onClick={() => {this.setAmount(100)}}>
                <Typography style={{fontFamily: '"Eczar"'}} variant={'body1'}>100%</Typography>
              </Button>
            </div>
            <div className={classes.buttons}>
              {asset.deposit===true&&
                <Button
                  className={classes.actionButton}
                  variant="outlined"
                  color="primary"
                  disabled={loading||asset.balance<=0||asset.depositDisabled===true}
                  onClick={this.onDeposit}
                  fullWidth
                >
                  <Typography className={classes.buttonText} style={{fontFamily: '"RobotoC"'}} variant={'body1'} color={asset.disabled? '':'secondary'}>Deposit</Typography>
                </Button>
              }
              {asset.depositAll===true&&
                <Button
                  className={classes.actionButton}
                  variant="outlined"
                  color="primary"
                  disabled={loading||asset.balance<=0||asset.depositDisabled===true}
                  onClick={this.onDepositAll}
                  fullWidth
                >
                  <Typography className={classes.buttonText} style={{fontFamily: '"RobotoC"'}} variant={'body1'} color={asset.disabled? '':'secondary'}>Deposit All</Typography>
                </Button>
              }
            </div>
            {asset.depositDisabled===true&&
              <div className={classes.disabledContainer}>
                <Typography variant='body1' style={{fontFamily: '"RobotoC"'}} >Deposits are currently disabled for this vault</Typography>
              </div>
            }
          </div>
          <div className={classes.sepperator}></div>
          <div className={classes.tradeContainer}>
            <div className={classes.balances}>
              <Typography variant='body1' style={{fontFamily: '"Eczar"'}} onClick={() => {this.setRedeemAmount(100)}} className={classes.value} noWrap>{(asset.vaultBalance? (Math.floor(asset.vaultBalance*asset.pricePerFullShare*10000)/10000).toFixed(4):'0.0000')} {asset.symbol} ({asset.vaultBalance? (Math.floor(asset.vaultBalance*10000)/10000).toFixed(4):'0.0000'} {asset.vaultSymbol}) </Typography>
            </div>
            <TextField
              fullWidth
              className={classes.actionInput}
              id='redeemAmount'
              value={redeemAmount}
              error={redeemAmountError}
              onChange={this.onChange}
              disabled={loading}
              placeholder="0.00"
              variant="outlined"
              onKeyDown={this.inputRedeemKeyDown}
            />
            <div className={classes.scaleContainer}>
              <Button
                className={classes.scale}
                variant='text'
                disabled={loading}
                color="primary"
                onClick={() => {this.setRedeemAmount(25)}}>
                <Typography style={{fontFamily: '"Eczar"'}} variant={'body1'}>25%</Typography>
              </Button>
              <Button
                className={classes.scale}
                variant='text'
                disabled={loading}
                color="primary"
                onClick={() => {this.setRedeemAmount(50)}}>
                <Typography style={{fontFamily: '"Eczar"'}} variant={'body1'}>50%</Typography>
              </Button>
              <Button
                className={classes.scale}
                variant='text'
                disabled={loading}
                color="primary"
                onClick={() => {this.setRedeemAmount(75)}}>
                <Typography style={{fontFamily: '"Eczar"'}} variant={'body1'}>75%</Typography>
              </Button>
              <Button
                className={classes.scale}
                variant='text'
                disabled={loading}
                color="primary"
                onClick={() => {this.setRedeemAmount(100)}}>
                <Typography style={{fontFamily: '"Eczar"'}} variant={'body1'}>100%</Typography>
              </Button>
            </div>
            <div className={classes.buttons}>
              {asset.withdraw===true&&
                <Button
                  className={classes.actionButton}
                  variant="outlined"
                  color="primary"
                  disabled={loading||asset.vaultBalance<=0}
                  onClick={this.onWithdraw}
                  fullWidth
                >
                  <Typography style={{fontFamily: '"RobotoC"'}} className={classes.buttonText} variant={'body1'} color='contrastText'>Withdraw</Typography>
                </Button>
              }
              {asset.withdrawAll===true&&
                <Button
                  className={classes.actionButton}
                  variant="outlined"
                  color="primary"
                  disabled={loading||asset.vaultBalance<=0}
                  onClick={this.onWithdrawAll}
                  fullWidth
                >
                  <Typography style={{fontFamily: '"RobotoC"'}} className={classes.buttonText} variant={'body1'} color='secondary'>Withdraw All</Typography>
                </Button>
              }
            </div>
            {asset.symbol==='DAI'&&
              <div className={classes.disabledContainer}>
                <Typography style={{fontFamily: '"RobotoC"'}} variant='body1'>
                  <WarningIcon fontSize="small" style={{marginBottom: '-5px'}} />
                  Withdrawals might be subject to high slippage due to recent large <a className={classes.link} href="https://etherscan.io/tx/0x7207d444430344d4d8384d4dd8c12a8a343c9c01ccdb17c8962b84f40955c59f" target="_blank" rel="noopener noreferrer">withdrawal</a>
                </Typography>
              </div>
            }
          </div>
        </div>
      </div>

    )
  };

  _getAPY=(asset) => {
    const {basedOn}=this.props
    const initialApy='0.00'

    if(asset&&asset.stats) {
      switch(basedOn) {
        case 1:
          return asset.stats.apyOneWeekSample||initialApy
        case 2:
          return asset.stats.apyOneMonthSample||initialApy
        case 3:
          return asset.stats.apyInceptionSample||initialApy
        default:
          return asset.apy
      }
    } else if(asset.apy) {
      return asset.apy
    } else {
      return initialApy
    }
  }

  onChange=(event) => {
    let val=[]
    val[event.target.id]=event.target.value
    this.setState(val)
  }

  inputKeyDown=(event) => {
    if(event.which===13) {
      this.onInvest();
    }
  }

  onDeposit=() => {
    this.setState({amountError: false})

    const {amount}=this.state
    const {asset,startLoading}=this.props

    if(!amount||isNaN(amount)||amount<=0||amount>asset.balance) {
      this.setState({amountError: true})
      return false
    }

    this.setState({loading: true})
    startLoading()
    dispatcher.dispatch({type: DEPOSIT_VAULT,content: {amount: amount,asset: asset}})
  }

  onDepositAll=() => {
    const {asset,startLoading}=this.props

    this.setState({loading: true})
    startLoading()
    dispatcher.dispatch({type: DEPOSIT_ALL_VAULT,content: {asset: asset}})
  }

  onWithdraw=() => {
    this.setState({redeemAmountError: false})

    const {asset,startLoading}=this.props
    let redeemAmount=this.state.redeemAmount/asset.pricePerFullShare
    redeemAmount=(Math.floor(redeemAmount*10000)/10000).toFixed(4);

    if(!redeemAmount||isNaN(redeemAmount)||redeemAmount<=0||redeemAmount>asset.vaultBalance) {
      this.setState({redeemAmountError: true})
      return false
    }

    this.setState({loading: true})
    startLoading()

    dispatcher.dispatch({type: WITHDRAW_VAULT,content: {amount: redeemAmount,asset: asset}})
  }

  onWithdrawAll=() => {
    const {asset,startLoading}=this.props

    this.setState({loading: true})
    startLoading()
    dispatcher.dispatch({type: WITHDRAW_ALL_VAULT,content: {asset: asset}})
  }

  setAmount=(percent) => {
    if(this.state.loading) {
      return
    }

    const {asset}=this.props

    const balance=asset.balance
    let amount=balance*percent/100
    amount=Math.floor(amount*10000)/10000;

    this.setState({amount: amount.toFixed(4)})
  }

  setRedeemAmount=(percent) => {
    if(this.state.loading) {
      return
    }

    const balance=this.props.asset.vaultBalance*this.props.asset.pricePerFullShare
    let amount=balance*percent/100
    amount=Math.floor(amount*10000)/10000;

    this.setState({redeemAmount: amount.toFixed(4)})
  }
}

export default withRouter(withStyles(styles,{withTheme: true})(Asset));

