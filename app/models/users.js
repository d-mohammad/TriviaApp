import DS from 'ember-data';

export default DS.Model.extend({
  ident:DS.attr('string'),
  name: DS.attr('string'),
  emailAddress: DS.attr('string'),
  password: DS.attr('string'),
  score: DS.attr('number')
});
