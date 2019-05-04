import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import {withStyles, Button, NoSsr} from '@material-ui/core'
import DialogPopup from './Dialog'

const styles = theme => ({
  paymentBtn:{
    fontSize: '2.9375rem',
    background: 'green',
    width: 300
  }
})
function initState(PaymentButton){
  return function WrappedComponent(props) {
    const [close, setClose] = React.useState(false)
    const [open, setOpen] = React.useState(true)
    return <PaymentButton {...props} close={close} open={open} setOpen={setOpen} setClose={setClose}/>
  }
}
class PaymentButton extends Component {
  constructor(props){
    super(props)
    this.state = {
      open: this.props.close,
      setOpen: this.props.setClose
    }
  }
  handleOpen = () => {
    this.setState({
      open: this.props.open,
      setOpen: this.props.setOpen
    })
  }
  render() {
    const { classes } = this.props
    return (
      
      <Fragment>
        <NoSsr>
        <Button variant="contained"
              size="large"
              fontSize="large"
              className={classes.paymentBtn}
              onClick={this.handleOpen}>
                    PAYMENT
        </Button>
        <DialogPopup open={this.state.open} setOpen={this.state.setOpen}/>
    </NoSsr>
          </Fragment>
    )
  }
}

PaymentButton = initState(PaymentButton)
PaymentButton.propTypes = {
  classes: PropTypes.object.isRequired,
}
 
export default withStyles(styles) (PaymentButton)