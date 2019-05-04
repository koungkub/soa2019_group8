import React, { Component, Fragment } from 'react'
import Router from 'next/router'
import PropTypes from 'prop-types'
import {withStyles, Button, NoSsr} from '@material-ui/core'


const styles = theme => ({
  paymentBtn:{
    fontSize: '2.9375rem',
    width: 300
  }
})

function activeback(e) {
    e.preventDefault()
    Router.back()
  }
class BackButton extends Component {
    
  render() {
    const { classes } = this.props
    return (
      <Fragment>
        <NoSsr>
        <Button variant="contained" color="default"
              size="large"
              fontSize="large"
              className={classes.paymentBtn}
              onClick={activeback}>
                    Back
              </Button>
    </NoSsr>
          </Fragment>
    )
  }
}
BackButton.propTypes = {
  classes: PropTypes.object.isRequired,
}
 
export default withStyles(styles) (BackButton)