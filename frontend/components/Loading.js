import CircularProgress from '@material-ui/core/CircularProgress';
import { Component, Fragment } from 'react';

class Loading extends Component {

    render(){
        return(
            <Fragment>    
            <CircularProgress color="secondary"/>
            </Fragment>
        )
    }
}
  
export default  (Loading);