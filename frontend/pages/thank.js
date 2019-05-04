import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import {Grid, withStyles, NoSsr} from '@material-ui/core'
//components
import Layout from '../components/Layout'
import LogoParking from '../components/LogoParking'

const styles = theme => ({
  centered: {
    position: 'fixed',
    top : '50%',
    left : '50%',
    maxWidth: '720px',
    transform : 'translate(-50%, -50%)'
 },
 startBtn:{
   width:"100%",
   fontSize: '2.9375rem',
   border: '8px solid rgba(0, 0, 0, 0.23)'
 }
})
class Thank extends Component {
  render() {
    const { classes } = this.props
    return (
      <Fragment>
        <Layout>
        <NoSsr>
          <Grid container className={classes.centered}>
            <Grid item xs={12}>
            <LogoParking></LogoParking>
            </Grid>
          <Grid item xs={12}>
              <h1 className="text-center">THANK YOU !! </h1>
            </Grid>
             </Grid>
          </NoSsr>
          </Layout>
          </Fragment>
    )
  }
}
Thank.propTypes = {
  classes: PropTypes.object.isRequired,
}
 
export default withStyles(styles) (Thank)