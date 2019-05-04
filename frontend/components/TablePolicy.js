import React, { Component, Fragment } from 'react';
import Link from 'next/link'
import PropTypes from 'prop-types';
import {Table , withStyles, NoSsr, TableCell, TableHead, TableRow, Paper, TableBody} from '@material-ui/core';

const styles = theme => ({
     root: {
    width: '700px',
    marginTop: theme.spacing.unit * 2,
    overflowX: 'auto',
    margin : 'auto',
    border: '3px solid ',
    padding: '40px'
  },
});
class TablePolicy extends Component {
  state = {
    amountRate: 0,
    discountRate: 0,
    parkRate:0
  }
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
      <Paper className={classes.root}>
     <h1>Policy</h1>
     <ol>
      <li>อัตราค่าบริการจอดรถ
        <ul>
          <li>คิดค่าบริการชั่วโมงละ {this.state.parkRate} บาท</li>
          <li>เศษของชั่วโมงเกิน 30 นาที คิดเป็น 1 ชั่วโมง</li>
        </ul>
      </li>
      <li>ซื้อสินค้าและ/หรือบริการต่อวันรวม {this.state.amountRate}บาท สามารถลดค่าจอดรถได้ {this.state.discountRate}</li>
      <li> Contrary to popular belief, Lorem Ipsum is not simply random text. </li>
      <li>it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College</li>
     </ol> 

    </Paper>
          </Fragment>
    );
  }
}
TablePolicy.propTypes = {
  classes: PropTypes.object.isRequired,
};
 
export default withStyles(styles) (TablePolicy);