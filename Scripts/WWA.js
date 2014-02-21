$(document).ready(function () 
{    
                
    //$("#current-weight").focusout(
    //    function (event) 
    //    {
    //        if ($(this).val() == '')
    //	{
    //	    alert('Current weight is a required field.');
    //	}
    //    }
    //);		

    $('#current-weight, #goal-weight').bind( 'keydown', { keys: [8, 9, 27, 13], val: $('#current-weight').val() }, OnKeyDown );
	
    var min = 1;
    var max = 999;

    $('#current-weight').bind( 
        'keyup', 
        { 
	    //min: min,
	    max: max,
	    hidden_field_id: "#hCurrentWeight"
	}, 
	OnKeyUp 
    ); 

    $('#goal-weight').bind( 
	'keyup', 
	{ 
	    //min: min,
	    max: max,
	    hidden_field_id: "#hGoalWeight"
	}, 
	OnKeyUp 
    ); 	


});