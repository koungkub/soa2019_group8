import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router'
import {withStyles, Button, NoSsr} from '@material-ui/core';
import axios from 'axios'

const styles = theme => ({
  greenBtn:{
    fontSize: '2.9375rem',
    width: 300,
    background: 'green',
  }
});


class SubmitDiscountButton extends Component {
  constructor(props){
    super(props)
    this.state = {
      code : ''
    }
  }  
  componentWillReceiveProps(nextprops){
    this.setState({
      code: nextprops.code
    })
    
  }
  checkDiscountCode = () => {
    let path = (localStorage.rootapi) + ('discount/') + (this.state.code)
    axios.get(path, {
      headers: {
        'Authorization': localStorage.token
      }
    }).then(
      Router.replace('/main')
    ).catch(e =>{
      console.log(e)
    })

  }
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <NoSsr>
        <Button variant="contained" color="default"
              size="large"
              fontSize="large"
              className={classes.greenBtn}
              onClick={this.checkDiscountCode}
              >
                    Submit
              </Button>
    </NoSsr>
          </Fragment>
    );
  }
}
SubmitDiscountButton.propTypes = {
  classes: PropTypes.object.isRequired,
};
 
export default withStyles(styles) (SubmitDiscountButton);