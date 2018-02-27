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

  test('it should initially load all listings', function(assert){
    // We want our actions to return promises,
    // since they are potentially fetching data asynchronously
    this.on('filterByCity', () => {
      return RSVP.resolve({ results: ITEMS });
    });

    this.render(hbs`
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
      assert.equal(this.$('.city').first().text().trim(), 'San Francisco');
    });
  });

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`{{list-filter}}`);

    assert.equal(this.element.textContent.trim(), '');

    // Template block usage:
    await render(hbs`
      {{#list-filter}}
        template block text
      {{/list-filter}}
    `);

    assert.equal(this.element.textContent.trim(), 'template block text');
  });
});
