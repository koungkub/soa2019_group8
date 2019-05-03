import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {Paper, withStyles, NoSsr, Grid} from '@material-ui/core';
//components
import Layout from '../components/Layout';
import TextPrice from '../components/TextPrice';
import SignoutBtn from '../components/SignoutButton'
import TextDiscount from '../components/TextDiscount'
import TextTotal from '../components/TextTotalPrice'
import AlertError from '../components/AlertError';
const styles = theme => ({
  centered: {
    position: 'fixed',
    top : '50%',
    left : '50%',
    maxWidth: '720px',
    transform : 'translate(-50%, -50%)'
        },
  pagePadding : {
    padding: "100px"
  },
  amoutColor:{
    color : 'green'
  },
  discountColor:{
    color : 'red'
  },
  totalPrice:{
    fontSize: '5rem',
  }
    })
class Calculate extends Component {
  state = {
    price: 0,
    discount: 0,
    error: false
  }
  handlePrice = (value) =>{
    this.setState({
      price : value
    })
  }
  handleDiscount = (value) =>{
    this.setState({
      discount : value
    })
  }
  handleError = (value) =>{
    this.setState({
      error : value
    })
  }
  
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <Layout>
        <NoSsr>
          <div className="centered container">
          <Paper className={classes.pagePadding}>
            <Grid container
              direction="row"
              justify="space-between"
              alignItems="center" 
              className={classes.amoutColor}>
              <h1>Amount </h1>
              <h1><TextPrice onPrice = {this.handlePrice}/></h1>
              </Grid>
              <Grid container
              direction="row"
              justify="space-between"
              alignItems="center"
              className={classes.discountColor}>
              <h1>Discount</h1>
              <h1><TextDiscount onDiscount={this.handleDiscount}/></h1>
              </Grid>
              <hr></hr>
              <div className="text-center">
              <h1  className={classes.totalPrice}>Total amount</h1>
              <h1  className={classes.totalPrice}><TextTotal price ={this.state.price} discount = {this.state.discount}/></h1>
              </div>
          </Paper>
          </div>
          <div className="text-center m-5">
          <SignoutBtn errorvar={this.handleError}/>
          <AlertError error={this.state.error}/>
          </div>
          </NoSsr>
          </Layout>
          </Fragment>
    );
  }
}
Calculate.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles) (Calculate);