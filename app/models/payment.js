import DS from "ember-data";

export default DS.Model.extend({
  week: DS.attr("number"),
  year: DS.attr("number"),
  amount: DS.attr("number"),
});
