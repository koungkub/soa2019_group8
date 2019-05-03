// import NoSSR from 'react-no-ssr';
import React, { Component } from 'react';
import axios from 'axios'
//function
import auth from '../function/authen'

class ParkingTime extends Component {
  intervalID = 0
  constructor(props) {
    super(props);
    this.state = {
      parking: 'Please wait',
      curTime: '',
      startTime: ''
    };
  }
  msToTime(s) {
    let ms = s % 1000;
    s = (s - ms) / 1000;
    let secs = s % 60;
    s = (s - secs) / 60;
    let mins = s % 60;
    let hrs = (s - mins) / 60;
   
    return (hrs < 10 ? ("0"+ hrs) : hrs) + ':' + (mins < 10 ? ("0"+ mins) : mins);
  }
  componentDidMount() {
    if(auth.apply() == true){
      axios.get((localStorage.rootapi + 'parking') ,{
          headers: {
            'Authorization': localStorage.token
          }
        }).then(
          res=>{
            this.setState({
                startTime: new Date(res.data.startTime)
            })
      }
      )
      this.intervalID = setInterval( () => {
        this.setState({
          curTime : new Date(),
          parking : this.state.curTime - this.state.startTime < 0 ? "Please wait" : this.msToTime(this.state.curTime - this.state.startTime)
        })
    },1000)
  }

      
  }
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }
  render() {
    return (
      <div>
        {typeof(this.state.parking) == true || this.state.parking.toLocaleString()}
      </div>
    );
  }
}
 
export default ParkingTime;