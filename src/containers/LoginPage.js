import React from 'react'
import LoginButton from '../components/LoginButton';

/**
 * A login page requesting that the user log in.
 */
export default () => (
  <div>
    <h1>Welcome to the IAR</h1>
    <p>
      The information asset register is a way to record information about the University of
      Cambridge's information assets.
    </p>
    <LoginButton />
  </div>
);
