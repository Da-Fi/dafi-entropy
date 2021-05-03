import React,{Component} from "react";
import {withRouter} from "react-router-dom";
import {withStyles} from '@material-ui/core/styles';
import {
  Grid,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  TextField,
  InputAdornment,
  FormControlLabel,
  Tooltip,
  MenuItem,
  Switch,Fade,Paper
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import TimelineIcon from '@material-ui/icons/Timeline';
import InfoIcon from '@material-ui/icons/Info';
import HelpIcon from '@material-ui/icons/Help';
import {withNamespaces} from 'react-i18next';
import {colors} from '../../theme/theme'

import Snackbar from '../snackbar'
import Asset from './asset'
import Loader from '../loader'
import {
  ERROR,
  GET_VAULT_BALANCES_FULL,
  VAULT_BALANCES_FULL_RETURNED,
  DEPOSIT_VAULT_RETURNED,
  WITHDRAW_VAULT_RETURNED,
  DEPOSIT_ALL_VAULT_RETURNED,
  WITHDRAW_ALL_VAULT_RETURNED,
  CONNECTION_CONNECTED,
  CONNECTION_DISCONNECTED
} from '../../constants'
import Store from "../../stores";

const emitter=Store.emitter
const dispatcher=Store.dispatcher
const store=Store.store

const styles=(theme) => ({
  root: {
    flexGrow: 1,
    paddingLeft: '64px',

    background: 'RGBA(26,26,26,0)',
    [theme.breakpoints.down('xl')]: {

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
    [theme.breakpoints.up('xl')]: {
      minWidth: '0%',
    },
    [theme.breakpoints.down('xl')]: {
      width: 'auto',
      flexGrow: 1,
      flexShrink: 1,
    }
  },
  investedContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',


    maxWidth: '97%',
    minWidth: '0%',
    marginTop: '40px',
    [theme.breakpoints.up('xl')]: {
      maxWidth: '97%',
    },
    [theme.breakpoints.down('xl')]: {
      width: 'auto',
      flexGrow: 1,
      flexShrink: 1,
    }
  },
  balancesContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    border: '1px solid '+colors.dafiGreen,
    padding: '12px 12px',
    position: 'relative',
    [theme.breakpoints.down('xl')]: {
      width: 'auto',
      flexGrow: 1,
      flexShrink: 1,
    },
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
    width: '97%',
    position: 'relative',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: '32px',

    [theme.breakpoints.down('md')]: {
      justifyContent: 'center',
      maxWidth: '95%',
      flexWrap: 'wrap'
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
    border: '2px solid '+colors.dafiGreen,
    borderRadius: '50px',
    backgroundColor: colors.dafiPrimaryhex,
    '&:hover': {
      backgroundColor: colors.purple,
    },
    padding: '15px',
    fontWeight: 700,
    text: colors.dafitriadicblue,
    [theme.breakpoints.up('xl')]: {
      padding: '18px',
    }
  },
  heading: {
    display: 'none',
    flex: 1,
    [theme.breakpoints.up('md')]: {
      dislay: 'flex',
      fontSize: '1rem',
      justifyContent: 'flex-end',
      width: '45%'
    },
    [theme.breakpoints.up('xl')]: {
      display: 'block'
    },
  },
  headingName: {
    display: 'flex',
    flex: 1,
    paddingLeft: '0.625rem',
    font: '"Eczar"',
    width: '65%',
    [theme.breakpoints.up('sm')]: {
      fontSize: '1rem'
    },
  },
  headingEarning: {
    display: 'flex',
    color: "#ff1744",
    fontFamily: '"Eczar"',
    flex: 1,
    justifyContent: 'flex-end',
    [theme.breakpoints.up('sm')]: {
      fontSize: '1rem',
      flex: 1,
      justifyContent: 'flex-end',
    },
    [theme.breakpoints.down('xl')]: {
      maxWidth: '35%',
      minWidth: '0',
      width: '35%',
      flex: 1,
      justifyContent: 'flex-end',
    },
  },
  buttonText: {
    fontWeight: '700',
    color: 'secondary',
    fontFamily: '"Eczar"',
  },
  assetSummary: {
    display: 'flex',
    background: "rgba(26,26,26,0)",
    flex: 1,
    alignItems: '',
    height: '32px',
    width: '100%',
    flexWrap: 'wrap',
    [theme.breakpoints.up('sm')]: {
      flexWrap: 'nowrap',
      fontSize: '1rem',
    },
  },

  assetName: {
    display: 'flex',

    height: '20px',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      fontSize: '1rem'
    }
  },

  assetIcon: {
    display: 'flex',
    alignItems: 'center',
    verticalAlign: 'middle',
    borderRadius: '12px',
    height: '28px',
    width: '20px',
    textAlign: 'center',
    cursor: 'pointer',
    marginRight: '16px',
    [theme.breakpoints.up('lg')]: {
      height: '36px',
      width: '36px',
      marginRight: '24px',
    }
  },
  addressContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    overflow: 'hidden',
    flex: 1,
    whiteSpace: 'nowrap',
    fontSize: '0.6rem',
    textOverflow: 'ellipsis',
    cursor: 'pointer',
    padding: '28px 30px',
    borderRadius: '36px',
    border: '1px solid '+colors.dafiGreen,
    alignItems: 'center',
    maxWidth: '350px',
    [theme.breakpoints.up('xl')]: {
      minWidth: '0%'
    },
  },
  between: {
    width: '40px'
  },
  expansionPanel: {
    maxWidth: '97%',
    minWidth: '0%',
    width: '97%',
    backgroundImage: 'linear-gradient(180deg, rgba(54,54,64,1) 0%, rgba(44,59,87,1) 25%, rgba(75,91,87,1) 50%, rgba(33,38,38,1) 100%)',

    border: '1px solid '+colors.dafident,
    borderRadius: '16px',
  },



  versionToggle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  tableHeadContainer: {
    maxWidth: '97%',
    minWidth: '0%',
    display: 'flex',
    justifyContent: 'space=between',
  },
  investAllContainer: {
    paddingTop: '24px',
    display: 'flex',
    justifyContent: 'flex-end',
    maxWidth: '97%',
    minWidth: '0%',
  },
  disaclaimer: {
    padding: '12px',
    border: '4px solid rgb(0, 255, 222, 1)',
    borderRadius: '0.75rem',
    marginBottom: '24px',
    lineHeight: '1.2',
    fontFamily: '"Robotoc"',
    background: colors.dafidark,
    '& a': {
      color: colors.dafiGreen,
      textDecoration: 'none',
      fontWeight: 'bold',
    },
    '& a:hover': {
      textDecoration: 'underline',
    },
  },
  fees: {
    paddingRight: '75px',
    padding: '12px',
    lineHeight: '1.2',
  },
  walletAddress: {
    padding: '0px 8px',
    fontFamily: '"Eczar"',
    fontWeight: 'bold',

  },
  walletTitle: {
    flex: 1,
    color: colors.dafiGreen
  },
  grey: {
    color: colors.darkBlack
  },
  filters: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      padding: '0px 12px'
    },
  },
  searchField: {
    flex: 1,
    background: colors.dafiDefaulthex,
    border: '3px solid rgb(0, 255, 222, 1)',
    borderRadius: '0.75rem',
  },
  switch: {
    flex: 1,
    margin: '0px',
    color: colors.dafiGreen
  },
  flexy: {
    display: 'flex',

  },
  on: {
    color: colors.dafiGreen,
    padding: '0px 6px'
  },
  positive: {
    color: colors.dafiGreen
  },
  basedOnContainer: {
    display: 'flex',
    width: '90%',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  infoIcon: {
    fontSize: '1em',
    marginRight: '6px'
  },
  removePadding: {
    padding: '0px',
    maxWidth: '1040px',
  }
});

