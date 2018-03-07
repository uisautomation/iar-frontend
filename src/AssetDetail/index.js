/**
 * AssetForm is a complex component which is made up of many moving parts. Generally the components
 * split into the following categories:
 *
 * presentational:
 *    Components which simply render a tree of other components as a pure function of their props.
 *
 * containers:
 *    Components which wrap a presentational component and set props on it.
 *
 * See the components in those directories for more information.
 *
 */
import AssetForm from './presentational/AssetForm';
import AssetView from './presentational/AssetView';
export { AssetForm, AssetView };
