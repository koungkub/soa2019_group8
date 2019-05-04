if (typeof window != 'undefined') {var QrReader = require('react-qr-reader')}
import NoSSR from 'react-no-ssr';
import axios from 'axios';
import {withStyles, Button, NoSsr, colors} from '@material-ui/core';
import React, { Component, Fragment } from 'react';
import Router from 'next/router'
import auth from '../function/authen'

const styles = theme => ({
    CantScanBtn:{
      fontSize: '2.9375rem',
      background: colors.red[900],
      width: '100%'
    }
  });
class Camera extends Component {
  constructor(props) {
    super(props);
    this.state = {
      delay: 300,
      result:''
    };
    this.handleScan = this.handleScan.bind(this);
    this.onImageLoad = this.onImageLoad.bind(this);
    if(auth.apply() == true){
      Router.push('/main')
    }
  }
  handleScan(data) {
    if (data) {
      axios.get(data).then(res =>{
        console.log(data)
        localStorage.setItem('token', res.headers.authorization)
        localStorage.setItem('rootapi', "https://" + data.split('/')[2] + '/')
        Router.replace('/main')
        console.log(data.split("/"))
      })
    }
  }
  onImageLoad(){
    this.refs.qrReader.openImageDialog()
  } 
  handleError(err) {
    console.error(err);
  }
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <NoSSR>
        <QrReader
            ref="qrReader"
            legacyMode={true}
            delay={this.state.delay}
            onError={this.handleError}
            onScan={this.handleScan}
            style={{ width: "0%", height:"0%" }}
        />
        <Button variant="contained" 
              size="large"
              fontSize="large"
              color="secondary"
              className={classes.CantScanBtn}>
              Can't scan, Click
        </Button>
        </NoSSR>
      </Fragment>
    );
  }
}
CantScanButton.propTypes = {
    classes: PropTypes.object.isRequired,
  };
 
  
export default withStyles(styles)  (Camera);