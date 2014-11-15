$(function() {
	var Mustache = require('mustache');

	$.getJSON('js/data.json', function(data) {
		var template = $('#mustache-template').html();
		var html = Mustache.to_html(template, data);
		$('mustache').html(html);
	}); // getJSON
	
}); // function