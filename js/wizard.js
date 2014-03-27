var page1Id = '#page1-unit-settings';
var page2Id = '#page2-weight-goal-settings';
var page3Id = '#page3-dpa-settings';
var page4Id = '#page4-wpa-settings';
var page5Id = '#page5-actvity-settings';

var frmDPAId = '#frm-daily-points-settings';

var selectPointSystemId = '#select-point-system';
var selectGenderId = '#select-gender';
var selectActivityLevelId = '#select-activity-level';
var selectUnitSystemId = '#select-unit-system';
var selectPrecisionId = '#select-calculator-precision';
var selectRolloverDayId = '#select-rollover-day';
var selectAccumFreqId = '#select-accumulation-frequency';
var selectRoundPrecId = '#select-rounding-precision';
var selectCalcById = '#select-calculate-by';

var txtDobId = '#txt-dob';
var txtHeightFtId = '#txt-height-ft';
var txtHeightInId = '#txt-height-in';
var txtWeightId = '#txt-weight';
var txtGoalWeightId = '#txt-goal-weight';
var txtFixedDPAID = '#txt-fixed-dpa';
var txtWPACountId = '#txt-wpa-count';

var ckFixedDPAID = '#ck-fixed-value';
var ckEnableWeeklyDPA = '#ck-enable-weekly-points';

var weightGoalDateId = '#weight-goal-date';

var calculatedDPAResult = '#h3-calculated-dpa';

