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
    <h2>You don’t have permission to use this service.</h2>


</section>
  <p>
    To request access please <a href="https://www.lookup.cam.ac.uk/group/uis-iar-admins/members" target="_blank" rel="noopener noreferrer">
      contact an admin
    </a> from your institution.
  </p>
  <p>
    <Button variant='raised' type='Button' color={'primary'} component={LogoutLink}>
      Sign out
    </Button>
  </p>
</div>;

export default { title, content };
