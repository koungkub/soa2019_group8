import {withStyles, TableCell, TableRow} from '@material-ui/core';
import PropTypes from 'prop-types';
import {Component} from 'react'

const styles = theme => ({
    bodyText: {
        fontSize: '1.4rem'
    }
});


class TableBodyDiscountCode extends Component {
    constructor(props){
        super(props)
        this.state = {
            data: props.data
        }
    }
    render(){
        const { classes } = this.props;
        return(
            <TableRow key={this.state.data.id}>
                <TableCell component="th" scope="row" className={classes.bodyText}>{this.state.data.name}</TableCell>
                <TableCell align="right" className={classes.bodyText}>{this.state.data.pay}</TableCell>
             </TableRow>
        )
    }
    
}

TableBodyDiscountCode.propTypes = {
    classes: PropTypes.object.isRequired,
  };
export default withStyles(styles) (TableBodyDiscountCode)