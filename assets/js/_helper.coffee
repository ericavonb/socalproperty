
elements = document.getElementsByClassName('center')
fel = document.getElementsByClassName('full')
fw = document.getElementsByClassName('full_w')
bck = document.getElementById('background')

getStyle = (stl, prop) ->
        if stl then parseInt(stl.getPropertyValue(prop)) else 0
                
borderW = (el, m, p) ->
        stl = window.getComputedStyle(el, null)
        w = 0
        if (typeof p == 'undefined')
                w += getStyle(stl, "padding-right")
                w += getStyle(stl, "padding-left")
        if m
                w += getStyle(stl, "margin-right")
                w += getStyle(stl, "margin-left")
        w
        
borderH = (el, m) ->
        stl = window.getComputedStyle(el, null)
        h =  getStyle(stl, "padding-top")
        h +=  getStyle(stl, "padding-bottom")
        if m
                h += getStyle(stl, "margin-top")
                h += getStyle(stl, "margin-bottom")
        h       
        
width = (el) ->
        getStyle(window.getComputedStyle(el, null), "width")
        
height = (el) ->
       getStyle(window.getComputedStyle(el, null), "height")

insideWidth = (el) ->
        w = 0
        for child in el.children
                w += width(child) + borderW(child, true)
        w

full = (el, w, h) ->
        el.style.height = (window.innerHeight - borderH(el, true)) + "px" if h
        el.style.width = (window.innerWidth - borderW(el, true)) + "px" if w
        true

minfull = (el, w, h) ->
        if h
                newH = window.innerHeight - borderH(el)
                if (height(el) < newH)
                        el.style.height = newH + "px"
        if w
                newW = window.innerWidth - borderW(el)
                if (width(el) < newW)
                        el.style.width = newW + "px"
        
center = (c) ->
        c.style.paddingLeft = 0
        c.style.paddingRight = 0
        p = (width(c) - insideWidth(c)) / 2
        c.style.paddingLeft = p + "px"
        p
        
        
main = ->
        minfull(bck, true, true)
        minfull(el, true, true) for el in fel
        minfull(el, true, false) for el in fw
        center el for el in elements
        true

window.onresize = main

main()