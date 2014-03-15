
// Filters out invalid characters
function OnKeyDown(event) 
{			
    // By default, allow backspace[8], delete[46], tab[9], escape[27], enter[13], .[190] 
    var allowedKeys = [8, 46, 9, 27, 13, 190];
    if (event.data.keys != null) allowedKeys = event.data.keys;
		    
    if ( $.inArray(event.keyCode, allowedKeys) !== -1 ||
         // Allow: Ctrl+A
         (event.keyCode == 65 && event.ctrlKey === true) || 
         // Allow: home, end, left, right
         (event.keyCode >= 35 && event.keyCode <= 39)) 	
    {		    	    			
        // let it happen, don't do anything
        return;
    }
    else
    {
        // Ensure that it is a number and stop the keypress
        if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) 
	{
            event.preventDefault(); 
        }   
    }
}

// Enforces numeric range validation
function OnKeyUp(event) 
{	
    var max = parseInt(event.data.max, 10);
   var input_value = parseInt(this.value, 10);

    var hf_id = event.data.hidden_field_id;
    var hidden_field = $(hf_id);		
		
    if (input_value == 0)
    {
        this.value = "";
    }
    // If the new number is out of range then set the input value to its last valid value
    else if (input_value > max)
    {
	this.value = hidden_field.val();
   }
    // If the new number is valid set the hidden field value to the input value
    else
    {
	hidden_field.val(input_value);
    }	
}

