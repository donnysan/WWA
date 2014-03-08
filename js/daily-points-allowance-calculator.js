
// Gender Values
var GENDER_MALE = 1;
var GENDER_FEMALE_NOT_BREASTFEEDING = 2;
var GENDER_FEMALE_SUPPLEMENTALLY_BREASTFEEDING = 3;
var GENDER_FEMALE_EXCLUSIVELY_BREASTFEEDING = 4;

// Height Values
var HEIGHT_UNDER_5_1 = 1;
var HEIGHT_BETWEEN_5_1_AND_5_10 = 2;
var HEIGHT_OVER_5_10 = 3;

// Age Values
var AGE_BETWEEN_17_AND_26 = 1;
var AGE_BETWEEN_27_AND_37 = 2;
var AGE_BETWEEN_38_AND_47 = 3;
var AGE_BETWEEN_48_AND_58 = 4;
var AGE_OVER_58 = 5;

// Activity Level Values
var SITTING_DOWN = 1;
var OCCASIONALLY_SITTING = 2;
var MOSTLY_WALKING = 3;
var MOSTLY_PHYSICAL_HARD_WORK = 4;

function CalculateClassicDPA(gender, age, weight, height, activity_level)
{
	var dpa = 0;

	// Add points for gender
	if (gender == GENDER_MALE) dpa += 8;
    	else if (gender == GENDER_FEMALE_NOT_BREASTFEEDING) dpa += 2;
    	else if (gender == GENDER_FEMALE_SUPPLEMENTALLY_BREASTFEEDING || gender == GENDER_FEMALE_EXCLUSIVELY_BREASTFEEDING) dpa += 12;
	else
	{
		alert('Gender ' + gender + ' is invalid. ');
		return;
	}	

	// Add points for age
	if (age <= 26) dpa += 4;
	else if (age >= 27 && age <= 37) dpa += 3;
	else if (age >= 38 && age <= 47) dpa += 2;
	else dpa += 1;

	// Add points for weight
	dpa += parseInt(weight.toString().substring(0, 2));

	// Add points for height
	if (height >= 61 && height <= 70) dpa += 1;
	else if (height > 70) dpa += 2;

	// Add points for activity level
	if (activity_level == OCCASIONALLY_SITTING) dpa += 2;
	else if (activity_level == MOSTLY_WALKING) dpa += 4;
	else if (activity_level == MOSTLY_PHYSICAL_HARD_WORK) dpa += 6;

	return dpa;
}

var WEIGHT_SCALAR = 0.45359237;
var HEIGHT_SCALAR = 0.0254;

/*

http://easycalculation.com/health/Daily-points-plus-allowance.php

Formula Used:
DPm = Min{ Max{round[ ((ht-48)/2.25) + (wt×0.1834) - ((age-17)/4) ], 29} , 71} 
DPf = Min{ Max{round[ ((ht-48)/2) + (wt×0.1461) - ((age-21)/5) - 5 ], 29} , 71} 

Where, 
      DPm and DPf are the daily points for male and female respectively.
      ht - Height
      wt - weight
*/
function CalculateWWPlusDailyTargetScoreForFemale(age, weight, height, breastFeeding)
{
	weight *= WEIGHT_SCALAR;	
	height *= HEIGHT_SCALAR;

        var dpa = 387 - (7.31 * age);
        dpa += 1.14 * ((10.9 * weight) + (660.7 * height));
        dpa = ((dpa * .9) + 200) - 1000;
        if (dpa < 1000) dpa = 1000; 
        dpa = Math.round(dpa / 35) - 11;
        if (dpa < 26) dpa = 26;
        if (dpa > 71) dpa = 71;

        if (breastFeeding == GENDER_FEMALE_SUPPLEMENTALLY_BREASTFEEDING) dpa += 7;
        else if (breastFeeding == GENDER_FEMALE_EXCLUSIVELY_BREASTFEEDING) dpa += 14;

	return dpa;
}
function CalculateWWPlusDailyTargetScoreForMale(age, weight, height)
{
	weight *= WEIGHT_SCALAR;	
	height *= HEIGHT_SCALAR;

        var dpa = 864 - (9.72 * age);
        dpa += 1.12 * ((14.2 * weight) + (503 * height));
        dpa = ((dpa * .9) + 200) - 1000;
        if (dpa < 1000) dpa = 1000;
        dpa = Math.round(dpa / 35) - 11;
        if (dpa < 29) dpa = 29;

	return dpa;
}