$(document).ready(function() {

      
    // hide #page1-unit-settings previous button, #page2-weight-settings and #page3-points-allowance-settings once opened
    $(document).find('#page1-unit-settings a.prev').hide();
    //$('#page2-weight-settings, #page3-points-allowance-settings, #page4-actvity-settings').hide();

    // #page1-unit-settings to #page2-weight-settings
    $('#page1-unit-settings a.next').on('click', function () 
    {
        $('#page1-unit-settings').hide();
        $('#page2-weight-settings').show();
    });

    // #page2-weight-settings to #page3-points-allowance-settings
    $('#page2-weight-settings a.next').on('click', function () 
    {
        $('#page2-weight-settings').hide();
        $('#page3-points-allowance-settings').show();
    });

    // #page3-points-allowance-settings to #page4-actvity-settings
    $('#page3-points-allowance-settings a.next').on('click', function () 
    {
        $('#page1-unit-settings, #page2-weight-settings, #page3-points-allowance-settings').hide();
        $('#page4-actvity-settings').show();
        $(document).find('#page4-actvity-settings a.next').hide();
    });

    // #page4-actvity-settings to #page3-points-allowance-settings
    $('#page4-actvity-settings a.prev').on('click', function () 
    {
	$('#page3-points-allowance-settings, #page4-actvity-settings').hide();
	$('#page3-points-allowance-settings').show(); 
    });

    // #page3-points-allowance-settings to #page2-weight-settings
    $('#page3-points-allowance-settings a.prev').on('click', function () 
    {
        $('#page2-weight-settings, #page3-points-allowance-settings').hide();
        $('#page2-weight-settings').show();
    });

    // #page2-weight-settings to #page1-unit-settings
    $('#page2-weight-settings a.prev').on('click', function () {
        $('#page2-weight-settings').hide();
        $('#page1-unit-settings').show();
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
    $('#current-weight, #goal-weight, #txt-plus-age, #txt-plus-weight, #txt-classic-age, #txt-classic-weight, #txtUserSpecifiedDPA').keypad(
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
});

$(document).on('pageshow', '#wizard-page, #home-page', function (event, ui) {
    var args = document.location.search.substring(1).split('&');	
    if (args != '') {
	var kvp0 = args[0].split('=');
	var id = "#" + kvp0[1];
	var kvp1 = args[1].split('=');
	var show_buttons = kvp1[1] == 'true';		
	showDiv(id, show_buttons);
    }
    else {
        showDiv("#page1-unit-settings", 1 == 1);
    }
});	

function showDiv(pageId, show_buttons)
{
    // Hide all page divs
    $('#page1-unit-settings, #page2-weight-settings, #page3-points-allowance-settings, #page4-actvity-settings').hide();

    // Show specified div
    $(pageId).show();

    // Hide visible div buttons if specified
    var buttonGroupId = pageId + '-buttons';
    if (!show_buttons) {
	$(buttonGroupId).hide(); 
    }
}


