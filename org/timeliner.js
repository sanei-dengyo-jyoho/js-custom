/*
* Timeliner.js
* @version		1.0
* @copyright	Tarek Anandan (http://www.technotarek.com)
*/
;(function($) {

	$.timeliner = function(options){
	// default plugin settings
	settings = jQuery.extend({
		timelineContainer: '#timelineContainer', // value: selector of the main element holding the timeline's content, default to #timelineContainer
		startState: 'closed', // value: closed | open, default to closed; determines whether the timeline is initially collapsed or fully expanded 
		baseSpeed: 200 // value: any integer, default to 200; determines the base speed, some animations are a multiple (4x) of the base speed
	}, options);

		$(document).ready(function() {

			// If startState option is set to closed, hide all the events; else, show fully expanded upon load
			if(settings.startState=='closed')
			{
				$('.timelineEvent').hide();
				$('.timelineEventDT').show();
			}else{
				$('.timelineMinor dt, .timelineMinor dt a')
					.addClass('open')
					.css('fontSize', '1.2em');
				$('.timelineEventDT').hide();
				$('.timelineEvent').show();
			}

			// Single Event
			$('.timelineMinor dt').toggle(function(){

				var currentId = $(this).attr('id');

				// open Event
				$('a', this)
					.removeClass('closed')
					.addClass('open')
					.animate({ fontSize: '1.2em' }, settings.baseSpeed);

				$('#'+currentId+'DT').hide(1*settings.baseSpeed);
				$('#'+currentId+'EX').show(4*settings.baseSpeed);

			},function()
			{
				var currentId = $(this).attr('id');

				// close Event
				$('a', this)
					.animate({ fontSize: '1.0em' }, 0)
					.removeClass('open')
					.addClass('closed');

				$('#'+currentId+'EX').hide(4*settings.baseSpeed);
				$('#'+currentId+'DT').show(1*settings.baseSpeed);

			});

			// Single Major Marker
			$('.timelineMajorMarker').toggle(function()
			{
				// reset all animations
				$(this).css('fontSize', '1.533em');
				$(this).parents('.timelineMajor').find('dt a', 'dl.timelineMinor')
					.animate({ fontSize: '1.2em' }, settings.baseSpeed)
					.removeClass('closed')
					.addClass('open');
				$(this).parents('.timelineMajor').find('.timelineEventDT').hide(1*settings.baseSpeed);
				$(this).parents('.timelineMajor').find('.timelineEvent').show(4*settings.baseSpeed);

			},function()
			{
				// reset all animations
				$(this).css('fontSize', '1.333em');
				$(this).parents('.timelineMajor').find('dl.timelineMinor a')
					.animate({ fontSize: '1.0em' }, settings.baseSpeed)
					.removeClass('open')
					.addClass('closed');
				$(this).parents('.timelineMajor').find('.timelineEvent').hide(4*settings.baseSpeed);
				$(this).parents('.timelineMajor').find('.timelineEventDT').show(1*settings.baseSpeed);
			});

			// All Markers/Events
			$('.expandAll').toggle(function()
			{
				// reset all animations
				$('.timelineMajorMarker').css('fontSize', '1.533em');
				$(this).parents(settings.timelineContainer).find('dt a', 'dl.timelineMinor')
					.animate({ fontSize: '1.2em' }, settings.baseSpeed)
					.removeClass('closed')
					.addClass('open');
				$(this).parents(settings.timelineContainer).find('.timelineEventDT').hide(1*settings.baseSpeed);
				$(this).parents(settings.timelineContainer).find('.timelineEvent').show(4*settings.baseSpeed);
				$(this).removeClass('expandAllclosed')
				$(this).addClass('expandAllopen');
				$(this).html('');

			},function()
			{
				// reset all animations
				$('.timelineMajorMarker').css('fontSize', '1.333em');
				$(this).parents(settings.timelineContainer).find('dl.timelineMinor a')
					.animate({ fontSize: '1.0em' }, settings.baseSpeed)
					.removeClass('open')
					.addClass('closed');
				$(this).parents(settings.timelineContainer).find('.timelineEvent').hide(4*settings.baseSpeed);
				$(this).parents(settings.timelineContainer).find('.timelineEventDT').show(1*settings.baseSpeed);
				$(this).removeClass('expandAllopen')
				$(this).addClass('expandAllclosed');
				$(this).html('');
			});
		});
	};
})(jQuery);