import React, { Component, Fragment } from 'react';
import Link from 'next/link'
import PropTypes, { func } from 'prop-types';
import {withStyles, NoSsr, Divider, Button, Grid} from '@material-ui/core';

//components
import Layout from '../components/Layout';
import TableList from '../components/TablePolicy';
import InputCode from '../components/InputCode';
import BackButton from '../components/BackButton';
import SubmitBtn from '../components/SubmitDiscountButton';

const styles = theme => ({
})

class Discount extends Component { 
   state = {
      code: ''
    }
  handleCode = (value) =>{
    this.setState({
      code : value
    })
  }
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <Layout>
        <NoSsr>
            <div className="container">
          <TableList/>
          <h1>DISCOUNT</h1>
          <InputCode onSelectCode = {this.handleCode}/>
          <Grid container>
          <Grid item xs={6} className="text-center">
          <BackButton/>
              </Grid>
              <Grid item xs={6} className="text-center">
              <SubmitBtn code={this.state.code}/>
              </Grid>
              </Grid>          
          </div>
          </NoSsr>
          </Layout>
          </Fragment>
    );
  }
}
Discount.propTypes = {
  classes: PropTypes.object.isRequired,
};
 
export default withStyles(styles) (Discount);