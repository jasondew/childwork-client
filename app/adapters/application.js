import Ember from "ember";
import DS from "ember-data";
import ENV from "../config/environment";

export default DS.RESTAdapter.extend({
  host: ENV.APP.API,
  pathForType: function(type) {
    var underscored = Ember.String.underscore(type);
    return Ember.String.pluralize(underscored);
  },
});
