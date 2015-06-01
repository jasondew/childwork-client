import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('completed-chore', {
  // Specify the other units that are required for this test.
  needs: ["chore"]
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
