import React, { Component, Fragment } from 'react';
import Link from 'next/link'
import PropTypes from 'prop-types';
import {withStyles, NoSsr, Divider, Button, Grid} from '@material-ui/core';

//components
import Layout from '../components/Layout';
import TableList from '../components/TablePolicy';

const styles = theme => ({
})

class Discount extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <Layout>
        
            <div className="container text-center">
          <TableList/>          
          </div>
          </Layout>
          </Fragment>
    );
  }
}
Discount.propTypes = {
  classes: PropTypes.object.isRequired,
};
 
export default withStyles(styles) (Discount);