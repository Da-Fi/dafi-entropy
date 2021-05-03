import React,{Component} from "react";
import {withRouter} from "react-router-dom";
import {withStyles} from '@material-ui/core/styles';

import {
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,Fade,Switch
} from '@material-ui/core';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {withNamespaces} from 'react-i18next';
import {colors} from '../../theme/theme';
import Snackbar from '../snackbar'
import Asset from './asset'
import Loader from '../loader'
import {
  ERROR,
  GET_BALANCES_LIGHT,
  BALANCES_LIGHT_RETURNED,
  INVEST_RETURNED,
  REDEEM_RETURNED,
  CONNECTION_CONNECTED,
  CONNECTION_DISCONNECTED,
} from '../../constants'

import Store from "../../stores";
const emitter=Store.emitter
const dispatcher=Store.dispatcher
const store=Store.store

const styles=theme => ({
  root: {
    flex: 1,
    paddingLeft: '64px',
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '97%',
    minWidth: '0%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    [theme.breakpoints.down('xl')]: {
      paddingLeft: '64px',
      flexGrow: 1,
      flexShrink: 1,
      maxWidth: '1200px',
      minWidth: '0%',
    },
  },
  investedContainerLoggedOut: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '0%',
    marginTop: '40px',
    [theme.breakpoints.up('md')]: {
      minWidth: '0px',
    }
  },
  investedContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    backgroundImage: 'linear-gradient(180deg, rgba(54,54,64,1) 0%, rgba(44,59,87,1) 25%, rgba(75,91,87,1) 50%, rgba(33,38,38,1) 100%)',
    alignItems: 'center',
    justifyContent: 'flex-start',
    minWidth: '0%',
    marginTop: '40px',
    [theme.breakpoints.up('md')]: {
      minWidth: '0px',
    }
  },
  balancesContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    padding: '12px 12px',
    position: 'relative',
    border: '1px solid '+colors.dafident,
    borderRadius: '12px'
  },
  connectContainer: {
    padding: '12px',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    maxWidth: '450px',
    [theme.breakpoints.up('md')]: {
      width: '450',
    }
  },
  intro: {
    width: '100%',
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column-reverse',
    }
  },
  introCenter: {
    maxWidth: '500px',
    textAlign: 'center',
    display: 'flex',
    padding: '24px 0px'
  },
  introText: {
    paddingLeft: '20px'
  },
  actionButton: {
    '&:hover': {
      backgroundColor: "#ff1744"
    },
    padding: '12px',
    backgroundColor: "#ff1744",
    border: '2px solid '+colors.dafiheat,
    fontWeight: 500,
    [theme.breakpoints.up('md')]: {
      padding: '15px',
    }
  },
  overlay: {
    position: 'absolute',
    borderRadius: '10px',
    background: "#e0f7fa",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid '+colors.dafident,
    cursor: 'pointer',

    right: '0px',
    top: '10px',
    height: '70px',
    width: '160px',
    [theme.breakpoints.up('md')]: {
      right: '0px',
      top: '10px',
      height: '90px',
      width: '210px',
    }
  },
  heading: {
    display: 'none',
    paddingTop: '12px',
    flex: 1,
    flexShrink: 1,
    justifyContent: 'flex-start',
    [theme.breakpoints.up('sm')]: {
      paddingTop: '5px',
      display: 'flex',
    }
  },
  headingName: {
    paddingTop: '5px',
    paddingRight: '5px',
    fontFamily: '"RobotoC"',
    flex: 1,
    flexShrink: 1,
    display: 'flex',
    alignItems: 'center',
    minWidth: '0%',
    [theme.breakpoints.up('lg')]: {
      display: 'block'

    },
  },
  buttonText: {
    fontWeight: '700',
    color: colors.dafiheat,
    fontFamily: '"Eczar"'
  },
  assetSummary: {
    display: 'flex',
    background: 'rgba(26,26,26,0)',
    alignItems: 'center',
    flex: 1,
    flexWrap: 'nowrap',
    [theme.breakpoints.up('sm')]: {
      flexWrap: 'nowrap'
    }
  },
  assetIcon: {
    display: 'flex',
    alignItems: 'center',
    verticalAlign: 'middle',
    borderRadius: '20px',
    height: '28px',
    width: '28px',
    textAlign: 'center',
    cursor: 'pointer',
    marginRight: '20px',
    [theme.breakpoints.up('sm')]: {
      height: '40px',
      width: '40px',
      marginRight: '24px',
    }
  },
  addressContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    overflow: 'hidden',
    flex: 1,
    whiteSpace: 'nowrap',
    fontSize: '0.83rem',
    textOverflow: 'ellipsis',
    fontFamily: '"Eczar"',
    cursor: 'pointer',
    padding: '28px 30px',
    borderRadius: '50px',
    border: '3px solid '+colors.dafiGreen,
    alignItems: 'center',
    maxWidth: '100%',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '100%',
      maxWidth: 'auto'
    }
  },
  between: {
    width: '40px',
    height: '40px'
  },
  expansionPanel: {
    maxWidth: '97%',
    minWidth: '0%',
    width: '97%',
    backgroundImage: 'linear-gradient(180deg, rgba(54,54,64,1) 0%, rgba(44,59,87,1) 25%, rgba(75,91,87,1) 50%, rgba(33,38,38,1) 100%)',
    border: '16px solid '+colors.dafident,
    borderRadius: '16px'
  },
  versionToggle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    size: 'small'
  },
  tableHeadContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  investAllContainer: {
    paddingTop: '24px',
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%'
  },
  disaclaimer: {
    padding: '8px',
    border: '2px solid '+colors.dafiPrimaryhex,
    borderRadius: '0.75rem',
    marginBottom: '24px',
    background: "#363640",
    backgroundImage: 'linear-gradient(180deg, rgba(54,54,64,1) 0%, rgba(44,59,87,1) 25%, rgba(75,91,87,1) 50%, rgba(33,38,38,1) 100%)',
  },
  walletAddress: {
    padding: '0px 8px'
  },
  walletTitle: {
    flex: 1,
    color: colors.dafiGreen
  },
  grey: {
    color: colors.darkBlack
  },

  heat: {
    color: colors.dafiheat
  },
});

