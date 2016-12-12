import Ember from 'ember';

const communityPropetyTypes = [
	'Condo',
	'Townhouse',
	'Apartment'
];

export function rentalPropetyType([type]/*, hash*/) {
	if (communityPropetyTypes.includes(type)){
		return 'Community';
  	}

	return 'Standalone';
}

export default Ember.Helper.helper(rentalPropetyType);