class Entropy extends Component {

  constructor(props) {
    super()

    const account=store.getStore('account')
    const basedOn=localStorage.getItem('dafi-entropy-dashboard-basedon')

    this.state={
      assets: store.getStore('vaultAssets'),
      usdPrices: store.getStore('usdPrices'),
      account: account,
      address: account.address? account.address.substring(0,6)+'...'+account.address.substring(account.address.length-4,account.address.length):null,
      snackbarType: null,
      snackbarMessage: null,
      search: '',
      searchError: false,
      hideZero: localStorage.getItem('dafi-entropy-hideZero')==='1'? true:false,
      basedOn: basedOn? parseInt(basedOn>3? 3:basedOn):1,
      loading: true
    }

    if(account&&account.address) {
      dispatcher.dispatch({type: GET_VAULT_BALANCES_FULL,content: {}})
    }
  }
  componentWillMount() {
    emitter.on(DEPOSIT_VAULT_RETURNED,this.showHash);
    emitter.on(WITHDRAW_VAULT_RETURNED,this.showHash);
    emitter.on(DEPOSIT_ALL_VAULT_RETURNED,this.showHash);
    emitter.on(WITHDRAW_ALL_VAULT_RETURNED,this.showHash);
    emitter.on(ERROR,this.errorReturned);
    emitter.on(VAULT_BALANCES_FULL_RETURNED,this.balancesReturned);
    emitter.on(CONNECTION_CONNECTED,this.connectionConnected);
    emitter.on(CONNECTION_DISCONNECTED,this.connectionDisconnected);
  }

