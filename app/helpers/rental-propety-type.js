import Ember from 'ember';

const communityPropetyTypes = [
	'Condo',
	'Townhouse',
	'Apartment'
];

export function rentalPropetyType(params/*, hash*/) {
  return params;
}

export default Ember.Helper.helper(rentalPropetyType);