class Streamgen extends Component {

  constructor(props) {
    super()

    const account=store.getStore('account')
    this.state={
      assets: store.getStore('assets'),
      account: account,
      snackbarType: null,
      snackbarMessage: null,
      hideV1: true,
      value: 1,
    }

    if(account&&account.address) {
      dispatcher.dispatch({type: GET_BALANCES_LIGHT,content: {}})
    }
  }
  componentWillMount() {
    emitter.on(INVEST_RETURNED,this.investReturned);
    emitter.on(REDEEM_RETURNED,this.redeemReturned);
    emitter.on(ERROR,this.errorReturned);
    emitter.on(BALANCES_LIGHT_RETURNED,this.balancesReturned);
    emitter.on(CONNECTION_CONNECTED,this.connectionConnected);
    emitter.on(CONNECTION_DISCONNECTED,this.connectionDisconnected);

  }

  componentWillUnmount() {
    emitter.removeListener(INVEST_RETURNED,this.investReturned);
    emitter.removeListener(REDEEM_RETURNED,this.redeemReturned);
    emitter.removeListener(ERROR,this.errorReturned);
    emitter.removeListener(CONNECTION_CONNECTED,this.connectionConnected);
    emitter.removeListener(CONNECTION_DISCONNECTED,this.connectionDisconnected);
    emitter.removeListener(BALANCES_LIGHT_RETURNED,this.balancesReturned);
  };

  refresh() {
    dispatcher.dispatch({type: GET_BALANCES_LIGHT,content: {}})
  }

  balancesReturned=(balances) => {
    this.setState({
      assets: store.getStore('assets'),
      loading: false
    })
    setTimeout(this.refresh,300000);
  };

  connectionConnected=() => {
    const {t}=this.props
    this.setState({
      account: store.getStore('account'),
      loading: true
    })

    dispatcher.dispatch({type: GET_BALANCES_LIGHT,content: {}})

    const that=this
    setTimeout(() => {
      const snackbarObj={snackbarMessage: t("Unlock.WalletConnected"),snackbarType: 'Info'}
      that.setState(snackbarObj)
    })
  };

