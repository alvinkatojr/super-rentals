import Ember from 'ember';

const google = window.google;

export default Ember.Object.extend({

  init(){
    this.set('geocoder', new google.maps.GeoCoder());
  },

  createMap(element, location){
    let map = new google.maps.Map(element, { scrollwheel: false, zoom: 10 })
    this.pinLocation(location, map);
    return map;
  },

});
