// Import from sub-modules
import * as Client from './client';
import * as Messages from './messages';
import * as Templates from './templates';
import * as Flows from './flows';
import * as Filters from './filters';
import * as Handlers from './handlers';
import * as Listeners from './listeners';
import * as Utils from './utils';
import * as WaBAPITypes from './types';

// Default export
export default {
    ...Client,...Messages,...Templates,...Flows,
    ...Filters,...Handlers,...Listeners,...Utils,WaBAPITypes
}