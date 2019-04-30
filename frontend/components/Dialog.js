import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

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
    componentWillReceiveProps(nexProps){
      this.setState({
        open: nexProps.open,
        setOpen: nexProps.setOpen
      })
    }
    render(){
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
                <DialogTitle id="alert-dialog-slide-title">{"Submit to payment"}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-slide-description">
                    Do you want to submit to payment?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClose} color="default">
                    Cancel
                  </Button>
                  <Button onClick={this.handleClose} color="primary">
                    Submit
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          );
        }
        
    }
DialogPopup = initState(DialogPopup);
export default DialogPopup;
