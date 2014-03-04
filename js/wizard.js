$(document).ready(function() {    
    // hide #page2-weight-goal-settings, #page3-points-allowance-settings, and #page4-actvity-settings once opened
    //$('#page2-weight-goal-settings, #page3-points-allowance-settings, #page4-actvity-settings').hide();

    // #page1-unit-settings to #page2-weight-goal-settings
    $('#page1-unit-settings a.next').on('click', function () 
    {
        $('#page1-unit-settings').hide();
        $('#page2-weight-goal-settings').show();
		
		setHeaderText('#page2-weight-goal-settings', true);
    });

    // #page2-weight-goal-settings to #page3-points-allowance-settings
    $('#page2-weight-goal-settings a.next').on('click', function () 
    {
        $('#page2-weight-goal-settings').hide();
        $('#page3-points-allowance-settings').show();		
	setHeaderText('#page3-points-allowance-settings', true);
    });

    // #page3-points-allowance-settings to #page4-actvity-settings
    $('#page3-points-allowance-settings a.next').on('click', function () 
    {
        $('#page1-unit-settings, #page2-weight-goal-settings, #page3-points-allowance-settings').hide();
        $('#page4-actvity-settings').show();		
	setHeaderText('#page4-actvity-settings', true);
    });

    // #page4-actvity-settings to #page3-points-allowance-settings
    $('#page4-actvity-settings a.prev').on('click', function () 
    {
	$('#page3-points-allowance-settings, #page4-actvity-settings').hide();
	$('#page3-points-allowance-settings').show(); 		
	setHeaderText('#page3-points-allowance-settings', true);
    });

    // #page3-points-allowance-settings to #page2-weight-goal-settings
    $('#page3-points-allowance-settings a.prev').on('click', function () 
    {
        $('#page2-weight-goal-settings, #page3-points-allowance-settings').hide();
        $('#page2-weight-goal-settings').show();		
	setHeaderText('#page2-weight-goal-settings', true);
    });

    // #page2-weight-goal-settings to #page1-unit-settings
    $('#page2-weight-goal-settings a.prev').on('click', function () {
        $('#page2-weight-goal-settings').hide();
        $('#page1-unit-settings').show();		
	setHeaderText('#page1-unit-settings', true);
    });	

    // KeyDown Key Filters   
    $('#txtDPA').bind( 'keydown', { keys: [8, 9, 27, 13], val: $('#txtDPA').val() }, OnKeyDown );
	
    // KeyUp Key Filters for Text Boxes 
    var min = 1;
    var max = 999;
    var text_box_ids = ['#txtUserSpecifiedDPA'];
    var hidden_field_ids = ['#hUserSpecifiedDPA'];
    for (var index in hidden_field_ids) 
    {
		$(text_box_ids[index]).bind( 
			'keyup', 
			{ 
				//min: min,
				max: max,
				hidden_field_id: hidden_field_ids[index]
			}, 
			OnKeyUp 
		); 
    }
 
    // Initialize numeric keypad data input for text boxes
    $('#goal-weight, #txtUserSpecifiedDPA').keypad(
    {
		prompt: '', closeText: 'OK', clearText: '<<', backText: '<', 
		onKeypress: KeyPress,
		layout: ['123' + $.keypad.CLOSE, '456' + $.keypad.BACK, '789' + $.keypad.CLEAR, '0']
    });
    $('#txt-plus-age, #txt-plus-weight, #txt-classic-weight, #txt-height-ft-plus, #txt-height-in-plus').keypad(
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
		var id = $(this).attr("id");
		//var value = this.value;

		if (id.indexOf("plus") != -1) 
		{
			// Perform DPA Calculation if all required input fields are entered
			CalculateDPAPlus();		
		}

		if (id.indexOf("classic") != -1) 
		{
			// Perform DPA Calculation if all required input fields are entered
			CalculateDPAClassic();
		}
    }	

	// Event handler for selecting point system
	$("#select-point-system").bind('change', function(event, ui) 
	{
		$('#dpa-fixed, #plus-pa-settings, #classic-pa-settings').hide();
		var pointSystemSelectedIndex = $("#select-point-system").find(":selected").val();
		
		if (pointSystemSelectedIndex == 1) $('#classic-pa-settings').show();
		else if (pointSystemSelectedIndex == 2) $('#plus-pa-settings').show();			
	});			
	
	// Event handler for selecting whether daily points allowance is calculated or entered manually
	$("#ck-fixed-value").bind('change', function(event, ui) 
	{
		$('#dpa-fixed, #plus-pa-settings, #classic-pa-settings').hide();

		if($("#ck-fixed-value").is(':checked'))
		{
   	        	$('#dpa-fixed').show();
		}
		else
		{
			var pointSystemSelectedIndex = $("#select-point-system").find(":selected").val();
			if (pointSystemSelectedIndex == 1) $('#classic-pa-settings').show();	
			else if (pointSystemSelectedIndex == 2) $('#plus-pa-settings').show();
		}  		
	});

	// Plus system event handler for selecting gender 
	$("#select-gender-plus").bind('change', function(event, ui) 
	{
		var selectedIndex = $(this).val();
		
		// If 'Female' is selected show the Breastfeeding Drop Down List
		if (selectedIndex == 0 || selectedIndex == 1) $('#div-breastfeeding-mom-plus').hide();
		else if (selectedIndex == 2) $('#div-breastfeeding-mom-plus').show();
		
		// Perform DPA Calculation if all required input fields are entered
		CalculateDPAPlus();
	});

	// Plus system event handler for selecting gender 
	$("#select-breastfeeding-plus").bind('change', function(event, ui) 
	{		
		// Perform DPA Calculation if all required input fields are entered
		CalculateDPAPlus();
	});	
	
	// Classic system event handler for selecting gender 
	$("#select-gender-classic").bind('change', function(event, ui) 
	{
		var selectedIndex = $(this).val();
		
		// If 'Female' is selected show the Breastfeeding Check Box
		if (selectedIndex == 0 || selectedIndex == 1)  $('#div-breastfeeding-mom-classic').hide();
		else if (selectedIndex == 2) $('#div-breastfeeding-mom-classic').show();
		
		// Perform DPA Calculation if all required input fields are entered
		CalculateDPAClassic();
	});
	
	// Classic system event handler for Breastfeeding Check Box
	$("#ckBreastfeeding").bind('change', function(event, ui) 
	{
		// Perform DPA Calculation if all required input fields are entered
		CalculateDPAClassic();	
	});	
	
	// Classic system event handler for selecting height
	$("#select-age-classic").bind('change', function(event, ui) 
	{	
		// Perform DPA Calculation if all required input fields are entered
		CalculateDPAClassic();	
	});	
	
	// Classic system event handler for selecting height
	$("#select-height-classic").bind('change', function(event, ui) 
	{	
		// Perform DPA Calculation if all required input fields are entered
		CalculateDPAClassic();	
	});
	
	// Classic system event handler for selecting activity level
	$("#select-activity-level-classic").bind('change', function(event, ui) 
	{	
		// Perform DPA Calculation if all required input fields are entered
		CalculateDPAClassic();	
	});	
	
	function InputValidForDPAClassic(selected_gender, selected_age, weight, selected_height, selected_activity_level)
	{		
		if (selected_gender == 0 ||
		    selected_age == 0 ||
		    weight == '' ||
		    selected_height == 0 ||
		    selected_activity_level == 0)
		{
			//alert('Required fields not entered');
			return false;
		}

		if (weight.length < 2)
		{
			alert('Weight must be at least 2 digits.');
			return false;
		}

		return true;
	}

	function CalculateDPAClassic()
	{
		var selected_gender = $("#select-gender-classic").find(":selected").val();
		var selected_age = $("#select-age-classic").find(":selected").val();
		var weight = $("#txt-classic-weight").val();
		var selected_height = $("#select-height-classic").find(":selected").val();
		var selected_activity_level = $("#select-activity-level-classic").find(":selected").val();

		if (!InputValidForDPAClassic(
			selected_gender,
			selected_age,
			weight,
			selected_height,
			selected_activity_level
		)) 
		{
			return;
		}
			
		var gender = '';	
		if (selected_gender == 1) 
		{
			gender = GENDER_MALE;
		}
		else if (selected_gender == 2) 
		{					
			var isBreastfeeding = $("#ckBreastfeeding").prop("checked");

			if (isBreastfeeding) gender = GENDER_FEMALE_BREASTFEEDING;
			else gender = GENDER_FEMALE_NOT_BREASTFEEDING;
		}

		var dpa = CalculateClassicDPA(gender, selected_age, weight, selected_height, selected_activity_level);		
		$('#dpa-result-classic').text('DPA = ' + dpa);	
	}

	function InputValidForDPACPlus(selected_gender, age, weight, feet, inches, selected_breastfeeding_status)
	{
		if (selected_gender == 0)
		{
			//alert('Gender is required');
			return false;
		}

		if (age == '')
		{
			//alert('Age is required');
			return false;
		}
		age = parseInt(age);

		if (weight == '')
		{
			//alert('Weight is required');
			return false;
		}

		if (feet == '')
		{
			//alert('Height feet is required');
			return false;
		}

		var inches = $("#txt-height-in-plus").val();
		if (inches == '')
		{
			//alert('Height inches is required');
			return false;
		}	

		var selected_breastfeeding_status = $("#select-breastfeeding-plus").val();
		if ( selected_gender == 2 &&  selected_breastfeeding_status == 0 )
		{
			//alert('Breastfeeding status is required');
			return false;
		}	

		return true;			
	}

	function CalculateDPAPlus()
	{
		var selected_gender = $("#select-gender-plus").find(":selected").val();	
		var age = $("#txt-plus-age").val();
		var weight = $("#txt-plus-weight").val();
		var feet = $("#txt-height-ft-plus").val();
		var inches = $("#txt-height-in-plus").val();
		var selected_breastfeeding_status = $("#select-breastfeeding-plus").val();				

		if (!InputValidForDPACPlus(
		    selected_gender,
		    age,
		    weight,
		    feet,
		    inches,
		    selected_breastfeeding_status
		    )) 
		{
			return;
		}

		age = parseInt(age);
		weight = parseInt(weight);		
		var height = parseInt(feet) * 12 + parseInt(inches);			

		var dpa = 0;
		if (selected_gender == 1) dpa = CalculateWWPlusDailyTargetScoreForMale(age, weight, height);
		else if (selected_gender == 2) dpa = CalculateWWPlusDailyTargetScoreForFemale(age, weight, height, selected_breastfeeding_status);

		if (dpa != 0) $('#dpa-result-plus').text('DPA = ' + dpa);				
	}	
});

$(document).on('pagecreate',function()
{
	var picker = $( '#txtDP', this );    
	picker.mobipick( {intlStdDate: false} ); 
});
		
$(document).on('pageshow', '#wizard-page, #home-page', function (event, ui) 
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
        	showDiv("#page1-unit-settings", true);
    	}
});	
		
function showDiv(pageId, show_buttons)
{
    	// Hide all page divs
    	$('#page1-unit-settings, #page2-weight-goal-settings, #page3-points-allowance-settings, #page4-actvity-settings').hide();

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
	if (pageId == '#page1-unit-settings') $('#wizard-header').text('Unit Settings'); 
	else if (pageId == '#page2-weight-goal-settings') $('#wizard-header').text('Weight Goal Settings'); 
	else if (pageId == '#page3-points-allowance-settings') $('#wizard-header').text('Daily Points Allowance Settings'); 
	else if (pageId == '#page4-actvity-settings') $('#wizard-header').text('Activity Settings'); 
}


