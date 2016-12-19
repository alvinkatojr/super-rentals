import Ember from 'ember';
import MapUtil from '../utils/google-maps';

export default Ember.Service.extend({

  init(){
    if (!this.get('cachedMaps')){
      this.set('cachedMaps', Ember.Object.create());
    }
    if (!this.get('mapUtil')){
      this.set('mapUtil', MapUtil.create());
    }
  },
});
