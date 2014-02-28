// This pattern has serialization issues
// http://stijndewitt.wordpress.com/2014/01/26/enums-in-javascript/

/*

var DPA_GENDER = 
{
	MALE: { name: 'Male', value: 0, points_value: 8 },
	FEMALE_NOT_BREASTFEEDING: { name: 'Female Not Breastfeeding', value: 1, points_value: 2 },
	FEMALE_BREASTFEEDING: { name: 'Female Breastfeeding', value: 2, points_value: 12 }
};

var DPA_HEIGHT = 
{
	SHORT { name: 'Under 5\’1', value: 0, points_value: 0 },
	MEDIUM { name: '5\’1 - 5\’10', value: 1, points_value: 1 },
	TALL { name: 'Over 5\’10', value: 2, points_value: 2 }
};

var DPA_ACTIVITY_LEVEL = 
{
	SITTING_DOWN: { name: 'Sitting Down', value: 0, points_value: 0 },
	OCCASIONALLY_SITTING: { name: 'Occasionally sitting', value: 1, points_value: 2 },
	MOSTLY_WALKING: { name: 'Walking most of the time', value: 2, points_value: 4 },
	PHYSICAL_HARD_WORK: { name: 'Doing physically hard work most of the time', value: 3, points_value: 6 }
};

var Gender;
(function (Gender) {
    Gender[Gender["Select"] = 0] = "Select";
    Gender[Gender["Male"] = 1] = "Male";
    Gender[Gender["Female_Not_Breastfeeding"] = 2] = "Female Not Breastfeeding";
    Gender[Gender["Female_Breastfeeding"] = 3] = "Female Breastfeeding";
})(Gender || (Gender= {}));

var Height;
(function (Height) {
    Height[Height["Select"] = 0] = "Select";
    Height[Height["Shortest"] = 1] = "Under 5’ 1";
    Height[Height["Middle"] = 2] = "5’ 1 - 5’ 10";
    Height[Height["Tallest"] = 3] = "Over 5’ 10";
})(Height || (Height= {}));

var Activity_Level;
(function (Activity_Level) {
    Activity_Level[Activity_Level["Select"] = 0] = "Select";
    Activity_Level[Activity_Level["Sitting_Down"] = 1] = "Sitting Down";
    Activity_Level[Activity_Level["Occasionally_Sitting"] = 2] = "Occasionally sitting";
    Activity_Level[Activity_Level["Mostly_Walking"] = 3] = "Walking most of the time";
    Activity_Level[Activity_Level["Physical_Hard_Work"] = 4] = "Doing physically hard work most of the time";
})(Activity_Level || (Activity_Level= {}));

var Age;
(function (Age) {
    Age[Age["Select"] = 0] = "Select";
    Age[Age["17-26"] = 1] = "17 - 26";
    Age[Age["27-37"] = 2] = "27 - 37";
    Age[Age["38-47"] = 3] = "38 - 47";
    Age[Age["48-58"] = 4] = "48 - 58";
    Age[Age["Over58"] = 5] = "Over 58";
})(Age || (Age= {}));

*/

// Gender Values
var GENDER_MALE = 1;
var GENDER_FEMALE_NOT_BREASTFEEDING = 2;
var GENDER_FEMALE_BREASTFEEDING = 3;

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

// Breastfeeding Values
var NOT_BREASTFEEDING = 1;
var SUPPLEMENTALLY_BREASTFEEDING = 2;
var EXCLUSIVELY_BREASTFEEDING = 3;

function CalculateClassicDPA(gender, age, weight, height, activity_level)
{
	var dpa = 0;

	// Add points for gender
	if (gender == GENDER_MALE) dpa += 8;
    	else if (gender == GENDER_FEMALE_NOT_BREASTFEEDING) dpa += 2;
    	else if (gender == GENDER_FEMALE_BREASTFEEDING) dpa += 12;
	else
	{
		alert('Gender ' + gender + ' is invalid. ');
		return;
	}	

	// Add points for age
	if (age == AGE_BETWEEN_17_AND_26) dpa += 4;
	else if (age == AGE_BETWEEN_27_AND_37) dpa += 3;
	else if (age == AGE_BETWEEN_38_AND_47) dpa += 2;
	else if (age == AGE_BETWEEN_48_AND_58 || age == AGE_OVER_58) dpa += 1;
	else
	{
		alert('Age ' + age + ' is invalid');
		return;
	}

	// Add points for weight
	dpa += parseInt(weight.toString().substring(0, 2));

	// Add points for height
	if (height == HEIGHT_BETWEEN_5_1_AND_5_10) dpa += 1;
	else if (height == HEIGHT_OVER_5_10) dpa += 2;

	// Add points for activity level
	if (activity_level == OCCASIONALLY_SITTING) dpa += 2;
	else if (activity_level == MOSTLY_WALKING) dpa += 4;
	else if (activity_level == MOSTLY_PHYSICAL_HARD_WORK) dpa += 6;

	return dpa;
}

        function CalculateWWPlusDailyTargetScoreForFemale(age, weight, height, breastFeeding)
        {
            var TEE = 387 - (7.31 * age);
            TEE += 1.14 * ((10.9 * weight) + (660.7 * height));
            TEE = ((TEE * .9) + 200) - 1000;
            if (TEE < 1000) TEE = 1000; 
            TEE = Math.Round(TEE / 35) - 11;
            if (TEE < 26) TEE = 26;
            if (TEE > 71) TEE = 71;

            if (breastFeeding == SUPPLEMENTALLY_BREASTFEEDING) TEE += 7;
            else if (breastFeeding == EXCLUSIVELY_BREASTFEEDING) TEE += 14;

	    return TEE;
            //return Convert.ToInt32(TEE);
        }

        function CalculateWWPlusDailyTargetScoreForMale(age, dweight, height)
        {
            var TEE = 864 - (9.72 * age);
            TEE += 1.12 * ((14.2 * weight) + (503 * height));
            TEE = ((TEE * .9) + 200) - 1000;
            if (TEE < 1000) TEE = 1000;
            TEE = Math.Round(TEE / 35) - 11;
            if (TEE < 29) TEE = 29;

	    return TEE;
            //return Convert.ToInt32(TEE);
        }