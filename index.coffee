
module.exports = class Swipe
	view: __dirname

	name: 'k-swipe'

	xDown: null
	yDown: null

	init: ->
		@model.set 'hide', !@model.get('show')

	create: ->
		document.addEventListener 'touchstart', @handleTouchStart, false
		document.addEventListener 'touchmove', @handleTouchMove, false

	handleTouchStart: (e) =>
		@xDown = e.touches?[0]?.clientX
		@yDown = e.touches?[0]?.clientY
		return

	handleTouchMove: (e) =>
		if !@xDown or !@yDown or !e.touches
			return
		xUp = e.touches[0].clientX
		yUp = e.touches[0].clientY
		xDiff = @xDown - xUp
		yDiff = @yDown - yUp
		if Math.abs(xDiff) > Math.abs(yDiff)

			if xDiff > 0
				@next.click()
			else
				@prev.click()

		@xDown = null
		@yDown = null
		return