  componentWillUnmount() {
    emitter.removeListener(DEPOSIT_VAULT_RETURNED,this.showHash);
    emitter.removeListener(WITHDRAW_VAULT_RETURNED,this.showHash);
    emitter.removeListener(DEPOSIT_ALL_VAULT_RETURNED,this.showHash);
    emitter.removeListener(WITHDRAW_ALL_VAULT_RETURNED,this.showHash);
    emitter.removeListener(ERROR,this.errorReturned);
    emitter.removeListener(CONNECTION_CONNECTED,this.connectionConnected);
    emitter.removeListener(CONNECTION_DISCONNECTED,this.connectionDisconnected);
    emitter.removeListener(VAULT_BALANCES_FULL_RETURNED,this.balancesReturned);
  };

  balancesReturned=(balances) => {
    this.setState({
      assets: store.getStore('vaultAssets'),
      loading: false
    })
  };

  connectionConnected=() => {
    const {t}=this.props
    const account=store.getStore('account')

    this.setState({
      loading: true,
      account: account,
      address: account.address? account.address.substring(0,6)+'...'+account.address.substring(account.address.length-4,account.address.length):null
    })


    dispatcher.dispatch({type: GET_VAULT_BALANCES_FULL,content: {}})

    const that=this
    setTimeout(() => {
      const snackbarObj={snackbarMessage: t("Unlock.WalletConnected"),snackbarType: 'Info'}
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
    }=this.state

    if(!account||!account.address) {
      return (

        <div className={classes.root}>
          <div className={classes.investedContainerLoggedOut}>
            <Typography variant={'body1'} style={{fontFamily: '"RobotoC"'}} className={classes.disaclaimer}>Da-Fi is in beta. Use at your own risk. DApp is also available using ENS domain app.da-fi.eth.link </Typography>
            <div className={classes.introCenter}>
              <Typography variant='body1' style={{fontFamily: '"RobotoC"'}} >Connect your wallet to continue</Typography>
            </div>
          </div>
          { snackbarMessage&&this.renderSnackbar()}
        </div>
      )
    }

    return (
      <div className={classes.root}>
        <div className={classes.investedContainer}>
          <Typography variant={'body1'} style={{fontFamily: '"RobotoC"'}} className={classes.disaclaimer}>Da-Fi is in beta. Use at your own risk.DApp is also available at ENS domain app.da-fi.eth.link </Typography>
          {this.renderFilters()}
          {this.renderBasedOn()}
          {this.renderAssetBlocks()}
          {this.renderStrategyRewards()}
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

  renderAssetBlocks=() => {
    const {assets,expanded,search,hideZero,basedOn}=this.state
    const {classes}=this.props
    const width=window.innerWidth

    return assets.filter((asset) => {
      if(hideZero&&(asset.balance===0&&asset.vaultBalance===0)) {
        return false
      }

      if(search&&search!=='') {
        return asset.id.toLowerCase().includes(search.toLowerCase())||
          asset.name.toLowerCase().includes(search.toLowerCase())||
          asset.symbol.toLowerCase().includes(search.toLowerCase())||
          asset.description.toLowerCase().includes(search.toLowerCase())||
          asset.vaultSymbol.toLowerCase().includes(search.toLowerCase())
        // asset.erc20address.toLowerCase().includes(search.toLowerCase()) ||
        // asset.vaultContractAddress.toLowerCase().includes(search.toLowerCase())
      } else {
        return true
      }
    }).map((asset) => {
      return (
        <Accordion className={classes.expansionPanel} style={{background: colors.dafifmj}} square key={asset.id+"_expand"} expanded={expanded===asset.id} onChange={() => {this.handleChange(asset.id)}}>
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
                      height={width>600? '32px':'32px'}
                      style={asset.disabled? {filter: 'grayscale(100%)'}:{}}
                    />

                  </div>
                  <div>


                    <Typography variant={'body1'} style={{fontFamily: '"RobotoC"',color: colors.dafiPrimaryhex}} className={classes.assetName} noWrap>{asset.name}</Typography>
                    <Typography variant={'body1'} style={{fontFamily: '"RobotoC"'}} className={classes.grey}>{asset.description}</Typography>
                  </div>
                </div>
                {
                  (!['LINK'].includes(asset.id)&&!['GUSD'].includes(asset.id)&&asset.vaultBalance>0)&&
                  <div className={classes.headingEarning}>

                    <div>
                      <Typography variant={'body1'} style={{fontFamily: '"Eczar"'}} noWrap>{(this._getAPY(asset)/1).toFixed(2)}% </Typography>

                      <Typography variant={'body1'} noWrap>{(asset.vaultBalance? (Math.floor(asset.vaultBalance*asset.pricePerFullShare*10000)/10000).toFixed(2):'0.00')} {asset.symbol}</Typography>

                    </div>
                  </div>



                }

                {
                  (!['LINK'].includes(asset.id)&&!['GUSD'].includes(asset.id)&&asset.vaultBalance===0)&&

                  <div className={classes.headingEarning}>
                    <div>

                      <Typography variant={'body1'} style={{fontFamily: '"Eczar"'}} noWrap>{(this._getAPY(asset)/1).toFixed(2)}% </Typography>
                      <Typography variant={'body1'} style={{fontFamily: '"Eczar"'}} noWrap>{(asset.vaultBalance? (Math.floor(asset.vaultBalance*asset.pricePerFullShare*10000)/10000).toFixed(2):'0.00')} {asset.symbol}</Typography>
                    </div>
                  </div>
                }
                {
                  ['LINK'].includes(asset.id)&&
                  <div className={classes.headingEarning}>
                    <Typography variant={'body1'} style={{fontFamily: '"RobotoC"'}} className={classes.grey}></Typography>
                    <Typography variant={'body1'} style={{fontFamily: '"Eczar"'}} noWrap>Not Available</Typography>
                  </div>
                }
                {
                  ['GUSD'].includes(asset.id)&&
                  <div className={classes.headingEarning}>
                    <Typography variant={'body1'} style={{fontFamily: '"RobotoC"'}} className={classes.grey}></Typography>
                    <Typography variant={'body1'} style={{fontFamily: '"Eczar"'}} noWrap>
                      Not Available
                    <Tooltip title="The GUSD strategy is temporally disabled due to misleading APY calculation. It is safe to withdraw your funds, you are not charged 0.5% withdrawal fee." arrow>
                        <InfoIcon style={{color: colors.darkGray,marginLeft: '5px',marginBottom: '-5px',fontFamily: '"RobotoC"'}} />
                      </Tooltip>
                    </Typography>
                  </div>
                }
                {!(asset.depositDisabled===true)&&
                  <div className={classes.heading}>
                    <Typography variant={'body1'} style={{fontFamily: '"RobotoC"'}} className={classes.grey}>Balance:</Typography>
                    <Typography variant={'body1'} style={{fontFamily: '"Eczar"'}} noWrap>{(asset.balance? (asset.balance).toFixed(2):'0.00')+' '+asset.symbol}</Typography>
                  </div>
                }

                {asset.depositDisabled===true&&
                  <div className={classes.heading}>
                    <Tooltip title={
                      <React.Fragment>
                        <Typography variant={'body1'} style={{fontFamily: '"RobotoC"'}} className={classes.fees}>
                          Vault inactive, deposits unavailable.
                        </Typography>
                      </React.Fragment>
                    } arrow>
                      <Grid container spacing={1} direction="row" alignItems="center">


                        <Grid item>
                          <HelpIcon fontSize="small" className={classes.grey} style={{marginBottom: '-5px'}} />
                        </Grid>
                        <Grid item xs>
                          <Typography variant={'body1'} style={{fontFamily: '"RobotoC"'}} className={classes.grey} >
                            Inactive
                        </Typography>
                        </Grid>
                      </Grid>
                    </Tooltip>
                  </div>
                }

              </div>
            </Fade>
          </AccordionSummary>
          <AccordionDetails className={classes.removePadding}>
            <Asset asset={asset} startLoading={this.startLoading} basedOn={basedOn} />
          </AccordionDetails>
        </Accordion>
      )
    })
  }

  renderFilters=() => {
    const {loading,search,searchError,hideZero}=this.state
    const {classes}=this.props

    return (
      <div className={classes.filters}>
        <FormControlLabel
          className={classes.Switch}
          control={
            <Switch
              checked={hideZero}
              onChange={this.handleChecked}
              color={colors.dafiGreen}
            />
          }
          label="Hide 0 balances"
        />
        <div className={classes.container}>
          <Fade in={hideZero}>
            <Paper elevation={4} className={classes.paper}>
            </Paper>
          </Fade>
        </div>
        <div className={classes.between}>
          <Tooltip title={
            <React.Fragment>
              <Typography style={{fontFamily: '"RobotoC"'}} variant={'body1'} className={classes.fees}>
                The 0.5% withdrawal fee on all vaults & <br /><br />
                   5% performance fee on subsidized gas will be eliminated in a future release.
                </Typography>
            </React.Fragment>
          } arrow>
            <InfoIcon />
          </Tooltip>
        </div>
        <TextField
          fullWidth
          disabled={loading}
          className={classes.searchField}
          id={'search'}
          value={search}
          error={searchError}
          onChange={this.onSearchChanged}
          placeholder="DAI, BUSD, CRV, ..."
          variant="outlined"
          InputProps={{
            startAdornment: <InputAdornment position="end" className={classes.inputAdornment}><SearchIcon /></InputAdornment>,
          }}
        />
      </div>
    )
  }

  handleChecked=(event) => {
    this.setState({hideZero: event.target.checked})
    localStorage.setItem('dafi-entropy-hideZero',(event.target.checked? '1':'0'))
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

  _getAPY=(asset) => {
    const {basedOn}=this.state
    const initialApy='0.00'

    if(asset&&asset.stats&&asset.stats.apyOneWeekSample) {
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

  renderBasedOn=() => {

    const {classes}=this.props
    const {basedOn,loading}=this.state

    const options=[
      {
        value: 1,
        description: '1 week'
      },
      {
        value: 2,
        description: '1 month'
      },
      {
        value: 3,
        description: 'inception'
      }
    ]

    return (
      <div className={classes.basedOnContainer}>
        <InfoIcon className={classes.infoIcon} />
        <Typography>Growth is based on the vault's performance {basedOn===3? 'since':'for the past'}</Typography>
        <TextField
          id={'basedOn'}
          name={'basedOn'}
          select
          value={basedOn}
          onChange={this.onSelectChange}
          SelectProps={{
            native: false
          }}
          disabled={loading}
          className={classes.assetSelectRoot}
        >
          {options&&
            options.map((option) => {
              return (
                <MenuItem key={option.value} value={option.value}>
                  <Typography style={{fontFamily: '"RobotoC"'}} variant='body1'>{option.description}</Typography>
                </MenuItem>
              )
            })
          }
        </TextField>
      </div>
    )
  }

  renderStrategyRewards=() => {

    const {classes}=this.props

    return (
      <div className={classes.disaclaimer} style={{marginTop: '25px',maxWidth: '500px'}}>

        <Grid container spacing={1}>
          <Grid item><TimelineIcon fontSize="small" /></Grid>
          <Grid item xs>
            <Typography variant="body1" style={{display: 'inline',fontWeight: 'bold'}}>
              Rewards
                </Typography>
          </Grid>
        </Grid>

        <Typography variant="body1">
          Da-Fi is possible only due to community contributions. Vault strategy contributors are rewarded with <b>0.5%</b> of yield generated by the vault. <a href="https://docs.yearn.finance/faq#what-are-the-fees" rel="noopener noreferrer" target="_blank">Learn more &rarr;</a>
        </Typography>
      </div>
    )
  }

  onSelectChange=(event) => {
    let val=[]
    val[event.target.name]=event.target.value
    this.setState(val)

    localStorage.setItem('dafi-entropy-dashboard-basedon',event.target.value)

    this.setState({loading: true})
    dispatcher.dispatch({type: GET_VAULT_BALANCES_FULL,content: {}})
  }
}

export default withNamespaces()(withRouter(withStyles(styles)(Entropy)));
