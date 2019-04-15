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
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
      <Paper className={classes.root}>
     <h1>Policy</h1>
     <ol>
      <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry</li>
      <li>orem Ipsum has been the industry's standard dummy text ever since the 1500s</li>
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