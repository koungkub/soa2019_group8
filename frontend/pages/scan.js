import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {Grid, withStyles, NoSsr} from '@material-ui/core';
//components
import Layout from '../components/Layout';
import Camera from '../components/Camera';
import CameraLegacy from '../components/CameraLegacy';
const styles = theme => ({
  container:{
    maxWidth: '720px',
    margin: 'auto',
  }
})

class Scan extends Component {
  constructor(props) {
    super(props);
    this.child = React.createRef();
  }
  handleError = (value) =>{
    this.setState({
      error : value
    })
  }
  handleLoad = (value) =>{
    this.setState({
      load: value
    })
  }
  loading= () =>{
    this.child.handleClickInfo()
  }
  erroring= () =>{
    this.child.handleClickError()
  }
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <Layout/>
        <NoSsr>
          <Grid container className={classes.container} >
            <Grid item xs={12}>
            <Camera errorhandle={this.handleError}></Camera>
            </Grid>
            <div className="m-4"></div>
          <Grid item xs={12}>
          <h1 className="text-center">Welcome, Please scan qrcode to sign in</h1>
          
          <CameraLegacy errorhandle={this.isError} loadhandle={this.handleLoad} className="text-center"/>
            </Grid>
             </Grid>
          </NoSsr>
        </Fragment>
    );
  }
}
Scan.propTypes = {
  classes: PropTypes.object.isRequired,
};
 
export default withStyles(styles) (Scan);