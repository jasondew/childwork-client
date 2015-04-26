/* global moment:true */
import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    return serialized ? moment(serialized) : null;
  },

  serialize: function(deserialized) {
    return deserialized ? moment(deserialized).format('YYYY-MM-DD') : null;
  }
});
