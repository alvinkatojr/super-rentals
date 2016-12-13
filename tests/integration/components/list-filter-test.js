import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';
import RSVP from 'rsvp';

moduleForComponent('list-filter', 'Integration | Component | list filter', {
  integration: true
});

const ITEMS = [{city: 'San Francisco'}, {city: 'Portland'}, {city: 'Seattle'}];
const FILTERED = [{city: 'San Francisco'}];

test('should initially load all listings', function(assert) {
  this.on('filterByCity', (val) => {
    if (val === ''){
      return RSVP.resolve(ITEMS);
    } else {
      return RSVP.resolve(FILTERED_ITEMS);
    }
  });
  
  this.render(hbs`{{list-filter}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#list-filter}}
      template block text
    {{/list-filter}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
