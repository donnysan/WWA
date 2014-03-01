$(document).ready(function() {    
    // hide #page2-weight-settings, #page3-points-allowance-settings, and #page4-actvity-settings once opened
    //$('#page2-weight-settings, #page3-points-allowance-settings, #page4-actvity-settings').hide();

    // #page1-unit-settings to #page2-weight-settings
    $('#page1-unit-settings a.next').on('click', function () 
    {
        $('#page1-unit-settings').hide();
        $('#page2-weight-settings').show();
		
		setHeaderText('#page2-weight-settings', true);
    });

    // #page2-weight-settings to #page3-points-allowance-settings
    $('#page2-weight-settings a.next').on('click', function () 
    {
        $('#page2-weight-settings').hide();
        $('#page3-points-allowance-settings').show();		
	setHeaderText('#page3-points-allowance-settings', true);
    });

    // #page3-points-allowance-settings to #page4-actvity-settings
    $('#page3-points-allowance-settings a.next').on('click', function () 
    {
        $('#page1-unit-settings, #page2-weight-settings, #page3-points-allowance-settings').hide();
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

    // #page3-points-allowance-settings to #page2-weight-settings
    $('#page3-points-allowance-settings a.prev').on('click', function () 
    {
        $('#page2-weight-settings, #page3-points-allowance-settings').hide();
        $('#page2-weight-settings').show();		
	setHeaderText('#page2-weight-settings', true);
    });

    // #page2-weight-settings to #page1-unit-settings
    $('#page2-weight-settings a.prev').on('click', function () {
        $('#page2-weight-settings').hide();
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

    // DatePicker Plug-In
    $('#test-datepicker').Zebra_DatePicker(
    {       
		direction: true,    // boolean true would've made the date picker future only but starting from today, rather than tomorrow
		format: 'D, M d, Y',
		show_clear_date: false,
		show_select_today: false,
		first_day_of_week: 0   
    });
 
    // Initialize numeric keypad data input for text boxes
    $('#current-weight, #goal-weight, #txt-plus-age, #txt-plus-weight, #txt-classic-weight, #txtUserSpecifiedDPA').keypad(
    {
		prompt: '', closeText: 'OK', clearText: '<<', backText: '<', 
		onKeypress: KeyPress,
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
	
	// Event handler for selecting whether daily points allowance is calculated or entered manually
	$("#selDPA").bind('change', function(event, ui) 
	{				
		$('#dpa-fixed, #dpa-calculated, #plus-pa-settings, #classic-pa-settings').hide();
		var selectedIndex = $(this).val();
		
		if (selectedIndex == 1) $('#dpa-fixed').show();
		else if (selectedIndex == 2) $('#dpa-calculated, #plus-pa-settings').show();
		else if (selectedIndex == 3) $('#dpa-calculated, #classic-pa-settings').show();	
	});		
	
	// Plus system event handler for selecting gender 
	$("#select-gender-plus").bind('change', function(event, ui) 
	{
		var selectedIndex = $(this).val();
		if (selectedIndex == 0 || selectedIndex == 1) $('#div-breastfeeding-mom-plus').hide();
		else if (selectedIndex == 2) $('#div-breastfeeding-mom-plus').show();
	});	

	// Classic system event handler for selecting gender 
	$("#select-gender-classic").bind('change', function(event, ui) 
	{
		var selectedIndex = $(this).val();
		if (selectedIndex == 0 || selectedIndex == 1)  $('#div-breastfeeding-mom-classic').hide();
		else if (selectedIndex == 2) $('#div-breastfeeding-mom-classic').show();
	});
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
    $('#page1-unit-settings, #page2-weight-settings, #page3-points-allowance-settings, #page4-actvity-settings').hide();

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
	if (pageId == '#page1-unit-settings') $('#wizard-header').text('Unit Settings' + (isWizard ? ' (1 of 4)' : '')); 
	else if (pageId == '#page2-weight-settings') $('#wizard-header').text('Weight Settings' + (isWizard ? ' (2 of 4)' : '')); 
	else if (pageId == '#page3-points-allowance-settings') $('#wizard-header').text('Daily Points Allowance Settings' + (isWizard ? ' (3 of 4)' : '')); 
	else if (pageId == '#page4-actvity-settings') $('#wizard-header').text('Activity Settings' + (isWizard ? ' (4 of 4)' : '')); 
}