$(document).ready(function() 
{   
	var CLASSIC_POINTS_SYSTEM = 1;
	var PLUS_POINTS_SYSTEM = 2;

	// Helper function for hiding the previously selected page and showing the currently selected page
	function UpdatePageVisibility(fromPage, toPage)
	{
        	$(fromPage).hide();
        	$(toPage).show();		
		setHeaderText(toPage, true);
	}

	// Page 1 > Page 2
	$(page1Id + ' a.next').on('click', function () 
	{
		// Validate this page
		if ($("#frm-unit-settings").valid())		
			UpdatePageVisibility(page1Id, page2Id);

		// Initialize the next page
		var user = GetLocalUser();
		if (user != null && user.weightGoal != null) initWeightGoalPage(user.weightGoal);			
	});

	// Page 2 > Page 3
	$(page2Id + ' a.next').on('click', function () 
	{
		// Validate this page
		if ($("#frm-weight-goal-settings").valid())
			UpdatePageVisibility(page2Id, page3Id);	

		// Initialize the next page
		var user = GetLocalUser();
		if (user != null && user.DPA != null) 
		{
			initDPASettingsPage(user.DPA);
			selectPointSystemChange();
		}

	});

	// Page 3 > Page 4
	$(page3Id + ' a.next').on('click', function () 
	{
		// Validate this page
		if ($(frmDPAId).valid()) 
			UpdatePageVisibility( page3Id, page4Id );	

		// Initialize the next page
		var user = GetLocalUser();
		if (user != null && user.WPA != null) 
		{
			initWPAInputSettingsPage(user.WPA);
			ShowHideWPAFields();
		}
	});

	// Page 4 > Page 5
	$(page4Id + ' a.next').on('click', function () 
	{
		// Validate this page
		if ($("#frm-weekly-points-settings").valid()) 
			UpdatePageVisibility( page4Id, page5Id );	

		// Initialize the next page
		var user = GetLocalUser();
		if (user != null && user.activity != null) 
			initActivitySettingsPage(user.activity);
	});

	// Page 5 > Finish  
	$(page5Id + ' a.finish').on('click', function () 
	{
		// Validate this page
		if ($("#frm-activity-settings").valid()) 
			Finish();
	});

	// Page 5 > Page 4
	$(page5Id + ' a.prev').on('click', function () 
	{
		UpdatePageVisibility( page5Id, page4Id );	
	});

	// Page 4  > Page 3
	$(page4Id + ' a.prev').on('click', function () 
	{				
		UpdatePageVisibility(page4Id, page3Id)	
	});

	// ( Page 3 > Page 2
	$(page3Id + ' a.prev').on('click', function () 
	{
		UpdatePageVisibility(page3Id, page2Id)
	});

	// Page 2 > Page 1
	$(page2Id + ' a.prev').on('click', function () 
	{
		UpdatePageVisibility(page2Id, page1Id);
	});

	function Save()
	{
		var units = getUnitInputSettings();
		var weightGoal = getWeightGoalInputSettings(); 		
		var dpa = getDPAInputSettings();	
		var wpa = getWPAInputSettings();
		var activity = getActivityInputSettings();
		
		var userObj = new UserObject(units, weightGoal, dpa, wpa, activity);

		// Store the newly created user locally	
		SaveUser(userObj);	
	}

	// Called once the user has entered all valid setup wizard parameter values
	function Finish()
	{			
		Save();

		// Setup initialization is complete.  So stop the home page redirect to the setup wizard.
		setInitFlag(true);

		// Go back to the home page
		window.location.replace("index.html");
	}

	// Initialize numeric keypad data input for text boxes
	$(txtGoalWeightId + ', ' + txtFixedDPAID + ', ' + txtWPACountId).keypad(
	{
		prompt: '', closeText: 'OK', clearText: '<<', backText: '<', 
		onKeypress: KeyPress,
		onClose: CloseAndSave,
		layout: ['123' + $.keypad.CLOSE, '456' + $.keypad.BACK, '789' + $.keypad.CLEAR, '0']
	});
	$(txtWeightId + ', ' + txtHeightFtId + ', ' + txtHeightInId).keypad(
	{
		prompt: '', closeText: 'OK', clearText: '<<', backText: '<', 
		onKeypress: KeyPress,
		onClose: CloseCalculateAndSave,
		layout: ['123' + $.keypad.CLOSE, '456' + $.keypad.BACK, '789' + $.keypad.CLEAR, '0']
	});

	// This function enforces max length constraint on text boxes that use numeric keypad data input
	function KeyPress() 
	{ 		
		// Workaround to assign max length constraint to field.  Max attribute is being used for an inintended purpose.
		// Whatever the string length is of the assigned this.max.length value is the maximum allowable field length.
		var max_length = this.max != '' ? this.max.length : 9007199254740992;

		if (this.value.length > max_length) this.value = this.value.substring(0, max_length);
	}	

	function CloseCalculateAndSave()
	{
		CalculateDPA();
		Save();
	}			

	function CloseAndSave()
	{
		Save();
	}

	function ShowHideDPAFields()
	{
		var useFixedValue = $(ckFixedDPAID).is(':checked');
		if(useFixedValue) 
		{
			$('#div-dpa-fixed-fields').show();
			$('#div-calculated-dpa, #div-dpa-calculation-fields').hide();
		}
		else
		{
			$('#div-calculated-dpa, #div-dpa-calculation-fields').show();
			$('#div-dpa-fixed-fields').hide();
				
			CalculateDPA();
		}
	}

	function ShowHideWPAFields()
	{
		var checked = $(ckEnableWeeklyDPA).is(':checked');
		if (checked) $('#div-wpa-count').show();
		else $('#div-wpa-count').hide();
	}	

	// Event handler for selecting unit system 
	$(selectUnitSystemId).bind('change', function(event, ui) 
	{
		Save();		
	});

	// Event handler for selecting calcualtor precision
	$(selectPrecisionId).bind('change', function(event, ui) 
	{
		Save();
	});

	// Event handler for changing weight goal date
	$(weightGoalDateId).bind('change', function(event, ui) 
	{
		Save();	
	});

	// Event handler for changing date of birth
	$(txtDobId).bind('change', function(event, ui) 
	{
		calculateDPA();	
		Save();
	});

	// Event handler for selecting whether daily points plus allowance is calculated or entered manually
	$(ckFixedDPAID).bind('change', function(e) 
	{
		// Doesn't work in internet explorer 8		
		e.stopPropagation(); // to prevent event from bubbling up

		ShowHideDPAFields();	
		Save();
	});

	// Event handler for selecting whether weekly points allowance is enabled
	$(ckEnableWeeklyDPA).on('change', function(e) 
	{
		// Doesn't work in internet explorer 8		
		e.stopPropagation(); // to prevent event from bubbling up

		ShowHideWPAFields();
		Save();
  	});

	function selectPointSystemChange()
	{
		var selectedPointsSystem = $(selectPointSystemId).val();
		// The Classic System or the Plus System was selected
		if (selectedPointsSystem == CLASSIC_POINTS_SYSTEM || selectedPointsSystem == PLUS_POINTS_SYSTEM)
		{
			// This setting only applies to the classic points system
			if (selectedPointsSystem == CLASSIC_POINTS_SYSTEM) $('#div-activity-level').show();
			else if (selectedPointsSystem == PLUS_POINTS_SYSTEM) $('#div-activity-level').hide();

			$('#tr-select-fixed-dpa').show();
			ShowHideDPAFields();	
		}
	}

	// Event handler for selecting point system
	$(selectPointSystemId).bind('change', function(event, ui) 
	{	
		selectPointSystemChange();
		Save();
	}); 

	//Event handler for selecting gender 
	$(selectGenderId).bind('change', function(event, ui) 
	{
		var selectedIndex = $(this).val();
		
		// If 'Female' is selected show the Breastfeeding Drop Down List
		//if (selectedIndex == 0 || selectedIndex == 1) $('#div-breastfeeding-mom').hide();
		//else if (selectedIndex == 2) $('#div-breastfeeding-mom').show();
		
		CalculateDPA();
		Save();
	});

	// Event handler for selecting breastfeeding status
	$("#select-breastfeeding").bind('change', function(event, ui) 
	{		
		CalculateDPA();
		Save();
	});			

	// Event handler for selecting activity level 
	$(selectActivityLevelId).bind('change', function(event, ui) 
	{		
		CalculateDPA();
		Save();
	});

	// Event handler for selecting rollover day 
	$(selectRolloverDayId ).bind('change', function(event, ui) 
	{		
		Save();
	});

	// Event handler for selecting WPA accumulation frequency 
	$(selectAccumFreqId ).bind('change', function(event, ui) 
	{		
		Save();
	});

	// Event handler for selecting WPA rounding precision 
	$(selectRoundPrecId ).bind('change', function(event, ui) 
	{		
		Save();
	});

	// Event handler for selecting WPA calculation method 
	$(selectCalcById ).bind('change', function(event, ui) 
	{		
		Save();
	});

	function CalculateDPA()
	{		
		if (!$(frmDPAId).valid()) 
		{
			$(calculatedDPAResult).text('Your Daily Points Allowance...');
			return;
		}

		var selected_gender = $(selectGenderId).find(":selected").val();	
		var age = getAge();
		var weight = $(txtWeightId).val();
		var feet = $(txtHeightFtId).val();
		var inches = $(txtHeightInId).val();
		//var selected_breastfeeding_status = $("#select-breastfeeding").val();	
		var selected_activity_level = $(selectActivityLevelId).val()

		var selectedPointsSystem = $(selectPointSystemId).find(":selected").val();
		
		weight = parseInt(weight);		
		var height = parseInt(feet) * 12 + parseInt(inches);	

		var dpa = 0;		
		if (selectedPointsSystem == CLASSIC_POINTS_SYSTEM)
		{
			// if (selected_gender == 2 && selected_breastfeeding_status >= 1) selected_gender = selected_breastfeeding_status;
			dpa = CalculateClassicDPA(selected_gender, age, weight, height, selected_activity_level);
			if (dpa != 0) 
			{
				$('#hf-calculated-dpa').val(dpa);
				$(calculatedDPAResult).text('Your Daily Points Allowance = ' + dpa);
			}
		}
		else if (selectedPointsSystem == PLUS_POINTS_SYSTEM)
		{
			if (selected_gender == 1) dpa = CalculateWWPlusDailyTargetScoreForMale(age, weight, height);
			else if (selected_gender >= 2) dpa = CalculateWWPlusDailyTargetScoreForFemale(age, weight, height, selected_gender);
			//else if (selected_gender == 2) dpa = CalculateWWPlusDailyTargetScoreForFemale(age, weight, height, selected_breastfeeding_status);
			if (dpa != 0) 
			{
				$('#hf-calculated-dpa').val(dpa);
				$(calculatedDPAResult).text('Your Daily Points Allowance = ' + dpa);
			}
		}		
	}
});

