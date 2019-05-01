import { Component, Fragment } from "react";
import axios from 'axios'
//function
import moment from 'moment'
import auth from '../function/authen'
class TextTime extends Component {
    constructor(props){
        super(props)
        this.state = {
            startTime : ""
            
        }
    }
    componentDidMount(){
        if(auth.apply() == true){
            axios.get((localStorage.rootapi + 'parking') ,{
                headers: {
                  'Authorization': localStorage.token
                }
              }).then(
                res=>{
                  this.setState({
                      startTime: moment(res.data.startTime).format(('kk:mm'))
                  })
            }
            )
        }
    }
    render(){
        return (
            <Fragment>
            {this.state.startTime}
            {console.log(this.state)}
            </Fragment>
        )
    }
}
export default TextTime