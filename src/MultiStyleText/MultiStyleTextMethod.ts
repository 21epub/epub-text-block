/* eslint-disable prettier/prettier */

import { ChangeEvent } from 'react'

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

export const Ize = (str: string) => {
  const parse = new DOMParser()
  const doc = parse.parseFromString(str, 'text/html')
  return doc.body.innerHTML
}

export const handleAfterPaste = (ev: ChangeEvent) => {
  const CurrentDom = ev.currentTarget as HTMLElement

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
    const offset = getCurrentSelectionOffset(CurrentDom)
    sel = window.getSelection()
    const StartContent = CurrentDom.firstChild
    const EndContent = CurrentDom.lastChild
    if (sel.getRangeAt && sel.rangeCount) {
      const range = document.createRange()
      const Html = Ize(StrHtml)
      const el = document.createElement('div')
      el.innerHTML = Html

      range && range.setStartBefore(StartContent as Node)
      range && range.setEndAfter(EndContent as Node)
      range && range.deleteContents()

      const frag = document.createDocumentFragment()
      let node
      while ((node = el.firstChild)) {
        frag.appendChild(node)
      }
      range && range.insertNode(frag)
      if (CurrentDom.children.length) {
        movePointerToNode(
          sel,
          CurrentDom.children[
            offset < CurrentDom.children.length
              ? offset
              : CurrentDom.children.length - 1
          ] as HTMLElement
        )
      }
    }
  }
}

export const checkHtml = (htmlStr?: string) => {
  const reg = /<[^>]+>/g
  return reg.test(htmlStr || '')
}

/**
 * 指针移动到结尾
 * @param el
 */
export const movePointerToEnd = (el: HTMLElement) => {
  el.focus()
  const range = document.createRange()
  range.selectNodeContents(el)
  range.collapse(false)
  const sel = window.getSelection()
  sel && sel.removeAllRanges()
  sel && sel.addRange(range)
}

/**
 * 指针移动到某个node节点上
 * @param sel
 * @param el
 */
export const movePointerToNode = (sel: Selection, el: HTMLElement) => {
  sel && sel.removeAllRanges()
  const range = new Range()
  if (el?.hasChildNodes())
    range.selectNodeContents(el.childNodes[el.childNodes.length - 1])
  else range.selectNode(el)
  sel && sel.addRange(range)
  sel.collapseToEnd()
}

/**
 * 获取 el 元素在 父容器的 中的位置
 * @param el
 * @returns
 */
export const getElementIndexByParent = (el: HTMLElement | Node) => {
  let result = 0
  Array.from(el.parentElement?.children || []).forEach((i, index) => {
    if (el === i) result = index
  })
  return result
}

/**
 * 获取处理后的选择文本项 在当前父容器中的偏移 Index
 * @param container
 * @returns
 */
export const getCurrentSelectionOffset = (container: HTMLElement) => {
  let offset = container.children.length - 1 // 默认就在最后
  const range = window.getSelection()?.getRangeAt(0).cloneRange()
  // 获取当前选中元素所在的节点
  const rangeContainer = range?.endContainer

  const isContainerSelf = rangeContainer === container

  if (isContainerSelf) offset = range?.startOffset || offset
  // 直接取当前节点的 offset
  else {
    const isParentContainer = rangeContainer?.parentElement === container
    if (isParentContainer) {
      offset = getElementIndexByParent(rangeContainer) || offset
    } else {
      console.log(rangeContainer)
    }
  }

  console.log(offset)
  // 需要考虑计算回车的数量
  const text = range?.toString() || ''
  const textParagraphLength =
    text?.replace(/\n\n/g, '\n')?.match(/\n/g)?.length || 0
  return offset + textParagraphLength
}
