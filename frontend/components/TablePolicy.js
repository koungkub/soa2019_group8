import React, { Component, Fragment } from 'react';
import Link from 'next/link'
import PropTypes from 'prop-types';
import {Table , withStyles, NoSsr, TableCell, TableHead, TableRow, Paper, TableBody} from '@material-ui/core';

const styles = theme => ({
     root: {
    width: '600px',
    marginTop: theme.spacing.unit * 2,
    overflowX: 'auto',
    margin : 'auto'
  },
  table: {
    minWidth: 600,
  },
  head: {
    fontSize: '2rem'
  },
  bodyText: {
      fontSize: '2rem'
  }
});
let id = 0;
function createData(name, pay) {
  id += 1;
  return { id, name, pay};
}
const rows = [
    createData('1.โค้ดนี้ไม่สามารถใช้ข้ามสาขาได้'),
    createData('2.แต่ละโค้ดมีระยะเวลา 30 นาที'),
    createData('3.ทางห้างขอสงวนสิทธิ์ในการเปลี่ยนแปลง '),
  ];

class TablePolicy extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
      <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow >
            <TableCell align="center" className={classes.head}>Policy</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id} className={classes.bodyText}>
              <TableCell align="center" component="th" scope="row">{row.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
          </Fragment>
    );
  }
}
TablePolicy.propTypes = {
  classes: PropTypes.object.isRequired,
};
 
export default withStyles(styles) (TablePolicy);