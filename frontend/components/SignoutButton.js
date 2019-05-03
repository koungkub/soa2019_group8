import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {withStyles, Button, NoSsr} from '@material-ui/core';
import Axios from 'axios';
import router from 'next/router'
const styles = theme => ({
  signoutBtn:{
    fontSize: '1.575rem',
    width: 300
  }
});
class SignoutButton extends Component {
  constructor(props){
    super(props)
  }
  handleSignout = () => {
    Axios.get(localStorage.rootapi + 'parking/exit',{headers:{
      'Authorization': localStorage.token
    }}).then(res=>{
      localStorage.removeItem('token')
      localStorage.removeItem('rootapi')
      console.log('success')
      router.replace('/thank')
    }).catch(e=>{
      console.log('error')
      this.props.errorvar(true)
    })
  }
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <NoSsr>
        <Button variant="contained"
              size="large"
              fontSize="large"
              color="secondary"
              className={classes.signoutBtn}
              onClick={this.handleSignout}>
                    PRESS TO SIGNOUT
        </Button>
    </NoSsr>
          </Fragment>
    );
  }
}

SignoutButton.propTypes = {
  classes: PropTypes.object.isRequired,
};
 
export default withStyles(styles) (SignoutButton);