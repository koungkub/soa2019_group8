import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import {withStyles, NoSsr, Grid} from '@material-ui/core'

//components
import Layout from '../components/Layout'
import TableList from '../components/TablePolicy'
import InputCode from '../components/InputCode'
import BackButton from '../components/BackButton'
import SubmitBtn from '../components/SubmitDiscountButton'

const styles = theme => ({
  margin5:{
    margin :'3rem'
}
})

class Discount extends Component { 
   state = {
      code: '',
      error: false
    }
  handleCode = (value) =>{
    this.setState({
      code : value
    })
  }
  handleError = (value) =>{
    this.setState({
      error : value
    })
  }
  render() {
    const { classes } = this.props
    return (
      <Fragment>
        <Layout>
        <NoSsr>
            <div className="container">
          <TableList/>
          <h1>DISCOUNT</h1>
          <InputCode onSelectCode = {this.handleCode}/>
          <div className={classes.margin5}/>
          <Grid container>
          <Grid item xs={6} className="text-center">
          <BackButton/>
              </Grid>
              <Grid item xs={6} className="text-center">
              <SubmitBtn code={this.state.code} errorhandle={this.handleError}/>
              </Grid>
              </Grid>          
          </div>
          </NoSsr>
          </Layout>
          </Fragment>
    )
  }
}
Discount.propTypes = {
  classes: PropTypes.object.isRequired,
}
 
export default withStyles(styles) (Discount)