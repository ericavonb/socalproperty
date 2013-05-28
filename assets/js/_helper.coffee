elements = document.getElementsByClassName('center')

width = (el, p, m) ->
        style = window.getComputedStyle(el, null);
        h = if style then parseInt(style.getPropertyValue("width")) else 0
        if m
                h += parseInt(style.getPropertyValue("margin-left"))
                h += parseInt(style.getPropertyValue("margin-right"))
        if p
                h += parseInt(style.getPropertyValue("padding-left"))
                h += parseInt(style.getPropertyValue("padding-right"))
         h

insideWidth = (el) ->
        w = 0
        for child in el.children
                w += width(child, true, true)
         w
        
center = (c) ->
        c.style.paddingLeft = ((width(c, true) - insideWidth(c)) / 2) + "px"

full = (el) ->
        el.style.height = window.innerHeight + "px"
        el.style.width = window.outerWidth + "px"

center el for el in elements

full document.getElementById('background')