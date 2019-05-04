import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { SnackbarProvider, withSnackbar } from 'notistack'

class AlearText extends React.Component {
    componentDidMount(){
        this.props.onRef(this)
    }
    componentWillMount(){
        this.props.onRef(undefined)
    }
  handleClickInfo () {
    this.props.enqueueSnackbar('Please wait . . .', {variant: 'info', name="alertTextInfo"})
  }
  handleClickError () {
    this.props.enqueueSnackbar('Something error. please try again', {variant: 'error', name="alertTextError"})
  }
  render() {
    return (
        <Fragment>
        </Fragment>
    )
  }
}

AlearText.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
}

const MyAlearText = withSnackbar(AlearText)

function IntegrationNotistack(props) {
  return (
    <SnackbarProvider maxSnack={3}>
      <MyAlearText onRef={props.onRef}/>
    </SnackbarProvider>
  )
}

export default IntegrationNotistack