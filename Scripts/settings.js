$(document).ready(function() {

      
    // KeyDown Key Filters   
    $('#current-weight, #goal-weight, #txtDPA').bind( 'keydown', { keys: [8, 9, 27, 13], val: $('#current-weight').val() }, OnKeyDown );
	
    // KeyUp Key Filters for Text Boxes 
    var min = 1;
    var max = 999;
    var text_box_ids = ['#current-weight', '#goal-weight, #txtUserSpecifiedDPA'];
    var hidden_field_ids = ['#hCurrentWeight', '#hGoalWeight, #hUserSpecifiedDPA'];
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

   

    // Wizard Control
    // hide previous button, #page2-weight-settings and #page3-points-allowance-settings once opened
    $('#settings-page').find('#page1-unit-settings a.prev').hide();
    $('#page2-weight-settings, #page3-points-allowance-settings, #page4-actvity-settings').hide();

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
        $('#settings-page').find('#page4-actvity-settings a.next').hide();
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
});

