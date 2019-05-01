import { Component, Fragment } from "react";
import axios from 'axios'
//function
import moment from 'moment'
import auth from '../function/authen'
class TextDurationPark extends Component {
    constructor(props){
        super(props)
        this.state = {
            startTime : '',
            now: ''
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
                      startTime: res.data.startTime
                  })
            }
            )
        }
    }
    render(){
        return (
            <Fragment>
            {this.state.now}
            </Fragment>
        )
    }
}
export default TextDurationPark