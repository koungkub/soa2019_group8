import React, { Component, Fragment } from 'react';
import Link from 'next/link'
import PropTypes from 'prop-types';
import {withStyles, NoSsr, Divider, Button, Grid} from '@material-ui/core';
import authen from '../function/authen'
//components
import Layout from '../components/Layout';
import Arrival from '../components/BorderText';
import TextPrice from '../components/TextPrice';
import Payment from '../components/PaymentButton';
import Discount from '../components/DiscountButton';
import TableList from '../components/TableList';
import TextDurationPark from '../components/TextDurationPark'
const styles = theme => ({
    
 textTime:{
   fontSize: '10.5rem',
 },
 margin5:{
    margin :'3rem'
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
          <h1 className={ classes.textTime }><TextDurationPark/></h1>
          <Arrival/>
          <div className={classes.margin5}>
          <Divider/>
          <TextPrice/>
          </div>
          <TableList/>
          <div className={classes.margin5}>
          </div>
          <Grid container>
          <Grid item xs={6}>
          <Payment/>
              </Grid>
              <Grid item xs={6}>
            <Discount/>
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