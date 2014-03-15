$(document).ready(function () 
{   
    $('#units-help').bind('click', function(e) 
    {		
	e.preventDefault();		
	$.Zebra_Dialog('<strong>Units</strong>, will be displayed in either U.S. or Metric system units.');    
    });

    $('#points-system-help').bind('click', function(e) 
    {		
	e.preventDefault();	
	$.Zebra_Dialog('Will you be using the Plus System or the Classic System?');    
    });

    $('#points-precision-help').bind('click', function(e) 
    {	
	e.preventDefault();
	$.Zebra_Dialog('What level of precision do you want?  Whole pound, 1/2 pound, or 1/10 pound?');   
    });

    $('#daily-points-allowance-help').bind('click', function(e) 
    {	
	e.preventDefault();
	$.Zebra_Dialog('If you want to enter a fixed daily point allowance to use, select \"Used a fixed value\" and enter the daily fixed value you want to use.  <br><br>Otherwise, select "\Calculate the Value\" to have the value calculated for you using the official Weight Watchers calculation.' );   
    });
});