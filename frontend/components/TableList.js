import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {Table , withStyles, NoSsr, TableCell, TableHead, TableRow, Paper, TableBody} from '@material-ui/core';
import TableDiscount from './TableBodyDiscountCode';
//functiong
import auth from '../function/authen';
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


class TableList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: []
    }
  }
  componentDidMount(){
    let listdata = []
    if(auth.apply() == true){
      axios.get(localStorage.rootapi + 'discount',{
        headers: {
          'Authorization': localStorage.token
        }}
        ).then(res=>{
        res.data.forEach(data => {
          listdata.push(createData(data.store, data.amount))
        });
        this.setState({
          rows : listdata
        })
      })
    }
    
  }
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <NoSsr>
      <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow >
            <TableCell className={classes.head}>STORE</TableCell>
            <TableCell align="right" className={classes.head}>PAID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.rows.map(row => (
            <TableDiscount key ={row.id} data = {row}/>
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
TableList.propTypes = {
  classes: PropTypes.object.isRequired,
};
 
export default withStyles(styles) (TableList);