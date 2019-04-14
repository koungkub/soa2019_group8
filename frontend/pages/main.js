import React, { Component, Fragment } from 'react';
import Link from 'next/link'
import PropTypes from 'prop-types';
import {withStyles, NoSsr, Divider, Button, Grid} from '@material-ui/core';

//components
import Layout from '../components/Layout';
import Arrival from '../components/BorderText';
import TextPrice from '../components/TextPrice';
import Payment from '../components/PaymentButton'

const styles = theme => ({
    
 textTime:{
   fontSize: '10.5rem',
 },
 margin5:{
     margin :'3rem'
 },
 startBtn:{
    fontSize: '2.9375rem',
  }
})

class Main extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
          <NoSsr>
        <Layout>
            <div className="container text-center">
          <h1 className={ classes.textTime }>15:00</h1>
        
          <Arrival/>
          <div className={classes.margin5}>
          <Divider/>
          <TextPrice/>
          </div>
          <Grid container>
          <Grid item xs={6}>
              </Grid>
              <Grid item xs={6}>
              <Payment/>
              </Grid>
             
              </Grid>
         
             
              
          </div>
          </Layout>
          
          </NoSsr>
          </Fragment>
    );
  }
}
Main.propTypes = {
  classes: PropTypes.object.isRequired,
};
 
export default withStyles(styles) (Main);