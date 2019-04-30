import React, { Component, Fragment } from 'react';
import Link from 'next/link'
import PropTypes from 'prop-types';
import {Button, withStyles, NoSsr} from '@material-ui/core';
//components
import Layout from '../components/Layout';
import LogoParking from '../components/LogoParking';

const styles = theme => ({
  centered: {
    position: 'fixed',
    top : '50%',
    left : '50%',
    maxWidth: '720px',
    transform : 'translate(-50%, -50%)'
        }
    })
class Index extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <Layout>
        <NoSsr>
          <div className="centered container">
          
          </div>
          </NoSsr>
          </Layout>
          </Fragment>
    );
  }
}
Index.propTypes = {
  classes: PropTypes.object.isRequired,
};
 
export default withStyles(styles) (Index);