import React,{Component} from 'react'
import {withStyles} from '@material-ui/core/styles';
import {
  Typography
} from '@material-ui/core';
import {withRouter} from "react-router-dom";
import {colors} from '../../theme/theme';
import ENS from 'ethjs-ens';
import {breakpoints} from '../../theme/theme.jsx'
import {
  CONNECTION_CONNECTED,
  CONNECTION_DISCONNECTED,
} from '../../constants/constants'

import UnlockModal from '../unlock/unlockModal.jsx';
import Store from "../../stores/store";
const emitter=Store.emitter
const store=Store.store

const useStyles=theme => ({
  root: {
    width: '100%',
    display: 'flex'

  },
  Subheader_1: {
    background: 'rgba(26,26,26,0)',
    border: 'none',
    borderTop: 'none',
    width: '100%',
    display: 'flex',
    flexShrink: 1,

  },
  icon: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    cursor: 'pointer',
    flexShrink: 1,
  },
  links: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
    }
  },
  link: {
    padding: '12px 0px',
    margin: '0px 12px',
    cursor: 'pointer',
    width: 'fit-content',
    '&:hover': {
      paddingBottom: '9px',
      borderBottom: "3px solid "+colors.dafiGreen,
    }
  },
  title: {
    textTransform: 'capitalize'
  },
  linkActive: {
    padding: '12px 0px',
    margin: '0px 12px',
    cursor: 'pointer',
    paddingBottom: '9px',
    borderBottom: "3px solid "+colors.dafiGreen,
    width: 'fit-content'
  },


  walletTitle: {
    flex: 1,
    color: colors.darkBlack
  },
  account: {
    display: 'flex',
    alignItems: 'center',

    justifyContent: 'flex-end',
    flex: 1,

  },
  walletAddress: {
    padding: '5px',
    border: '4px solid '+colors.dafiPrimaryhex,
    fontFamily: 'Eczar',
    fontWeight: '600',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    '&:hover': {
      border: "4px solid "+colors.dafiGreen,
      background: colors.dafilight,
      color: colors.dafiDefaulthex,
      [theme.breakpoints.down('sm')]: {
        display: 'flex',
        border: "2px solid "+colors.dafiGreen,
        background: colors.dafilight
      }
    }
  },
  connectedDot: {
    background: colors.dafiGreen,
    opacity: '1',
    borderRadius: '10px',
    blur: '5em',
    width: '10px',
    height: '10px',
    marginRight: '3px',
    marginLeft: '6px'
  },
  name: {
    paddingLeft: '24px',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    }
  }
})

class SUBHEADER_1 extends Component {

  constructor(props) {
    super()

    this.state={
      account: store.getStore('account'),
      modalOpen: false,
      anchorEl: null
    }
  }

  componentDidMount() {
    emitter.on(CONNECTION_CONNECTED,this.connectionConnected);
    emitter.on(CONNECTION_DISCONNECTED,this.connectionDisconnected);
  }

  componentWillUnmount() {
    emitter.removeListener(CONNECTION_CONNECTED,this.connectionConnected);
    emitter.removeListener(CONNECTION_DISCONNECTED,this.connectionDisconnected);
  }

  connectionConnected=() => {
    this.setState({account: store.getStore('account')})
    this.setAddressEnsName();
  };

  connectionDisconnected=() => {
    this.setState({account: store.getStore('account')})
  }

  setAddressEnsName=async () => {
    const context=store.getStore('web3context')
    if(context&&context.library&&context.library.provider) {
      const provider=context.library.provider
      const account=store.getStore('account')
      const {address}=account
      const chainId=parseInt(provider.chainId,16)
      const network=chainId||provider.networkVersion
      const ens=new ENS({provider,network})
      const addressEnsName=await ens.reverse(address).catch(() => {})
      if(addressEnsName) {
        this.setState({addressEnsName})
      }
    }
  }

  render() {
    const {
      classes
    }=this.props;

    const {
      account,
      addressEnsName,
      modalOpen
    }=this.state

    var address=null;
    if(account.address) {
      address=account.address.substring(0,6)+'...'+account.address.substring(account.address.length-4,account.address.length)
    }
    const addressAlias=addressEnsName||address

    return (
      <div className={classes.root}>
        <div className={classes.SUBHEADER_1}>

          {address&&
            <Typography variant={'body2'} style={{background: colors.dafilight,justifyContent: "flex-end"}} className={classes.walletAddress} noWrap onClick={this.addressClicked} >
              {addressAlias}
              <div className={classes.connectedDot} ></div>
            </Typography>
          }
          {!address&&
            <Typography variant={'body2'} className={classes.walletAddress} noWrap onClick={this.addressClicked} >
              Connect </Typography>
          }


          {modalOpen&&this.renderModal()}
        </div>
      </div>
    )
  }

  handleClick=(event) => {
    this.setState({anchorEl: event.currentTarget});
  }

  handleClose=() => {
    this.setState({anchorEl: null})
  }




  addressClicked=() => {
    this.setState({modalOpen: true})
  }

  closeModal=() => {
    this.setState({modalOpen: false})
  }

  renderModal=() => {
    return (
      <UnlockModal closeModal={this.closeModal} modalOpen={this.state.modalOpen} />
    )
  }
}
export default withRouter(withStyles(useStyles)(SUBHEADER_1));