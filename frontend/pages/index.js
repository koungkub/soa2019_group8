import React, { Component, Fragment } from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import {Button, Grid, withStyles, NoSsr} from '@material-ui/core'
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
class Index extends Component {
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
            <Link href="/scan">
              <Button name="goInside" variant="outlined" color="default"
              size="large"
              fontSize="large"
              className={classes.startBtn}>
              SCAN QR CODE
              </Button>
            </Link>
            </Grid>
             </Grid>
          </NoSsr>
          </Layout>
          </Fragment>
    )
  }
}
Index.propTypes = {
  classes: PropTypes.object.isRequired,
}
 
export default withStyles(styles) (Index)