  connectionDisconnected=() => {
    this.setState({account: store.getStore('account')})
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

  investReturned=(txHash) => {
    const snackbarObj={snackbarMessage: null,snackbarType: null}
    this.setState(snackbarObj)
    this.setState({loading: false})
    const that=this
    setTimeout(() => {
      const snackbarObj={snackbarMessage: txHash,snackbarType: 'Hash'}
      that.setState(snackbarObj)
    })
  };

  redeemReturned=(txHash) => {
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
      value,
    }=this.state

    if(!account||!account.address) {
      return (
        <div className={classes.root}>
          <div className={classes.investedContainerLoggedOut}>
            <Typography variant={'h5'} style={{fontFamily: '"RobotoC"'}} className={classes.disaclaimer}>Da-Fi is in beta, use at your own risk.</Typography>
            <div className={classes.introCenter}>
              <Typography variant={'h5'} style={{fontFamily: '"RobotoC"'}}>Connect Wallet</Typography>
            </div>
          </div>
          { snackbarMessage&&this.renderSnackbar()}
        </div>
      )
    }

    return (
      <div className={classes.root}>
        <div className={classes.investedContainer}>
          <Typography variant={'h5'} style={{fontFamily: '"RobotoC"'}} className={classes.disaclaimer}>Da-Fi is in beta, use at your own risk.</Typography>
          <div className={classes.intro}>
            <ToggleButtonGroup value={value} onChange={this.handleTabChange} aria-label="version" size={'small'}>
              <ToggleButton value={0} aria-label="v1">
                <Typography variant={'body1'} style={{fontFamily: '"RobotoC"',color: colors.darkBlack}}>v1</Typography>
              </ToggleButton>
              <ToggleButton value={1} style={{fontFamily: '"RobotoC"'}} aria-label="v2">
                <Typography style={{fontFamily: '"RobotoC"',color: colors.darkBlack}} variant={'body1'}>y.curve.fi</Typography>
              </ToggleButton>
              <ToggleButton value={2} aria-label="v3">
                <Typography variant={'body1'} style={{fontFamily: '"RobotoC"',color: colors.darkBlack}} >busd.curve.fi</Typography>
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
          {account.address&&value===0&&this.renderAssetBlocksv1()}
          {account.address&&value===1&&this.renderAssetBlocksv2()}
          {account.address&&value===2&&this.renderAssetBlocksv3()}
        </div>
        { loading&&<Loader />}
        { snackbarMessage&&this.renderSnackbar()}
      </div>
    )
  };

  handleTabChange=(event,newValue) => {
    this.setState({value: newValue})
  };

  onChange=(event) => {
    let val=[]
    val[event.target.id]=event.target.checked
    this.setState(val)
  };

