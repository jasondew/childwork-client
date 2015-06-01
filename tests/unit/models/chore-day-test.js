import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('chore-day', {
  // Specify the other units that are required for this test.
  needs: ["chore"]
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
