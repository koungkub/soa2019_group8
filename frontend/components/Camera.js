if (typeof window != 'undefined') {var QrReader = require('react-qr-reader')}
import NoSSR from 'react-no-ssr';
import axios from 'axios';
import React, { Component, Fragment } from 'react';
import Router from 'next/router'
class Camera extends Component {
  constructor(props) {
    super(props);
    this.state = {
      delay: 300,
      result: "No result"
    };
    this.handleScan = this.handleScan.bind(this);
  }
  handleScan(data) {
    if (data) {
      axios.get(data,{
        'Access-Control-Expose-Headers': 'Authorization'
      }).then(res =>{
        Router.push(res.headers)
        console.log(data.split("/")
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