  renderAssetBlocksv1=() => {
    const {assets,expanded,hideV1}=this.state
    const {classes,t}=this.props
    const width=window.innerWidth

    return assets.filter((asset) => {
      return (hideV1===true||asset.version!==1)
    }).filter((asset) => {
      return (asset.version===1&&asset.investedBalance&&(asset.investedBalance).toFixed(4)>0)
    }).filter((asset) => {
      return !(asset.symbol==="iDAI")
    }).map((asset) => {
      return (
        <Accordion className={classes.expansionPanel} style={{border: '1px solid '+colors.dafident,borderRadius: '4px'}} square key={asset.id+"_expand"} expanded={expanded===asset.id} onChange={() => {this.handleChange(asset.id)}}>
          <AccordionSummary
            expandIcon={<Switch checked={this.onChange} />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"

          >
            <Fade in={this.onChange}>
              <div className={classes.assetSummary}>
                <div className={classes.headingName}>
                  <div className={classes.assetIcon}>
                    <img
                      alt=""
                      src={require('../../assets/'+asset.symbol.replace(/\+/g,'')+'-logo.png')}
                      height={width>600? '40px':'30px'}
                      style={asset.disabled? {filter: 'grayscale(100%)'}:{}}
                    />
                  </div>
                  <div>
                    <Typography variant={'h5'} style={{fontFamily: '"RobotoC"'}}>{asset.name}</Typography>

                  </div>
                </div>
                <div className={classes.heading}>
                  <Typography variant={'h5'} style={{fontFamily: '"Eczar"',color: colors.dafiheat}}>
                    {
                      asset.maxApr
                        ? (asset.maxApr*100).toFixed(4)+' %'
                        :'0.0000 %'
                    }
                  </Typography>
                  <Typography variant={'h5'} style={{fontFamily: '"Eczar"'}} className={classes.grey}>{t('')}</Typography>
                </div>
                <div className={classes.heading}>
                  <Typography style={{fontFamily: '"Eczar"',color: colors.dafiheat}} variant={'h5'}>
                    {
                      asset.balance
                        ? (asset.balance).toFixed(4)+' '+(asset.tokenSymbol? asset.tokenSymbol:asset.symbol)
                        :'0.0000 '+(asset.tokenSymbol? asset.tokenSymbol:asset.symbol)
                    }
                  </Typography>
                  <Typography variant={'h5'} style={{fontFamily: '"RobotoC"'}} className={classes.grey}>{t('')}</Typography>
                </div>
              </div>

            </Fade>
          </AccordionSummary>
          <AccordionDetails>
            <Asset asset={asset} startLoading={this.startLoading} />
          </AccordionDetails>
        </Accordion>
      )
    })
  }

  renderAssetBlocksv2=() => {
    const {assets,expanded}=this.state
    const {classes,t}=this.props
    const width=window.innerWidth
    return assets.filter((asset) => {
      return (asset.version===2)
    }).filter((asset) => {
      return !(asset.symbol==="iDAI")
    }).map((asset) => {
      return (
        <Accordion className={classes.expansionPanel} square key={asset.id+"_expand"} expanded={expanded===asset.id} onChange={() => {this.handleChange(asset.id)}}>
          <AccordionSummary
            expandIcon={<Switch checked={this.onChange} />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Fade in={this.onChange}>
              <div className={classes.assetSummary}>
                <div className={classes.headingName}>
                  <div className={classes.assetIcon}>
                    <img
                      alt=""
                      src={require('../../assets/'+asset.symbol.replace(/\+/g,'')+'-logo.png')}
                      height={width>600? '40px':'30px'}
                      style={asset.disabled? {filter: 'grayscale(100%)'}:{}}
                    />
                  </div>
                  <div>
                    <Typography variant={'h5'} style={{fontFamily: '"RobotoC"'}}>{asset.name}</Typography>
                    <Typography variant={'h5'} style={{fontFamily: '"RobotoC"'}} className={classes.grey}>{asset.description}</Typography>
                  </div>
                </div>
                <div className={classes.heading}>
                  <Typography style={{fontFamily: '"Eczar"',color: colors.dafiheat}} variant={'h5'}>
                    {
                      asset.maxApr
                        ? (asset.maxApr*100).toFixed(4)+' %'
                        :'0.0000 %'
                    }
                  </Typography>
                  <Typography style={{fontFamily: '"Eczar"'}} variant={'h5'} className={classes.grey}>{t('')}</Typography>
                </div>
                <div className={classes.heading}>
                  <Typography style={{fontFamily: '"Eczar"',color: colors.dafiPrimaryhex}} variant={'h5'}>
                    {
                      asset.balance
                        ? (asset.balance).toFixed(4)+' '+(asset.tokenSymbol? asset.tokenSymbol:asset.symbol)
                        :'0.0000 '+(asset.tokenSymbol? asset.tokenSymbol:asset.symbol)
                    }
                  </Typography>
                  <Typography style={{fontFamily: '"Eczar"'}} variant={'h5'} className={classes.grey}>{t('')}</Typography>
                </div>
              </div>
            </Fade>
          </AccordionSummary>
          <AccordionDetails>
            <Asset asset={asset} startLoading={this.startLoading} />
          </AccordionDetails>
        </Accordion>
      )
    })
  }

  renderAssetBlocksv3=() => {
    const {assets,expanded}=this.state
    const {classes,t}=this.props
    const width=window.innerWidth

    return assets.filter((asset) => {
      return (asset.version===3)
    }).filter((asset) => {
      return !(asset.symbol==="iDAI")
    }).map((asset) => {
      return (
        <Accordion className={classes.expansionPanel} square key={asset.id+"_expand"} expanded={expanded===asset.id} onChange={() => {this.handleChange(asset.id)}}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <div className={classes.assetSummary}>
              <div className={classes.headingName}>
                <div className={classes.assetIcon}>
                  <img
                    alt=""
                    src={require('../../assets/'+asset.symbol.replace(/\+/g,'')+'-logo.png')}
                    height={width>600? '40px':'30px'}
                    style={asset.disabled? {filter: 'grayscale(100%)'}:{}}
                  />
                </div>
                <div>
                  <Typography style={{fontFamily: '"RobotoC"',color: colors.dafiPrimaryhex}} variant={'h5'}>{asset.name}</Typography>
                  <Typography style={{fontFamily: '"RobotoC"'}} variant={'body2'} className={classes.grey}>{asset.description}</Typography>
                </div>
              </div>
              <div className={classes.heading}>
                <Typography style={{fontFamily: '"Eczar"',color: colors.dafiheat}} variant={'h5'}>
                  {
                    asset.maxApr
                      ? (asset.maxApr*100).toFixed(4)+' %'
                      :'0.0000 %'
                  }
                </Typography>
                <Typography style={{fontFamily: '"Eczar"'}} variant={'h5'} className={classes.heat}>{t('')}</Typography>
              </div>
              <div className={classes.heading}>
                <Typography style={{fontFamily: '"Eczar"'}} variant={'h5'}>
                  {
                    asset.balance
                      ? (asset.balance).toFixed(4)+' '+(asset.tokenSymbol? asset.tokenSymbol:asset.symbol)
                      :'0.0000 '+(asset.tokenSymbol? asset.tokenSymbol:asset.symbol)
                  }
                </Typography>
                <Typography style={{fontFamily: '"Eczar"'}} variant={'h5'} className={classes.heat}>{t('')}</Typography>
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <Asset asset={asset} startLoading={this.startLoading} />
          </AccordionDetails>
        </Accordion>
      )
    })
  }

  handleChange=(id) => {
    this.setState({expanded: this.state.expanded===id? null:id})
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

export default withNamespaces()(withRouter(withStyles(styles)(Streamgen)));
