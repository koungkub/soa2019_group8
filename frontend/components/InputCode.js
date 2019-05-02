import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {withStyles, TextField} from '@material-ui/core';

const styles = theme => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '100%',
      },
});

class DiscountButton extends Component {
    state = {
        code: '',
    }
    handleChange = code => event => {
        this.setState({
          [code]: event.target.value,
        });
        this.props.onSelectCode(this.state.code)
      };
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
           <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="outlined-code"
          label="Please enter your code."
          className={classes.textField}
          value={this.state.code}
          onChange={this.handleChange('code')}
          margin="normal"
          variant="filled"
        />
</form>
          </Fragment>
    );
  }
}
DiscountButton.propTypes = {
  classes: PropTypes.object.isRequired,
};
 
export default withStyles(styles) (DiscountButton);