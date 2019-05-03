import React, { Component, Fragment } from 'react';
import Link from 'next/link'
import PropTypes from 'prop-types';
import {withStyles, Button, NoSsr} from '@material-ui/core';
import DialogPopup from './Dialog';
import Axios from 'axios';

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
    }).catch(e=>{
      console.log('error')
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
        <DialogPopup open={this.state.open} setOpen={this.state.setOpen}/>
    </NoSsr>
          </Fragment>
    );
  }
}

SignoutButton.propTypes = {
  classes: PropTypes.object.isRequired,
};
 
export default withStyles(styles) (SignoutButton);