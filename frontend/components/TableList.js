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
    createData('GVIDJI406D', 300),
    createData('KVORT897DE', 700),
    createData('DLG0P4KFLC', 50),
    createData('FI9GIE94V9', 30),
    createData('4I93WI29JD', 58),
  ];

class BorderText extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <NoSsr>
      <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow >
            <TableCell className={classes.head}>CODE</TableCell>
            <TableCell align="right" className={classes.head}>PAID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id} className={classes.bodyText}>
              <TableCell component="th" scope="row">{row.name}</TableCell>
              <TableCell align="right">{row.pay}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableHead>
          <TableRow >
            <TableCell className={classes.head}>DISCOUNT</TableCell>
            <TableCell align="right" className={classes.head}>0</TableCell>
          </TableRow>
        </TableHead>
      </Table>
    </Paper>
    </NoSsr>
          </Fragment>
    );
  }
}
BorderText.propTypes = {
  classes: PropTypes.object.isRequired,
};
 
export default withStyles(styles) (BorderText);