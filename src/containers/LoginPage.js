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
    width: '180px',
    height: '80px'
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
      <h1>Information asset register:<br /> record details of information held by your institution</h1>
      <p>
      You must record details of certain information assets (databases, lists or other collections of data) held by your institution — do this by <strong>30 April 2018</strong>.
      </p>
      <p>
      This will help the University meet its duties under the General Data Protection Regulation which becomes law on 25 May 2018.
      </p>
      <p style={{paddingBottom: '15px'}}>
      Use the information asset register (IAR) to add, edit and view the details of these information assets. You cannot upload the data itself.
      </p>
      <LoginButton />
    </div>
  </div>
);

export default withStyles(styles)(LoginPage);
