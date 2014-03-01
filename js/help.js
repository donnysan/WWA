$(document).ready(function () 
{   
    $('#units-help').bind('click', function(e) 
    {		
	e.preventDefault();		
	$.Zebra_Dialog('Select whether you want <strong>All Units</strong>, to be displayed in either the U.S. system of measurement or the Metric system.');    
    });

    $('#points-system-help').bind('click', function(e) 
    {		
	e.preventDefault();	
	$.Zebra_Dialog('You can select either the Weight Watchers Plus System or the Weight Watchers Classic System');    
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