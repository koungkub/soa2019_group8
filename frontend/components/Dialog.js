import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import {Dialog,  withStyles} from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Router from 'next/router'
import AlertText from './AlertText'
import PropTypes from 'prop-types';

const styles = theme => ({
  fontBtn:{
    fontSize: 20
  }
    })
function Transition(props) {
  return <Slide direction="up" {...props} />;
}
function initState(DialogPopup){
  return function WrappedComponent(props) {
    const [close, setClose] = React.useState(false);
    return <DialogPopup {...props} close={close} setClose={setClose}/>;
  }
}
class DialogPopup extends Component{
    constructor(props){
        super(props)
        this.state = {
          open: this.props.close,
          setOpen: this.props.setClose
        }
    }
    handleClose = ()=> {
      this.setState({
        open: this.props.close,
        setOpen: this.props.setClose
      })
    }
    handleSubmit = () => {
      this.child.handleClickInfo()
      this.handleClose()
      Router.push('/calculate')
    }
    
    componentWillReceiveProps(nexProps){
      this.setState({
        open: nexProps.open,
        setOpen: nexProps.setOpen
      })
    }
    render(){
      const { classes } = this.props;
        return (
            <div>
              <Dialog
                open={this.state.open}
                fullWidth={true}
                TransitionComponent={Transition}
                keepMounted
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
              >
                <DialogTitle id="alert-dialog-slide-title">{'Submit to payment'}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-slide-description">
                    Do you want to confirm payment?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button className={classes.fontBtn} size="large" onClick={this.handleClose} color="default">
                    Cancel
                  </Button>
                  <Button className={classes.fontBtn} size="large" onClick={this.handleSubmit} color="secondary">
                    Confirm
                  </Button>
                </DialogActions>
              </Dialog>
              <AlertText onRef={ref => (this.child = ref)}/>
            </div>
          );
        }
        
    }

DialogPopup = initState(DialogPopup);
DialogPopup.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles) (DialogPopup);
