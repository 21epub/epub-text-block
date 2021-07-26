/* eslint-disable prettier/prettier */
// eslint-disable-next-line no-use-before-define
import * as React from 'react'
import ContentEditable from 'react-contenteditable'
import styles from './MultiStyleText.module.less'
import { memo, useEffect, useRef, useState } from 'react'

import sanitizeHtml from 'sanitize-html'
import { MultiStyleTextProps } from '../type/Style'

export const MultiStyleText = memo(
  ({
    params: {
      editorstyle,
      editable,
      textStyle,
      textSpace,
      content,
      getMultiText,
      getHeight
    }
  }: MultiStyleTextProps) => {
    const text: { current?: string } = useRef(content)
    const [CurrentStyle, setCurrentStyle] = useState(textStyle)
    const [Editable, setEditable] = useState(editable)
    const [CurrentSpace, setCurrentSpace] = useState(textSpace)
    const [Content, setContent] = useState(content)
    let type = 'input'
    const sanitizeConf = {
      allowedTags: ['div', 'br']
    }

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

    const checkHtml = (htmlStr?: string) => {
      const reg = /<[^>]+>/g
      return reg.test(htmlStr || '')
    }
    useEffect(() => {
      setCurrentStyle(textStyle)
    }, [textStyle])

    useEffect(() => {
      setCurrentSpace(textSpace)
    }, [textSpace])

    useEffect(() => {
      setEditable(editable)
      console.log(666666, text.current)

      if (getMultiText) getMultiText(text.current || '')
    }, [editable])

    useEffect(() => {
      setContent(content)
    }, [content])

    useEffect(() => {
      if (!checkHtml(text.current)) {
        text.current = `<div>${text.current}</div>`
      }
      if (getHeight) getHeight({ height: null })
    }, [CurrentStyle, CurrentSpace])

    const handleChange = (evt: {
      target: { value: string }
      currentTarget: { clientHeight: number }
    }) => {
      if (getHeight) getHeight({ height: evt.currentTarget.clientHeight })
      // const cleanHtml = evt.target.value
      const cleanHtml = sanitizeHtml(evt.target.value, sanitizeConf)
      if (!checkHtml(cleanHtml)) {
        text.current = `<div>${cleanHtml || '<br>'}</div>`
        if (type === 'paste') {
          setContent(text.current)
        }
        type = 'input'
        return
      }
      if (
        cleanHtml === '<div><br></div>' ||
        cleanHtml === '<br>' ||
        cleanHtml === ''
      ) {
        text.current = '<div><br></div>'
        if (type === 'paste') {
          setContent(text.current)
        }
        type = 'input'
        return
      }
      text.current = cleanHtml
      if (type === 'paste') {
        setContent(text.current)
      }
      type = 'input'
    }
    const handleBlur = () => {
      //   const clean = sanitizeHtml(text.current || '', sanitizeConf)
      console.log(666666)
    }
    // const handleFocus = () => {
    //     console.log(444444, text.current);
    // }
    // const handleKeyUp = (e) => {
    //     console.log(55555, e);
    // }

    // const handleKeyDown = () => {
    //     console.log(666666, text.current);
    // }

    const handlePaste = () => {
      type = 'paste'
    }
    // const handlePastePasteCapture = (e) => {
    //     console.log(1010110, e, text.current);
    // }
    // const onCompositionEnd = (e) => {
    //     console.log(112121212, e, text.current);
    // }
    // const onLoadedData = (e) => {
    //     console.log(13131413, e, text.current);
    // }
    // const c = ''
    //   const getreg = (v) => {
    //       console.log(44444, v);
    //       c = ''
    //   }
    return (
      <ContentEditable
        // innerRef={text}
        onPaste={handlePaste}
        // onPasteCapture={handlePastePasteCapture}
        // onCompositionEnd={onCompositionEnd}
        // onLoadedData={onLoadedData}
        onBlur={handleBlur}
        // onFocus={handleFocus}
        // onKeyUp={handleKeyUp}
        // onKeyDown={handleKeyDown}
        className={`editable ${styles[CurrentStyle || '']} ${
          styles[CurrentSpace || '']
        }`}
        tagName='div'
        style={{ ...ContentEditableDefauleStyle, ...editorstyle }}
        html={Content || ''}
        disabled={!Editable}
        onChange={handleChange}
      />
    )
  }
)
