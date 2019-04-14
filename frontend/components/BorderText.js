import React, { Component, Fragment } from 'react';
import Link from 'next/link'
import PropTypes from 'prop-types';
import {Table , withStyles, NoSsr, TableCell, TableHead, TableRow, Paper} from '@material-ui/core';

const styles = theme => ({
  table: {
    maxWidth: 700,
  },
  head: {
    fontSize: '5rem'
  },
});

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
            <TableCell className={classes.head}>ARRIVAL</TableCell>
            <TableCell align="right" className={classes.head}>12:00</TableCell>
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