import { withSnackbar } from 'notistack'
import { Fragment, Component } from 'react'
class Snackbar extends Component {
      handleClickVariant = variant => () => {
        // variant could be success, error, warning or info
        this.props.enqueueSnackbar('This is a warning message!', { variant })
      }
    
      render() {
        return (
          <Fragment>
            <Button onClick={this.handleClickVariant('warning')}>Show warning snackbar</Button>
          </Fragment>
        )
      }
}
 
export default withSnackbar(Snackbar)