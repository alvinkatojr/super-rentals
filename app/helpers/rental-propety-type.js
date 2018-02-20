import { helper } from '@ember/component/helper';

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

export default helper(rentalPropetyType);
