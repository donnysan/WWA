var TIME_CREATED = 'timeCreated';
var TIME_UPDATED = 'timeUpdated';

var pageId = '#home';

$(document).on('pageinit', pageId, function (event, ui) 
{
	// localStorage.removeItem('user');
	// localStorage.removeItem(INIT_STATUS);
	if (!appInitialized()) window.location.replace("wizard.html");
});



