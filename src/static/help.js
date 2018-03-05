/**
 * Static content for the "help" page.
 */
import React from 'react';

export const title = 'Help';

export const content = (<div class="static-page">

<h1>Help</h1>

<section>
<h2>Creating an asset entry</h2>

<ol>
  <li>Select the ‘Add new entry’ button</li>
  <li>Fill in the form</li>
  <li>Select the ‘Save’ button</li>
</ol>
</section>

<section>
  <h2>Deleting an entry</h2>

  <p>There are two possible methods to delete an entry.</p>

  <p><strong>Method 1:</strong> The ‘action’ button</p>
  <ol>
    <li>Select the ‘action’ button, located on the far right of the entry row in the table</li>
    <li>Select Delete</li>
    <li>Confirm you're sure you want to delete the entry</li>
  </ol>

  <p><strong>Method 2:</strong> The delete button inside of an entry</p>
  <ol>
    <li>Select an entry from the asset entry table</li>
    <li>Select ‘Delete entry’ button from the top header</li>
    <li>Confirm you're sure you want to delete the entry</li>
  </ol>

  <p><i>Please note: deleting an entry is permanent, so please only do so if you're sure you no longer need to keep an entry of the corresponding asset. Deleting an entry will not delete the asset itself.</i></p>
</section>

<section>
  <h2>Making an entry private or public</h2>

  <p>Entries have the ability to be set to private or public in the register. By default, entries are public and viewable to anyone that has access to the register. These entries are read-only for anyone outside of the assigned institution. Setting an entry to private will hide it from others outside of your institution.</p>

  <p>Entries can be set as private or public using the action button, located on the far right of the entry row in the table, or by using the switch in the editing form.</p>

  <p><i>Please note: an entry is just a record that an asset exists and a high-level description of its contents. Users outside your institution can read an entry when it's set to public, however this does not mean they can view the asset itself, or any of the data within it.</i></p>
</section>

<section>
  <h2>Giving additional people access to the register</h2>

  <p>To request access to the register for somebody else (for example a computer officer), please contact the user-experience team at <a href="mailto:ux+iar@uis.cam.ac.uk?Subject=Access%20request%3A%20Information%20Asset%20Register">ux+iar@uis.cam.ac.uk</a> with the CRSid of the new user.</p>

</section>

<section>
  <h2>Get support using the register</h2>

  <p>If you’re having problems viewing, adding or editing entries, please contact the user-experience team at <a href="mailto:ux+iar@uis.cam.ac.uk?Subject=Support%3A%20Information%20Asset%20Register">ux+iar@uis.cam.ac.uk</a></p>

</section>

</div>);

export default { title, content };
