/* eslint-disable prettier/prettier */

export const insertHtmlAtSelectionEnd = (html: string, isBefore: boolean) => {
  let sel: any, range
  if (window.getSelection) {
    sel = window.getSelection()
    if (sel.getRangeAt && sel.rangeCount) {
      range = window.getSelection()?.getRangeAt(0)
      range && range.collapse(isBefore)
      const el = document.createElement('div')
      el.innerHTML = html
      const frag = document.createDocumentFragment()
      let node
      // let lastNode
      while ((node = el.firstChild)) {
        //    let lastNode =
        frag.appendChild(node)
      }
      range && range.insertNode(frag)
    }
  } else if (
    (document as any).selection &&
    (document as any).selection.createRange
  ) {
    range = (document as any).selection.createRange()
    range.collapse(isBefore)
    range.pasteHTML(html)
  }
}
