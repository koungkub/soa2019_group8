import React, { Component, Fragment } from 'react';
import { NoSsr} from '@material-ui/core';
import axios from 'axios'


import auth from '../function/authen'

class TextPrice extends Component {
  state = {
    curTime: '',
    startTime: '',
    amountHour: 0,
    price: 0,
    parkRate:0
  }
  componentDidMount(){
    if(auth.apply() == true){
      
    axios.get(localStorage.rootapi + 'parking', {
      headers:{
        'Authorization': localStorage.token
      }
    }).then(res=>{
      this.setState({
        startTime: new Date(res.data.startTime),
        parkRate: res.data.parkRate
      })
    })
   setInterval( () => {
      this.setState({
        curTime : new Date(),
        amountHour : this.state.curTime - this.state.startTime < 0 ? 0 : Math.floor(new Date(this.state.curTime - this.state.startTime)/3600000),
        price : this.state.amountHour * this.state.parkRate
      })
      try{
        this.props.onPrice(this.state.price)
      }catch{
      }
  },1000)
}
}
componentWillMount(){
  
}
  render() {
    return (
      <Fragment>
        <NoSsr>
      {this.state.price} Bath
    </NoSsr>
          </Fragment>
    );
  }
}
export default (TextPrice);