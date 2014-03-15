var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
var weight = 222;

$(document).on('pageshow', '#diary-page', function (event, ui) 
{
	var date = new Date();
	var date_string = days[date.getDay()] + ', ' + months[date.getMonth()] + ' ' + date.getDate() + ', ' + (1900 + date.getYear());
	$('#divDate').html(date_string + ' (Today)');	 
	$('#divWeight').html('I weigh ' + weight + ' pounds');
});	




