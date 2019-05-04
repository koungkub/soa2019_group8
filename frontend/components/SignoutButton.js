import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import {withStyles, Button, NoSsr} from '@material-ui/core'
import Axios from 'axios'
import router from 'next/router'
import AlertText from './AlertText'
const styles = theme => ({
  signoutBtn:{
    fontSize: '1.575rem',
    width: 300
  }
})
class SignoutButton extends Component {
  constructor(props){
    super(props)
  }
  handleSignout = () => {
    this.child.handleClickInfo()
    Axios.get(localStorage.rootapi + 'parking/exit',{headers:{
      'Authorization': localStorage.token
    }}).then(res=>{
      localStorage.removeItem('token')
      localStorage.removeItem('rootapi')
      console.log('success')
      router.replace('/thank')
    }).catch(e=>{
      this.child.handleClickError()
      console.log('error')
      this.props.errorvar(true)
    })
  }
  render() {
    const { classes } = this.props
    return (
      <Fragment>
        <NoSsr>
        <Button
        name="signoutBtn"
         variant="contained"
              size="large"
              fontSize="large"
              color="secondary"
              className={classes.signoutBtn}
              onClick={this.handleSignout}>
                    PRESS TO SIGNOUT
        </Button>
        <AlertText onRef={ref => (this.child = ref)}/>
    </NoSsr>
          </Fragment>
    )
  }
}

SignoutButton.propTypes = {
  classes: PropTypes.object.isRequired,
}
 
export default withStyles(styles) (SignoutButton)