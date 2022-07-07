/* eslint-disable prettier/prettier */

export const insertHtmlAtSelectionEnd = (html: string, isBefore: boolean) => {
  let sel: any, range
  if (window.getSelection) {
    sel = window.getSelection()
    if (sel.getRangeAt && sel.rangeCount) {
      range = window.getSelection()?.getRangeAt(0)
      range && range?.extractContents() && range.collapse(isBefore)
      const el = document.createElement('div')
      el.innerHTML = html
      const frag = document.createDocumentFragment()
      let node
      while ((node = el.firstChild)) {
        frag.appendChild(node)
      }
      range && range.insertNode(frag)
      sel.addRange(range)
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

export const Ize = (str) => {
  const parse = new DOMParser()
  const doc = parse.parseFromString(str, 'text/html')
  return doc.body.innerHTML
}

export const handleAfterPaste = (ev) => {
  const CurrentDom = ev.currentTarget

  const CleanDiv = /<div>/g
  const ReplaceEndDiv = /<\/div>/g

  const StandardString = ev.currentTarget.innerHTML
    .replace(CleanDiv, '')
    .replace(ReplaceEndDiv, '\n')

  const regex = /(\r)?\n/gi
  const NullDiv = /<div><\/div>/g

  let StrHtml = StandardString.replace(regex, '</div><div>')

  if (!StrHtml.startsWith('<div>') && !StrHtml.endsWith('</div>')) {
    StrHtml = `<div>${StrHtml}</div>`
  }
  StrHtml = StrHtml.replace(NullDiv, '')

  let sel: any
  if (window.getSelection) {
    sel = window.getSelection()
    const StartContent = CurrentDom.firstChild
    const EndContent = CurrentDom.lastChild
    if (sel.getRangeAt && sel.rangeCount) {
      const range = document.createRange()
      const Html = Ize(StrHtml)
      const el = document.createElement('div')
      el.innerHTML = Html

      range && range.setStartBefore(StartContent)
      range && range.setEndAfter(EndContent)
      range && range.deleteContents()

      const frag = document.createDocumentFragment()
      let node
      while ((node = el.firstChild)) {
        frag.appendChild(node)
      }
      range && range.insertNode(frag)
      movePointerToEnd(CurrentDom)
    }
  }
}

export const checkHtml = (htmlStr?: string) => {
  const reg = /<[^>]+>/g
  return reg.test(htmlStr || '')
}

export const movePointerToEnd = (el: HTMLElement) => {
  el.focus()
  const range = document.createRange()
  range.selectNodeContents(el)
  range.collapse(false)
  const sel = window.getSelection()
  sel && sel.removeAllRanges()
  sel && sel.addRange(range)
}
