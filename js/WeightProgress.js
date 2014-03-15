// http://hayageek.com/jquery-progress-bar-example/
var totalPoints = 54;
var pointsUsed = 30;
var pointsLeft = totalPoints - pointsUsed;

		$(document).ready(function()
		{
			var bar5 = $("#pbTotalPoints").progressbar({color:'#00ff00'});

			var maxWidth = bar5.width();
			var scalar = maxWidth / totalPoints;
			var usedWidth = pointsUsed * scalar;
			var remainingWidth = pointsLeft * scalar;
			
			bar5.progress(100, totalPoints + ' total points'); 

			var bar6 = $("#pbUsedPoints").progressbar({color:'#ff0000', width: usedWidth});
			var usedCaption = '';
			if (pointsUsed >= 1 && pointsUsed <= 6) usedCaption = pointsUsed;
			else if (pointsUsed >= 7 && pointsUsed < totalPoints) usedCaption = pointsUsed + ' used';
			else if (pointsUsed == totalPoints) usedCaption = 'All points used.';
			else if (pointsUsed > totalPoints) usedCaption += Math.abs(pointsUsed - totalPoints) + ' points over limit';
			bar6.progress(100, usedCaption);

			var bar7 = $("#pbRemainingPoints").progressbar({color:'#ffff00', width: remainingWidth});
			var leftCaption = '';
			if (pointsLeft >= 1 && pointsLeft <= 6) leftCaption = pointsLeft;
			else if (pointsLeft >= 7 && pointsLeft < totalPoints) leftCaption = pointsLeft + ' left';
			bar7.progress(100, leftCaption); 
		});
		

		(function ($) {
    			$.fn.progressbar = function (options)
    			{
       				var settings = $.extend({
        			width:'300px',
        			height:'25px',
        			color:'#0ba1b5',
        			padding:'0px',
        			border:'0px'},options);
 
        			//Set css to container
        			$(this).css({
            				'width':settings.width,
            				'border':settings.border,
            				'overflow':'hidden',
            				'padding': settings.padding,
            				'margin':'0px 0px 0px 0px'
           			 });

        			// add progress bar to container
        			var progressbar =$("<div></div>");
        			progressbar.css({
        				'height':settings.height,
        				'text-align':'center',
        				'vertical-align':'middle',
        				'color': '#000',
        				'width': '0px',
        				'background-color': settings.color
        			});
 
        			$(this).append(progressbar);
 
        			this.progress = function(value, caption)
        			{
            				var width = $(this).width() * value/100;

            				progressbar.width(width).html(caption);
        			}

       		 		return this;
    			};
		}(jQuery));

