$ = require 'jquery'
do fill = (item = 'This is a web development template based on my workflow') ->
	$('.tagline').append "#{item}"
fill