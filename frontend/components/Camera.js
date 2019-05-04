if (typeof window != 'undefined') {var QrReader = require('react-qr-reader')}
import NoSSR from 'react-no-ssr';
import axios from 'axios';
import React, { Component, Fragment } from 'react';
import Router from 'next/router'
import auth from '../function/authen'
class Camera extends Component {
  constructor(props) {
    super(props);
    this.state = {
      delay: 300,
      result:''
    };
    this.handleScan = this.handleScan.bind(this);
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
  handleError(err) {
    console.error(err);
  }
  render() {
    return (
      <Fragment>
        <NoSSR>
        <QrReader
          delay={this.state.delay}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ width: "100%", height:"100%" }}
        />

        </NoSSR>
      </Fragment>
    );
  }
}
 
export default Camera;