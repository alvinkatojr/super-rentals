import Ember from 'ember';

const google = window.google;

export default Ember.Object.extend({

  init(){
    this.set('geocoder', new google.maps.GeoCoder());
  },

});
