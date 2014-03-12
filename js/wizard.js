var page1Id = '#page1-unit-settings';
var page2Id = '#page2-weight-goal-settings';
var page3Id = '#page3-dpa-settings';
var page4Id = '#page4-wpa-settings';
var page5Id = '#page5-actvity-settings';

var frmDPAId = '#frm-daily-points-settings';

var calculatedDPAResult = '#h3-calculated-dpa';

$(document).ready(function() 
{   
	var CLASSIC_POINTS_SYSTEM = 1;
	var PLUS_POINTS_SYSTEM = 2;

	// Helper function for hiding the previously selected page and showing the currently selected page
	function UpdatePage(fromPage, toPage)
	{
        	$(fromPage).hide();
        	$(toPage).show();		
		setHeaderText(toPage, true);
	}

	// Page 1 > Page 2
	$(page1Id + ' a.next').on('click', function () 
	{
		//if ($("#frm-unit-settings").valid())		
			UpdatePage(page1Id, page2Id);
	});

	// Page 2 > Page 3
	$(page2Id + ' a.next').on('click', function () 
	{
		//if ($("#frm-weight-goal-settings").valid())
			UpdatePage(page2Id, page3Id);	
	});

	// Page 3 > Page 4
	$(page3Id + ' a.next').on('click', function () 
	{
		if ($(frmDPAId).valid()) 
			UpdatePage( page3Id, page4Id );	
	});

	// Page 4 > Page 5
	$(page4Id + ' a.next').on('click', function () 
	{
		if ($(frmDPAId).valid()) 
			UpdatePage( page4Id, page5Id );	
	});

	// Page 5 > Finish  
	$(page5Id + ' a.finish').on('click', function () 
	{
		//if ($("#frm-activity-settings").valid()) 
			window.history.back();
	});

	// Page 5 > Page 4
	$(page5Id + ' a.prev').on('click', function () 
	{
		UpdatePage( page5Id, page4Id );	
	});

	// Page 4  > Page 3
	$(page4Id + ' a.prev').on('click', function () 
	{				
		UpdatePage(page4Id, page3Id)	
	});

	// ( Page 3 > Page 2
	$(page3Id + ' a.prev').on('click', function () 
	{
		UpdatePage(page3Id, page2Id)
	});

	// Page 2 > Page 1
	$(page2Id + ' a.prev').on('click', function () 
	{
		UpdatePage(page2Id, page1Id);
	});

	// Initialize numeric keypad data input for text boxes
	$('#goal-weight, #txt-fixed-dpa, #txt-wpa-count').keypad(
	{
		prompt: '', closeText: 'OK', clearText: '<<', backText: '<', 
		onKeypress: KeyPress,
		layout: ['123' + $.keypad.CLOSE, '456' + $.keypad.BACK, '789' + $.keypad.CLEAR, '0']
	});
	$('#txt-age, #txt-weight, #txt-height-ft, #txt-height-in').keypad(
	{
		prompt: '', closeText: 'OK', clearText: '<<', backText: '<', 
		onKeypress: KeyPress,
		onClose: CloseKeypadPanel,
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

	function CloseKeypadPanel()
	{
		if ($(frmDPAId).valid()) CalculateDPA();
		else $(calculatedDPAResult).text('Your Daily Points Allowance...');
	}			


	function ShowHideDPAFields()
	{
		var useFixedValue = $("#ck-fixed-value").is(':checked');
		if(useFixedValue) 
		{
			$('#div-dpa-fixed-fields').show();
			$('#div-calculated-dpa, #div-dpa-calculation-fields').hide();
		}
		else
		{
			$('#div-calculated-dpa, #div-dpa-calculation-fields').show();
			$('#div-dpa-fixed-fields').hide();
				
			if ($(frmDPAId).valid()) CalculateDPA();
			else $(calculatedDPAResult).text('Your Daily Points Allowance...');
		}
	}

	// Event handler for selecting whether daily points plus allowance is calculated or entered manually
	$("#ck-fixed-value").bind('change', function(event, ui) 
	{
		ShowHideDPAFields();	
	});

	// Event handler for selecting whether weekly points allowance is enabled
	$('#ck-enable-weekly-points').on('change', function(e) {
		// Doesn't work in internet explorer 8		
		e.stopPropagation(); // to prevent event from bubbling up

		var checked = $(this).is(':checked');
		if (checked) $('#div-wpa-count').show();
		else $('#div-wpa-count').hide();
  	});

	// Plus system event handler for selecting point system
	$("#select-point-system").bind('change', function(event, ui) 
	{	
		var selectedPointsSystem = $(this).val();
		// The Classic System or the Plus System was selected
		if (selectedPointsSystem == CLASSIC_POINTS_SYSTEM || selectedPointsSystem == PLUS_POINTS_SYSTEM)
		{
			// This setting only applies to the classic points system
			if (selectedPointsSystem == CLASSIC_POINTS_SYSTEM) $('#div-activity-level').show();
			else if (selectedPointsSystem == PLUS_POINTS_SYSTEM) $('#div-activity-level').hide();

			$('#tr-select-fixed-dpa').show();
			ShowHideDPAFields();	
		}
	});

	// Plus system event handler for selecting gender 
	$("#select-gender").bind('change', function(event, ui) 
	{
		var selectedIndex = $(this).val();
		
		// If 'Female' is selected show the Breastfeeding Drop Down List
		//if (selectedIndex == 0 || selectedIndex == 1) $('#div-breastfeeding-mom').hide();
		//else if (selectedIndex == 2) $('#div-breastfeeding-mom').show();
		
		if ($(frmDPAId).valid()) CalculateDPA();
		else $(calculatedDPAResult).text('Your Daily Points Allowance...');
	});

	// Plus system event handler for selecting gender 
	$("#select-breastfeeding").bind('change', function(event, ui) 
	{		
		if ($(frmDPAId).valid()) CalculateDPA();
		else $(calculatedDPAResult).text('Your Daily Points Allowance...');
	});			

	// Plus system event handler for selecting gender 
	$("#select-activity-level").bind('change', function(event, ui) 
	{		
		if ($(frmDPAId).valid()) CalculateDPA();
		else $(calculatedDPAResult).text('Your Daily Points Allowance...');
	});

	function CalculateDPA()
	{		
		var selected_gender = $("#select-gender").find(":selected").val();	
		var age = $("#txt-age").val();
		var weight = $("#txt-weight").val();
		var feet = $("#txt-height-ft").val();
		var inches = $("#txt-height-in").val();
		//var selected_breastfeeding_status = $("#select-breastfeeding").val();	
		var selected_activity_level = $("#select-activity-level").val()

		var selectedPointsSystem = $("#select-point-system").find(":selected").val();
		
		age = parseInt(age);
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
	
$(document).on('pagecreate',function()
{
	// Initialize DatePicker PlugIn
	var picker = $( '#weight-goal-date', this );    
	picker.mobipick( { intlStdDate: false, minDate: (new XDate()).addDays(0), maxDate: (new XDate()).addYears(5) } ); 
});
	
$(document).on('pageshow', '#wizard-page', function (event, ui) 
{
    	var args = document.location.search.substring(1).split('&');		

    	if (args != '') 
    	{
		var kvp0 = args[0].split('=');
		var id = "#" + kvp0[1];
		var kvp1 = args[1].split('=');
		var show_buttons = kvp1[1] == 'true';	
		showDiv(id, show_buttons);
    	}
   	else 
	{
        	showDiv(page1Id, true);
    	}
});	
		
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



