import Ember from "ember";
import DS from "ember-data";

export default DS.RESTAdapter.extend({
  host: "http://chore-chart-api.dev",
  pathForType: function(type) {
    var underscored = Ember.String.underscore(type);
    return Ember.String.pluralize(underscored);
  },
});
