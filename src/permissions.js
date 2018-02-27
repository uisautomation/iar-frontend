// Determine if the current signed in user can edit the URL at assetUrl. Takes the current redux
// store state as an argument.
export const canEditAsset = (storeState, assetUrl) => {
  const {
    auth: { isLoggedIn }, lookupApi: { self, selfLoading }, assets: { assetsByUrl }
  } = storeState;

  // must be logged in
  if(!isLoggedIn) { return false; }

  // must have a list of institutions retrieved
  if(!self || selfLoading) { return false; }

  // must have this asset retrieved
  const { asset, fetchedAt } = assetsByUrl.get(assetUrl) || { };
  if(!asset || !fetchedAt) { return false; }

  // get list of user institution instids
  const selfInstids = new Set(self.institutions.map(({ instid }) => instid));

  // user must be member of asset institution
  return selfInstids.has(asset.department);
}
