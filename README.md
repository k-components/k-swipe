k-swipe
========

Import animation css:

```css
@import('../../node_modules/k-swipe')
```

Initialize the component:

```coffee
app.component require 'k-swipe'
```

Initialize the component:

```html
<view name="k-swipe" prev="{{#root._page.prevpost.url}}" next="{{#root._page.nextpost.url}}"></view>
```

Set `k-swipe-root` for the element that you want to be scrolled. Set its class as `{{_page.swipefrom}}` as that will enable the animation.

```html
<div id="k-swipe-root" class="content-center {{_page.swipefrom}}">
</div>
```

