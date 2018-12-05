/**
 * $context
 */

import createContext from '@/util/create-context';
import vStore from './store';

const $context = createContext({
  store: vStore
});

export default $context;
