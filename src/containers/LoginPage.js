import React from 'react'
import LoginButton from '../components/LoginButton';
import Logo from '../images/cambridgeuniversity_logo.svg';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  heroContent: {
    backgroundColor: theme.customColors.white,
    height: '700px',
  },
  navHeader: {
    display: 'flex',
    height: '80px',
    padding: '10px 40px',
  },
  loginButton: {
    marginLeft: 'auto',
    display: 'flex',
    alignItems: 'center'
  },
  camLogo: {
    width: '180px'
  },
  productName: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '20px',
    '& h2' : {
      fontSize: 18,
      fontWeight: 300
    }
  },
  productDescription: {
    paddingTop: '60px',
    width: '960px',
    margin: 'auto',
    '& span': {
      fontSize: 14,
      fontWeight: 400
    },
    '& h1': {
      fontSize: 32,
      fontWeight: 300,
      margin: 0,
      color: theme.customColors.darkGrey
    },
    '& p': {
      fontSize: 16,
      fontWeight: 300,
      width: '550px',
      padding: '15px 0px 0px 0px',
      color: theme.customColors.mediumGrey
    }
  }
});

/**
 * A login page requesting that the user log in.
 */
const LoginPage = ({classes}) => (
  <div className={classes.heroContent}>
    <div className={classes.navHeader}>
      <img src={Logo} className={classes.camLogo} alt="Cambridge University Logo"/>
      <span className={classes.productName}>
        <h2>Information Asset Register</h2>
      </span>
      <span className={classes.loginButton}>
        <LoginButton />
      </span>
    </div>
    <div className={classes.productDescription}>
      <span>Welcome to the</span>
      <h1>Information Asset Register</h1>
      <p>
        The information asset register is a way to record information about the University of
        Cambridge's information assets.
      </p>
      <p style={{paddingBottom: '15px'}}>
        The register does not store any of the assets, and cannot be used for such purpose. The register only holds a record that an asset exists and a high level description of it's contents.
      </p>
      <LoginButton />
    </div>
  </div>
);

export default withStyles(styles)(LoginPage);
