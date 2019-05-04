import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import {withStyles,Paper} from '@material-ui/core'
import axios from 'axios'
import auth from '../function/authen'
const styles = theme => ({
     root: {
    width: '700px',
    marginTop: theme.spacing.unit * 2,
    overflowX: 'auto',
    margin : 'auto',
    border: '3px solid ',
    padding: '40px'
  },
})
class TablePolicy extends Component {
  state = {
    amountRate: 0,
    discountRate: 0,
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
          amountRate: res.data.amountRate,
          parkRate: res.data.parkRate,
          discountRate: res.data.discountRate
        })
      })
    }
  }
  render() {
    const { classes } = this.props
    return (
      <Fragment>
      <Paper className={classes.root}>
     <h1>Policy</h1>
     <ol>
      <li>อัตราค่าบริการจอดรถ
        <ul>
          <li>คิดค่าบริการชั่วโมงละ {this.state.parkRate} บาท</li>
          <li>เศษของชั่วโมงที่ไม่เกิน 60 นาที (ตั้งแต่ 1-59) จะไม่ถูกนับเป็นชั่วโมง</li>
        </ul>
      </li>
      <li>ซื้อสินค้าและ/หรือบริการต่อวันรวม {this.state.amountRate}บาท สามารถลดค่าจอดรถได้ {this.state.discountRate}บาท</li>
      <li>ท่านจะได้รับรหัสส่วนลดจากใบเสร็จชำระเงินจากร้านค้าต่างๆภายในสถานที่ที่ท่านจอดรถเท่านั้น </li>
      <li>** หากท่านลูกค้าจอดรถค้างคืนอาจจะถูกปรับเพิ่ม (บางสาขา)</li>
      <li>ทางทีมงานขอสงวนสิทธิ์เปลี่ยนแปลงเงื่อนไขได้โดยไม่ต้องให้ทราบล่วงหน้า</li>
     </ol> 

    </Paper>
          </Fragment>
    )
  }
}
TablePolicy.propTypes = {
  classes: PropTypes.object.isRequired,
}
 
export default withStyles(styles) (TablePolicy)