/**
 * Static content for the "help" page.
 */
import React from 'react';

export const title = 'Help';

export const content = (<div className="static-page">

<h1>Help</h1>

<section>
  Read the guidance to find out which <a href="https://www.information-compliance.admin.cam.ac.uk/data-protection/information-asset-register-guidance-departmental-administrators" target="_blank" rel="noopener noreferrer">assets to include</a> in the IAR.
</section>

<section>
<h2>Creating an asset entry</h2>

<ol>
  <li>Select the ‘Add new entry’ button</li>
  <li>Fill in the form</li>
  <li>Select the ‘Save’ button</li>
</ol>
</section>

<section>
<h3>When an asset entry covers more than one set of information</h3>

<p>You can record details for more than one set of information within a single asset entry if those sets are used for the same purpose. Add details for either:</p>

<ul>
  <li>all the sets of information - in the sections where you can select multiple responses</li>
  <li>only your most important set of information - where you must give a single response</li>
</ul>
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

  <p><strong>Method 2:</strong> The delete button within an entry that your institution owns</p>
  <ol>
    <li>Select an entry from the asset entry table</li>
    <li>Select ‘Delete entry’ button from the top header</li>
    <li>Confirm you're sure you want to delete the entry</li>
  </ol>

  <p><i>Please note: deleting an entry is permanent, so only do so if you're sure you no longer need to keep an entry of the corresponding asset. Deleting an entry will not delete the asset itself.</i></p>
</section>

<section>
  <h2>Making an entry private</h2>

  <p>All entries in the register are public - visible to all users - by default.</p>
  <p>You can make an entry ‘private’ - visible only to users who belong to your institution. The IAR uses Lookup to identify which institutions a user belongs to.
</p>
  <p>Central users of the IAR, for example the Information Compliance Office and some UIS staff, can also see private entries.
</p>

  <p><i>Please note: an entry is just a record that an asset exists and a summary of its contents. Users outside your institution can read an entry when it's set to public, however this does not mean they can view the asset itself, or any of the data within it.</i></p>
</section>

<section>
  <h2>Giving additional people access to the register</h2>

  <p>You can request access to the register for somebody else (for example a computer officer) by <a href="https://www.lookup.cam.ac.uk/group/uis-iar-admins/members?personOrder=inst_names&personMax=1000000" target="_blank" rel="noopener noreferrer">contacting an administrator</a> from their institution.</p>

</section>

<section>
  <h2>Get support using the register</h2>

  <p>If you’re having problems, please contact the <a href="mailto:service-desk@uis.cam.ac.uk">service desk</a>.</p>

</section>

</div>);

export default { title, content };