// Helper function to calculate the user's age from their date of birth
// BUG:  Need to calculate with month and day of month also
function getAge()
{
	var birth_year = 1900 + $(txtDobId).mobipick( "option", "date" ).getYear();
	var current_year = 1900 + new Date().getYear();
	var age = current_year - birth_year;
	return parseInt(age);
}
	
$(document).on('pagecreate',function()
{
	// Initialize DatePicker PlugIn
	var picker1 = $( weightGoalDateId, this );    
	picker1.mobipick( { intlStdDate: false, minDate: (new XDate()).addDays(0), maxDate: (new XDate()).addYears(5) } ); 
	var picker2 = $( txtDobId, this );
	picker2.mobipick( { intlStdDate: false, minDate: (new XDate()).addYears(-120), maxDate: (new XDate()).addYears(0) } ); 
	// picker2.mobipick( { minDate: (new XDate()).addYears(-120), maxDate: (new XDate()).addYears(0), dateFormat: "MM-dd-yyyy" } ); 

});
	
$(document).on('pageshow', '#wizard-page', function (event, ui) 
{
	var pageId = '';
    	var args = document.location.search.substring(1).split('&');		

    	if (args != '') 
    	{
		var kvp0 = args[0].split('=');
		pageId = "#" + kvp0[1];
		var kvp1 = args[1].split('=');
		var show_buttons = kvp1[1] == 'true';	
		showDiv(pageId, show_buttons);
    	}
   	else 
	{
		pageId = page1Id;
		showDiv(pageId, true);	
    	}

	var user = GetLocalUser();
	if (user == null) return;
	if (pageId == page1Id && user.units != null) initUnitSettingsPage(user.units);
	else if (pageId == page2Id && user.weightGoal != null) initWeightGoalPage(user.weightGoal);
	else if (pageId == page3Id && user.DPA != null) initDPASettingsPage(user.DPA);
	else if (pageId == page4Id && user.WPA != null) initWPAInputSettingsPage(user.WPA);
	else if (pageId == page5Id && user.activity != null) initActivitySettingsPage(user.activity);
		 
});	

