// import * as util from '@/util';

import {getUrlKey} from '@/util/helper'
import Vue from 'vue';
import vStore from '../store';
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';

const themeType = getUrlKey('theme')  ||  'themeA';

if(themeType === 'themeA') {
    // require('./themeA.js');
    
    require.ensure([], function(require){
        require('./themeA.js');
        vStore.dispatch('editor/registerComponent', true)
    }, 'themeA'); 
} else  {
    // require('./themeB.js');
    
   require.ensure([], function(require){
       require('./themeB.js');
       vStore.dispatch('editor/registerComponent', true)
    }, 'themeB');
}