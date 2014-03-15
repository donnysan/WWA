var plusSystem = false;
var CALCULATOR_PRECISION = -1;

var calculationResultId = '#h-calculated-points';
var calculatorFormId = '#frm-calculator';

$(document).ready(function() 
{  
	// Initialize numeric keypad data input for text boxes
	$('#txt-fats-plus, #txt-protein-plus, #txt-carbs-plus, #txt-fiber-plus, #txt-fats-classic, #txt-fiber-classic, #txt-calories-classic').keypad(
	{
		prompt: '', closeText: 'OK', clearText: '<<', backText: '<', 
		onKeypress: FoodPointsKeyPress,
		onClose: CalculateFoodPoints,
		layout: ['123' + $.keypad.CLOSE, '456' + $.keypad.BACK, '789' + $.keypad.CLEAR, '0']
	});
	function FoodPointsKeyPress()
	{ 		
		// Workaround to assign max length constraint to field.  Max attribute is being used for an inintended purpose.
		// Whatever the string length is of the assigned this.max.length value is the maximum allowable field length.
		var max_length = this.max != '' ? this.max.length : 9007199254740992;

		if (this.value.length > max_length) this.value = this.value.substring(0, max_length);
	}
	function CalculateFoodPoints()
	{
		if ($(calculatorFormId).valid()) 
		{
			if (plusSystem)
			{

				var fats = $("#txt-fats-plus").val();
				var carbs = $("#txt-carbs-plus").val();
				var fiber = $("#txt-fiber-plus").val();
				var protein = $("#txt-protein-plus").val();

				// alert('fats = ' + fats + ' carbs = ' + carbs + 'fiber = ' + fiber + ' protein = ' + protein);
 				var result = calculateFoodPointsPlus(fats, carbs, fiber, protein, CALCULATOR_PRECISION);
				$(calculationResultId).text(result);
			}
			else
			{
				var calories = $("#txt-calories-classic").val();
				var fats = $("#txt-fats-classic").val();
				var fiber = $("#txt-fiber-classic").val();

				// alert('calories = ' + calories + ' fats = ' + fats + 'fiber = ' + fiber);
				var result = calculateFoodPointsClassic(calories, fats, fiber, CALCULATOR_PRECISION);
				$(calculationResultId).text(result);
			}
		}
		else $(calculationResultId).text('Please enter above values...');
	}	

	// Event handler for selecting point system for doing food points calculations
	$("#select-calculator-points-system").bind('change', function(event, ui) 
	{	
		var selectedIndex = $(this).val();
		if (selectedIndex == 1)
		{
			plusSystem = false;

			$('#div-calculator-classic').show();
			$('#div-calculator-plus').hide();

			CalculateFoodPoints();
		}
		else if (selectedIndex == 2)
		{
			plusSystem = true;

			$('#div-calculator-plus').show();
			$('#div-calculator-classic').hide();

			CalculateFoodPoints();
		}	
	});	
});

$(document).on('pageshow', '#calculator-page', function (event, ui) 
{
	alert('calculator show');

	CALCULATOR_PRECISION = WHOLE_NUMBER;

	var myselect = $("select#select-calculator-points-system");

	if (plusSystem)
	{
		myselect[0].selectedIndex = 2;

		$('#div-calculator-plus').show();
		$('#div-calculator-classic').hide();
	}
	else
	{
		myselect[0].selectedIndex = 1;

		$('#div-calculator-classic').show();
		$('#div-calculator-plus').hide();
	}

	myselect.selectmenu("refresh");
});