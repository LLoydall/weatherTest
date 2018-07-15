/**
 *
 * Asynchronously loads the component for TimeLine
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
