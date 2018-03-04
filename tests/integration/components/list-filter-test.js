import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';
import RSVP from 'rsvp';

const ITEMS = [{ city: 'San Francisco' }, { city: 'Portland' }, { city: 'Seattle' }];
const FILTERED_ITEMS = [{ city: 'San Francisco' }];

module('Integration | Component | list-filter', function(hooks) {
  setupRenderingTest(hooks);

  test('it should initially load all listings', async function(assert){
    // We want our actions to return promises,
    // since they are potentially fetching data asynchronously
    this.set('filterByCity', () => {
      return RSVP.resolve({ results: ITEMS });
    });

    await render(hbs`
      {{#list-filter filter=(action 'filterByCity') as |results|}}
        <ul>
        {{#each results as |item|}}
          <li class="city">
            {{item.city}}
          </li>
        {{/each}}
        </ul>
      {{/list-filter}}
    `);

    return wait().then(() => {
      assert.equal(this.$('.city').length, 3);
      assert.equal(this.$('.city').first().textContent().trim(), 'San Francisco');
    });
  });

  test('should update with matching listings', async function(assert){
    this.set('filterByCity', (val) => {
      if (val === ''){
        return RSVP.resolve({
          query: val,
          results: ITEMS
        });
      } else {
        return RSVP.resolve({
          query: val,
          results: FILTERED_ITEMS
        });
      }
    });

    await render(hbs`
      {{#list-filter filter=(action 'filterByCity') as |results|}}
        <ul>
        {{#each results as |item|}}
          <li class="city">
            {{item.city}}
          </li>
        {{/each}}
        </ul>
      {{/list-filter}}
    `);

    // The keyup event here should invoke an action that will cause the list to be filtered
    this.$('.list-filter input').value('San').keyup();

    return wait().then(() => {
      assert.equal(this.$('city').length, 1);
      assert.equal(this.$('.city').textContent().trim(), 'San Francisco');
    });
  });

  test('should filter the list of rentals by city.', function(assert){
    visit('/');
    fillIn('.list-filter input', 'Seattle');
    keyEvent('.list-filter input', 'keyup', 69);
    andThen(function(){
      assert.equal(find('.listing').length, 1, 'should show 1 listing');
      assert.equal(find('.listing .location:contains("Seattle")').length, 1, 'should contain 1 listing with location Seattle');
    });
  });
});
