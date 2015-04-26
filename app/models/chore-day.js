import DS from 'ember-data';

export default DS.Model.extend({
  chore: DS.belongsTo("chore"),
  date: DS.attr("datestamp"),
  complete: DS.attr("boolean"),
});
