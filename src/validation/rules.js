import {ValidationRules} from 'aurelia-validation';
import moment from 'moment';

ValidationRules.customRule(
	'phoneNumberContent',
	(value, obj) => {
		if (value) {
			return !value.replace(/[0-9 ()+]/g, '');
		}
		return true;
	},
	'${$displayName} is not a valid phone number.'
);

ValidationRules.customRule(
	'SSN',
	(value, obj) => {
		if (value) {
			value = value.replace(/\s/g, '');
			return value.length == 11
				&& /[1-6][0-9]{2}[1,2][0-9][0-9]{2}[0-9]{4}/.test(value);
		}
		
		return true;
	},
	'${$displayName} is not a valid SSN.'
);

ValidationRules.customRule(
	'currency',
	(value, obj) => {
		if (value) {
			value = value.replace(',', '.');
			if (!value.match(/^\d*(\.\d+)?$/)) {
				return false;
			}
			value = parseFloat(value);
			return !isNaN(value);
		}
		
		return true;
	},
	'${$displayName} is not a valid amount.'
);

ValidationRules.customRule(
	'year',
	(value, obj) => {
		if (value) {
			value = value.trim();
			if (value.match(/^\d\d\d\d$/)) {
				value = parseInt(value);
				return (value >= 1900) && (value <= new Date().getFullYear());
			}

			return false;
		}
		
		return true;
	},
	'${$displayName} is not a valid year.'
);

ValidationRules.customRule(
	'time24h',
	(value, obj) => {
		if (value) {
			let timeRgx = /^(\d\d):(\d\d)$/;
			if (value.match(timeRgx)) {
				let matches = timeRgx.exec(value);
				let hours = parseInt(matches[1]);
				let minutes = parseInt(matches[2]);
				
				return -1 < hours && hours < 24 && 
					-1 < minutes && minutes < 60;
			}
			
			return false;
		}
		
		return true;
	},
	'${$displayName} is not a valid year.'
);

ValidationRules.customRule(
	'dateEET',
	(value, obj) => {
		if (value) {
			let dateRgx = /^(\d\d)\/(\d\d)\/(\d\d\d\d)$/;
			if (value.match(dateRgx)) {
				return checkDateFormat(value, "DD/MM/YYYY");
			}
			
			return false;
		}
		
		return true;
	},
	'${$displayName} is not a valid date.'
);

ValidationRules.customRule(
	'isTruthy',
	(value, obj) => {
		return value ? true : false;
	},
	'${$displayName} must hold.'
);

function checkDateFormat(checkDate, dateFmt) {
	return moment(checkDate, dateFmt)
		.format(dateFmt) === checkDate;
}