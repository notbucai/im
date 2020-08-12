import timConfig from './tim';
import storeConfig from './store';

export const store = storeConfig();
export const tim = timConfig(store);
