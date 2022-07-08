/* eslint-disable prettier/prettier */
// eslint-disable-next-line no-use-before-define
import * as React from 'react'
import ContentEditable from 'react-contenteditable'
import styles from './MultiStyleText.module.less'
import { ChangeEvent, memo, useEffect, useRef, useState } from 'react'

import { MultiStyleTextProps } from '../type/Style'
import {
  checkHtml,
  getCurrentSelectionOffset,
  handleAfterPaste,
  handleContent,
  insertHtmlAtSelectionEnd
} from './MultiStyleTextMethod'

export const MultiStyleText = memo(
  ({
    params: {
      className = '',
      editorstyle,
      editable,
      textStyle,
      textSpace,
      content,
      getMultiText,
      getHeight
    }
  }: MultiStyleTextProps) => {
    const [texts, setText] = useState({ html: content })
    const text: { current?: string } = useRef(content)
    const [CurrentStyle, setCurrentStyle] = useState(textStyle)
    const [Editable, setEditable] = useState(editable)
    const [CurrentSpace, setCurrentSpace] = useState(textSpace)

    // useEffect(() => {
    //   setText({ html: content })
    // }, [content])
    const init =
      CurrentStyle === 'ep-blocks'
        ? { width: '600px', padding: '165px 9px 28px 12px' }
        : {}

    const ContentEditableDefauleStyle = {
      width: '100%',
      whiteSpace: 'pre-wrap',
      wordWrap: 'break-word',
      wordBreak: 'break-all',
      minHeight: '30px',
      ...init
    }

    useEffect(() => {
      setCurrentStyle(textStyle)
    }, [textStyle])

    useEffect(() => {
      setCurrentSpace(textSpace)
    }, [textSpace])

    useEffect(() => {
      setEditable(editable)
      if (getMultiText && editable) getMultiText(texts.html || '')
    }, [editable])

    useEffect(() => {
      if (!checkHtml(texts.html)) {
        // text.current =
        setText({ html: `<div>${texts.html}</div>` })
      }
      if (getHeight) getHeight({ height: null })
    }, [CurrentStyle, CurrentSpace])

    const handleChange = (evt: {
      target: { value: string }
      currentTarget: { clientHeight: number; innerHTML: string }
    }) => {
      if (
        !evt.currentTarget.innerHTML ||
        evt.currentTarget.innerHTML === '<br>'
      ) {
        setText({ html: '<div><br></div>' })
      }
      setText({ html: evt.currentTarget?.innerHTML || '<div><br></div>' })
      if (getHeight) getHeight({ height: evt.currentTarget.clientHeight })
      if (getMultiText)
        getMultiText(evt.currentTarget?.innerHTML || '<div><br></div>')
    }
    const handlePaste = (ev: React.ClipboardEvent<HTMLDivElement>) => {
      const cleanHtml = ev.clipboardData.getData('text')
      ev.clipboardData.setData('text/html', cleanHtml)
      insertHtmlAtSelectionEnd(cleanHtml, false)
      const offset = getCurrentSelectionOffset(ev.currentTarget)
      const content = handleContent((ev as unknown) as ChangeEvent)
      // setText({ html: content })
      handleAfterPaste((ev as unknown) as ChangeEvent<Element>, content, offset)
      ev.preventDefault()
      // if (getHeight) getHeight({ height: ev.currentTarget.clientHeight })
    }
    console.log(texts.html, text.current)

    return (
      <ContentEditable
        onPaste={handlePaste}
        className={`editable ${className} ${styles[CurrentStyle || '']} ${
          styles[CurrentSpace || '']
        }`}
        tagName='div'
        style={{ ...ContentEditableDefauleStyle, ...editorstyle }}
        html={texts.html || '<div><br></div>'}
        disabled={!Editable}
        onChange={handleChange}
      />
    )
  }
)
