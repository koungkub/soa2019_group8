import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import {withStyles, NoSsr} from '@material-ui/core'
import axios from 'axios'


import auth from '../function/authen'
const styles = theme => ({
})

class TextPrice extends Component {
  constructor(props){
    super(props)
    this.state = {
     discountRate: 0,
     amountRate: 0,
     discount:"please wait",
     amount: 0
    }
  }
  getAmountInList(list){
      let amount = 0
      list.forEach(element => {
          amount += element.amount
      })
      return amount
  }
  componentDidMount(){
    if(auth.apply() == true){
      
    axios.get(localStorage.rootapi + 'parking', {
      headers:{
        'Authorization': localStorage.token
      }
    }).then(res=>{
      this.setState({
        discountRate: res.data.discountRate,
        amountRate: res.data.amountRate
      })
    }).then(axios.get(localStorage.rootapi + 'discount', {
        headers:{
          'Authorization': localStorage.token
        }
      }).then(res=>{
        this.setState({
          amount: this.getAmountInList(res.data),
        })
      }))

      setInterval( () => {
        this.setState({
          discount:   Math.floor(this.state.amount/this.state.amountRate) * this.state.discountRate + "Bath"
        })
        try{
          this.props.onDiscount(this.state.discount)
        }catch{

        }
    },5000) 
  }
}

  render() {
    const { classes } = this.props
    return (
      <Fragment>
     {this.state.discount}
          </Fragment>
    )
  }
}
TextPrice.propTypes = {
  classes: PropTypes.object.isRequired,
}
 
export default withStyles(styles) (TextPrice)