import React, { Component, Fragment } from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import {withStyles, Button, NoSsr, colors} from '@material-ui/core'

const styles = theme => ({
  DiscountBtn:{
    fontSize: '2.9375rem',
    background: colors.red[900],
    width: 300
  }
})

class DiscountButton extends Component {
  render() {
    const { classes } = this.props
    return (
      <Fragment>
        <NoSsr>
        <Link href="/discount">
        <Button name="discountBtn" variant="contained" 
              size="large"
              fontSize="large"
              className={classes.DiscountBtn}>
                    DISCOUNT
              </Button>
              </Link>
    </NoSsr>
          </Fragment>
    )
  }
}
DiscountButton.propTypes = {
  classes: PropTypes.object.isRequired,
}
 
export default withStyles(styles) (DiscountButton)