// Retrieves the user's Unit Settings input from the page and returns the result in an object
function getUnitInputSettings()
{
	var unit_system = $(selectUnitSystemId).find(":selected").val(); 
	var precision = $(selectPrecisionId).find(":selected").val(); 

	return new UnitsObject(unit_system, precision);
}

// Updates the Unit Settings Page widget values with the user data in local storage
function initUnitSettingsPage(units)
{
	$(selectUnitSystemId).val(units.unitSystem).selectmenu('refresh');
	$(selectPrecisionId).val(units.calcPrecision).selectmenu('refresh');
}

// Retrieves the user's Weight Goal Settings input from the page and returns the result in an object
function getWeightGoalInputSettings()
{
	var weight = $(txtGoalWeightId).val();
	var date = $(weightGoalDateId).val();

	return new WeightGoalObject( weight, date );
}

function initWeightGoalPage(weight)
{
	$(txtGoalWeightId).val(weight.weightGoal);
	if (weight.goalDate != '') $( weightGoalDateId ).mobipick({ date: weight.goalDate });
}

// Read the user's Daily Input Allowance Settings input from the page and return the values in an object
function getDPAInputSettings()
{
	var point_system = $(selectPointSystemId).find(":selected").val();
	var useFixedDPA = $(ckFixedDPAID).is(':checked');
	var fixedDPAValue = $(txtFixedDPAID).val();

	var dob = $(txtDobId).val();

	var weight = parseInt($(txtWeightId).val()); 

	var height = null;
	if ($(txtHeightFtId).val() != '') height = parseInt($(txtHeightFtId).val()) * 12;
	if ($(txtHeightInId).val() != '') height += parseInt($(txtHeightInId).val());


	var gender = $(selectGenderId).find(":selected").val();  		
	var activity_level = $(selectActivityLevelId).find(":selected").val();  
	if (activity_level == '') activity_level = 0;
	
	alert('dob before save = ' + dob);

	return new DailyPointsAllowanceObject(point_system, useFixedDPA, fixedDPAValue, dob, weight, height, gender, activity_level)
}


