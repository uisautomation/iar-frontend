/**
 * Static content for the "help" page.
 */
import React from 'react';
import LogoutLink from "../components/LogoutLink";
import { Button } from "material-ui";

export const title = "The Information Asset Register";

export const content =
<div className="static-page">
  <section>
    <h2>You do not currently have permission to use this application.</h2>
  </section>
  <p>
    You haven't been configured as a user of this application.
    You can contact the application administrator to be configured as a user
    and then sign back into the application.
  </p>
  <p>
    <Button variant='raised' type='Button' color={'primary'} component={LogoutLink}>
      Sign out
    </Button>
  </p>
</div>;

export default { title, content };
