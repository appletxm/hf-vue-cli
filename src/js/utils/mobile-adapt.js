export default function uiAdapt(win, doc, uxWidth) {
  let rem
  const docEl = doc.documentElement
  const dpr = win.devicePixelRatio || 1
  const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'

  uxWidth = uxWidth || 750

  function recalc() {
    const clientWidth = docEl.clientWidth * dpr
    if (!clientWidth) return
    if (clientWidth >= uxWidth) {
      rem = 100
    } else {
      rem = 100 * (clientWidth / uxWidth)
    }
    docEl.style.fontSize = rem + 'px'
  }

  if (!doc.addEventListener) return
  win.addEventListener(resizeEvt, recalc, false)
  doc.addEventListener('DOMContentLoaded', recalc, false)

  // 给js调用的，某一dpr下rem和px之间的转换函数
  win.rem2px = function (v) {
    v = parseFloat(v)
    return v * rem
  }
  win.px2rem = function (v) {
    v = parseFloat(v)
    return v / rem
  }
  window.dpr = dpr
  window.rem = rem
}
