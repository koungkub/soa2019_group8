import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import {Table , withStyles, NoSsr, TableCell, TableHead, TableRow, Paper} from '@material-ui/core'
import TextTimeStart from './TextTime'
const styles = theme => ({
  root: {
    width: '500px',
    marginTop: theme.spacing.unit * 2,
    overflowX: 'auto',
    margin : 'auto'
  },
  table: {
    maxWidth: 500,
  },
  head: {
    fontSize: '3rem'
  },
})

class BorderText extends Component {
  render() {
    const { classes } = this.props
    return (
      <Fragment>
        <NoSsr>
      <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow >
            <TableCell className={classes.head}>ARRIVAL</TableCell>
            <TableCell align="right" className={classes.head}><TextTimeStart/></TableCell>
          </TableRow>
        </TableHead>
      </Table>
    </Paper>
    </NoSsr>
          </Fragment>
    )
  }
}
BorderText.propTypes = {
  classes: PropTypes.object.isRequired,
}
 
export default withStyles(styles) (BorderText)