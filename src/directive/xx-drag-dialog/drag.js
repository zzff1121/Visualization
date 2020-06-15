const createResizeDom = () => {
  const div = document.createElement('div')
  const style = `
    width:0;height:0px;position:absolute;right:0;bottom:0;
    background-color:none;cursor:se-resize;
    border-bottom: 10px solid #ccc;
    border-left: 10px solid transparent;
    `
  div.innerHTML = `<div class="xx-resize" style="${style}" ></div>`
  return div.children[0]
}

// 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
const getStyle = (function() {
  if (window.document.currentStyle) {
    return (dom, attr) => dom.currentStyle[attr]
  } else {
    return (dom, attr) => getComputedStyle(dom, false)[attr]
  }
})()

export default {
  bind(el, binding, vnode) {
    const dialogHeaderEl = el.querySelector('.el-dialog__header')
    const dragDom = el.querySelector('.el-dialog')
    dialogHeaderEl.style.cssText += ';cursor:move;'
    dragDom.style.cssText += ';top:0px;'

    const resizeEl = createResizeDom()
    dragDom.appendChild(resizeEl)

    let marginTop = dragDom.style.marginTop
    if (marginTop) {
      marginTop = marginTop.replace(/px/g, '')
    } else {
      marginTop = 0
    }
    // 默认最小高度 60（header）+ 100（body）+ 60（footer）
    const minDragDomHeight = 220

    resizeEl.onmousedown = e => {
      // 鼠标按下，计算当前元素距离可视区的距离
      const px = e.clientX
      const py = e.clientY

      const dragDomWidth = dragDom.offsetWidth
      const dragDomHeight = dragDom.offsetHeight

      // 获取到的值带px 正则匹配替换
      let styL = getStyle(dragDom, 'left')
      let styT = getStyle(dragDom, 'top')

      if (styL.includes('%')) {
        styL = +document.body.clientWidth * (+styL.replace(/%/g, '') / 100)
        styT = +document.body.clientHeight * (+styT.replace(/%/g, '') / 100)
      } else {
        styL = +styL.replace(/px/g, '')
        styT = +styT.replace(/px/g, '')
      }
      dragDom.style.cssText += `;left:${styL}px;top:${styT}px;`

      const minDragDomWidth = 100
      // if (minDragDomHeight === -1) {
      //   minDragDomHeight = dragDom.offsetHeight
      // }
      document.onmousemove = function(e) {
        const dx = e.clientX - px
        const dy = e.clientY - py
        let nw, nh
        let nl
        if (dragDomWidth + dx < minDragDomWidth) {
          nw = minDragDomWidth
          nl = styL - (dragDomWidth - minDragDomWidth) / 2
        } else {
          nw = dragDomWidth + dx
          nl = styL + dx / 2
        }

        if (dragDomHeight + dy < minDragDomHeight) {
          nh = minDragDomHeight
        } else {
          nh = dragDomHeight + dy
        }

        // 改变宽度
        dragDom.style.cssText += `;width:${nw}px;left:${nl}px;height:${nh}px;`
      }

      document.onmouseup = function() {
        document.onmousemove = null
        document.onmouseup = null
      }
    }

    dialogHeaderEl.onmousedown = e => {
      // 鼠标按下，计算当前元素距离可视区的距离
      const disX = e.clientX - dialogHeaderEl.offsetLeft
      const disY = e.clientY - dialogHeaderEl.offsetTop

      const dragDomWidth = dragDom.offsetWidth
      const dragDomHeight = dragDom.offsetHeight

      const screenWidth = document.body.clientWidth
      const screenHeight = document.body.clientHeight

      const minDragDomLeft = dragDom.offsetLeft
      const maxDragDomLeft = screenWidth - dragDom.offsetLeft - dragDomWidth

      const minDragDomTop = dragDom.offsetTop
      let maxDragDomTop = screenHeight - dragDom.offsetTop - dragDomHeight
      if (maxDragDomTop < -marginTop) {
        maxDragDomTop = -maxDragDomTop
      }

      // 获取到的值带px 正则匹配替换
      let styL = getStyle(dragDom, 'left')
      let styT = getStyle(dragDom, 'top')

      if (styL.includes('%')) {
        styL = +document.body.clientWidth * (+styL.replace(/%/g, '') / 100)
        styT = +document.body.clientHeight * (+styT.replace(/%/g, '') / 100)
      } else {
        styL = +styL.replace(/px/g, '')
        styT = +styT.replace(/px/g, '')
      }

      document.onmousemove = function(e) {
        // 通过事件委托，计算移动的距离
        let left = e.clientX - disX
        let top = e.clientY - disY

        // 边界处理
        if (-left > minDragDomLeft) {
          left = -minDragDomLeft
        } else if (left > maxDragDomLeft) {
          left = maxDragDomLeft
        }

        if (-top > minDragDomTop) {
          top = -minDragDomTop
        } else if (top > maxDragDomTop) {
          top = maxDragDomTop
        }

        const finallyTop = parseInt(top + styT)
        // finallyTop = finallyTop < -marginTop ? -marginTop : finallyTop

        // 移动当前元素
        dragDom.style.cssText += `;left:${left + styL}px;top:${finallyTop}px;`

        // emit onDrag event
        vnode.child.$emit('dragDialog')
      }

      document.onmouseup = function() {
        document.onmousemove = null
        document.onmouseup = null
      }
    }
  }
}
