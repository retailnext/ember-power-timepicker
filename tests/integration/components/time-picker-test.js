import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { notEmpty, and } from '@ember/object/computed';
import { isEmpty } from '@ember/utils';

moduleForComponent('time-picker', 'Integration | Component | time picker', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{time-picker}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#time-picker}}
      template block text
    {{/time-picker}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});

test('it doesn\'t call "onchange" during the initial render', function(assert) {
  this.set('selectedTime', undefined);
  this.set('hasContent', notEmpty('selectedTime'));

  // lostFocus is always false
  this.set('lostFocus', false);

  // noError is also always false but triggers 'propertyChanged' event when 'defaultTimeToNow' logic executes
  this.set('noError', and('hasContent', 'lostFocus'));
  this.set('onchange', function(dateTime) {
    this.set('selectedTime', dateTime);
  });

  this.render(hbs`
    <div no-error="{{noError}}">
      {{time-picker onchange=(action onchange)}}
    </div>
  `);

  assert.notOk(isEmpty(this.get('selectedTime')));
});
