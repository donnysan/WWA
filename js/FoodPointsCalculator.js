var WHOLE_NUMBER = 0;
var TENTH_POINT = 1;
var HALF_POINT = 2;

function  calculateFoodPointsPlus(fat, carbs, fiber, protein, precision)
{
	fat = parseFloat(fat);
	carbs = parseFloat(carbs);
	fiber = parseFloat(fiber);
	protein = parseFloat(protein);	

	var points = 0;

	if (precision == TENTH_POINT)     points = Math.round( ( (protein / 10.94) + (carbs / 9.17) + (fat / 3.89) - (fiber / 12.49) ) * 10 ) / 10;	
	else if (precision == HALF_POINT) points = Math.round( ( (protein / 10.94) + (carbs / 9.17) + (fat / 3.89) - (fiber / 12.49) ) * 2 ) / 2;
	else                              points = Math.round( (protein / 10.94) + (carbs / 9.17) + (fat / 3.89) - (fiber / 12.49) );

 	return points;
}

function calculateFoodPointsClassic(calories, fat, fiber, precision)
{
	calories = parseFloat(calories);
	fat = parseFloat(fat);
	fiber = parseFloat(fiber);

	var points = 0;

	if (precision == TENTH_POINT)     points = Math.round( ( (calories / 50) + (fat / 12) - (fiber / 5) ) * 10) / 10;
	else if (precision == HALF_POINT) points = Math.round( ( (calories / 50) + (fat / 12) - (fiber / 5) ) * 2) / 2;
	else                              points = Math.round( (calories / 50) + (fat / 12) - (fiber / 5) );

 	return points;
}
