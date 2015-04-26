import DS from 'ember-data';

export default DS.Model.extend({
  chore: DS.belongsTo("chore"),
  completed_on: DS.attr("datestamp"),
});
