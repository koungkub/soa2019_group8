// import NoSSR from 'react-no-ssr';
import React, { Component } from 'react';
class ParkingTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parking: 'Please wait',
      curTime: '',
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
    var arriveTime = new Date(2019, 1, 7, 0, 32);
    setInterval( () => {
        this.setState({
          curTime : new Date(),
          parking : this.state.curTime - arriveTime < 0 ? "Please wait" : this.msToTime(this.state.curTime - arriveTime)
        })
    },1000)
  }
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }
  render() {
    return (
      <div>
        <p>{typeof(this.state.parking) == true || this.state.parking.toLocaleString()}</p>

        {/* <NoSSR>
        
        </NoSSR> */}
      </div>
    );
  }
}
 
export default ParkingTime;