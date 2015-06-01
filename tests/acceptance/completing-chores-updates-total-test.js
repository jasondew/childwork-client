import Ember from "ember";
import {
  module,
  test
} from "qunit";
import startApp from "childwork-client/tests/helpers/start-app";

var application;

module("Acceptance: CompletingChoresUpdatesTotal", {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, "destroy");
  }
});

test("completing chores updates total", function(assert) {
  $.mockjax({
      url: "/chores",
      responseText: {chores: [{id: 1, name: "Dishes", rate: 2}]}
  });

  visit("/week");
  click("button");

  andThen(function() {
    assert.equal(find("#total-income").text(), "Total Income: $8");
  });
});