// Updates the Daily Points Allowance Settings Page widget values with the user data in local storage
function initDPASettingsPage(dpa)
{
	$(selectPointSystemId).val(dpa.pointSystem).selectmenu('refresh');

	$(ckFixedDPAID).attr("checked", dpa.fixedPointsEnabled).checkboxradio("refresh");
	$(txtFixedDPAID).val(dpa.FixedPointsCount);
	
	alert('saved dob =  ' + dpa.dob);

	if (dpa.dob != '') $( txtDobId ).mobipick({ date: dpa.dob });

	alert('dob text field value =  ' + $( txtDobId ).val());

	$(txtWeightId).val(dpa.weight);

	if (dpa.height != null)
	{
		var feet = parseInt(dpa.height / 12);
		$(txtHeightFtId).val(feet);
	}

	if (dpa.height != null)
	{
		var inches = parseInt(dpa.height % 12);
		$(txtHeightInId).val(inches);
	}

	$(selectGenderId).val(dpa.gender).selectmenu('refresh');

	$(selectActivityLevelId).val(dpa.activityLevel).selectmenu('refresh');	
}

// Retrieves the user's Weekly Input Allowance Settings input from the page and returns the result in an object
function getWPAInputSettings()
{
	var useWPA = $(ckEnableWeeklyDPA).is(':checked');
	var count = $(txtWPACountId).val();
	var day = $(selectRolloverDayId).find(":selected").val(); 

	return new WeelyPointsSettingsObject(useWPA, count, day);
}

// Updates the Weekly Points Allowance Settings Page widget values with the user data in local storage
function initWPAInputSettingsPage(wpa)
{	
	$(ckEnableWeeklyDPA).attr("checked", wpa.enabled).checkboxradio("refresh");
	$(txtWPACountId).val(wpa.allowance);
	$(selectRolloverDayId).val(wpa.rolloverDay).selectmenu('refresh');
}

// Retrieves the user's Activity Settings input from the page and returns the result in an object
function getActivityInputSettings()
{
	var freq = $(selectAccumFreqId).find(":selected").val();
	var precision = $(selectRoundPrecId).find(":selected").val();
	var calculateBy = $(selectCalcById).find(":selected").val();

	return new ActivityObject(freq, precision, calculateBy);
}

// Updates the Activity Settings Page widget values with the user data in local storage
function initActivitySettingsPage(activity)
{
	$(selectAccumFreqId).val(activity.accFreq).selectmenu('refresh');
	$(selectRoundPrecId).val(activity.precision).selectmenu('refresh');
	$(selectCalcById).val(activity.calculateBy).selectmenu('refresh');
}
	
function showDiv(pageId, show_buttons)
{
    	// Hide all page divs
	$(page1Id).hide();
	$(page2Id).hide();
	$(page3Id).hide();
	$(page4Id).hide();
	$(page5Id).hide();

    	// Show specified div
    	$(pageId).show();

	// Set Header Text
	setHeaderText(pageId, show_buttons);
			
	// Show or Hide back button
	if (show_buttons) $('#wizard-back-button').hide();
	else $('#wizard-back-button').show();  
}

function setHeaderText(pageId, isWizard)
{	
	var wizardHeaderId = '#wizard-header';

	if (pageId == page1Id) $(wizardHeaderId).text('Unit Settings'); 
	else if (pageId == page2Id) $(wizardHeaderId).text('Weight Goal Settings'); 
	else if (pageId == page3Id) $(wizardHeaderId).text('Daily Points Settings'); 
	else if (pageId == page4Id) $(wizardHeaderId).text('Weekly Points Settings'); 
	else if (pageId == page5Id) $(wizardHeaderId).text('Activity Settings'); 
}



