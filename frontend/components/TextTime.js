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
        axios.get((localStorage.rootapi + 'parking') ,{
            headers: {
              'Authorization': localStorage.token
            }
          }).then(
            res=>{
            console.log(res)
              this.setState({
                  startTime: res.data.startTime
              })
        }
        )
        // setInterval(() => {
        // }, 1000);
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