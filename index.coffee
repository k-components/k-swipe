
module.exports = class Swipe
	view: __dirname

	name: 'k-swipe'

	xDown: null
	yDown: null

	init: ->
		@model.set 'hide', !@model.get('show')

	create: (model) ->
		if @page.params?.swipe
			model.root.set '_page.swipefrom', 'swipe-from-' + @page.params.swipe

		document.addEventListener 'touchstart', @touchStart, false
		document.addEventListener 'touchend', @touchEnd, false
		document.addEventListener 'touchmove', @touchMove, false
		@root = document.getElementById('k-swipe-root') or document.body

		document.body.addEventListener 'keydown', @keydown, false

	destroy: ->
		document.removeEventListener 'touchstart', @touchStart
		document.removeEventListener 'touchend', @touchEnd
		document.removeEventListener 'touchmove', @touchMove

	# set left/right keys for prev/next post
	keydown: (e) =>
		t = e?.target or e?.srcElement
		return if t?.nodeName isnt 'BODY'
		key = e.keyCode
		if key is 37
			@click @prevbutton
		else if key is 39
			@click @nextbutton

	translate: (pix) =>
		e = @root
		pix = pix * -1
		e.style['-webkit-transform'] = 'translate(' + pix + 'px, 0px)'
		e.style['-moz-transform'] = 'translate(' + pix + 'px, 0px)'
		e.style['-ms-transform'] = 'translate(' + pix + 'px, 0px)'
		e.style['-o-transform'] = 'translate(' + pix + 'px, 0px)'
		e.style['transform'] = 'translate(' + pix + 'px, 0px)'
		return

	touchStart: (e) =>
		if !e.touches?[0]
			return

		if document?.activeElement?.nodeName in ['TEXTAREA', 'INPUT']
			return

		@xDown = e.touches?[0]?.clientX
		@yDown = e.touches?[0]?.clientY

		return

	touchMove: (e) =>
		if !@xDown or !@yDown or !e.changedTouches?.length
			return

		xUp = e.changedTouches[0].clientX
		yUp = e.changedTouches[0].clientY
		xDiff = @xDown - xUp
		yDiff = @yDown - yUp

		if Math.abs(xDiff) > Math.abs(yDiff) and Math.abs(xDiff) > 50
			@translate xDiff

	touchEnd: (e) =>

		if !@xDown or !@yDown or !e.changedTouches?.length
			return

		xUp = e.changedTouches[0].clientX
		yUp = e.changedTouches[0].clientY
		xDiff = @xDown - xUp
		yDiff = @yDown - yUp

		@xDown = null
		@yDown = null

		if Math.abs(xDiff) > Math.abs(yDiff)

			if xDiff > 150
				@click @nextbutton
			else if xDiff < -150
				@click @prevbutton
			else
				@translate 0
		return

	click: (el) =>
		if el?.href
			@destroy()

			try
				ev = new window. MouseEvent('click',
					'view': window
					'bubbles': true
					'cancelable': true)

				el.dispatchEvent ev
			catch err
				ev = document.createEvent('MouseEvents')
				ev.initMouseEvent 'click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null
				el.dispatchEvent ev
		else
			@translate 0
