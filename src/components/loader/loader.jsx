import React,{Component} from 'react'




// @material-ui/core component
import {LinearProgress} from "@material-ui/core/";


class Loader extends Component {
  render() {
    return (
      <div style={{position: 'fixed',left: '0px',right: '0px',top: '0px'}}>
        <LinearProgress style={{color: "#3FBFBF"}} />
      </div>
    )
  }
}

export default Loader