import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

let StubMapsService = Ember.Service.extend({
  getMapElement(location){
    this.set('calledWithLocation', location);
    // We create a div here to sumulate our maps service.
    // which will create and then cache the map element
    return document.createElement('div');
  }
});

moduleForComponent('location-map', 'Integration | Component | location map', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{location-map}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#location-map}}
      template block text
    {{/location-map}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
