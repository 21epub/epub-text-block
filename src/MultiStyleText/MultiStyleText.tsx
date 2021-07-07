import * as React from 'react'
// import React from "react";
import ContentEditable from "react-contenteditable";
import styles from './MultiStyleText.module.less'
import Button from 'antd/es/button'
import { useEffect, useState } from 'react';
import { attrs } from './text';
import { EpubSelect } from '../EpubSelect/EpubSelect';
// import sanitizeHtml from "sanitize-html";
// text = view.gettext()
//                 .replace(/<\/div><br><div>/g, "\n\n\t")
//                 .replace(/<\/div><br><br><div>/g, "\n\n\n\t")
//                 .replace(/<\/div><br>/g, "\n\n").replace(/<br><div>/g, "\n\t")
//                 .replace(/<br>/g, "\n")
//                 .replace(/<\/div><div>/g, "\n\t")
//                 .replace(/<div>/g, "\t").replace(/<\/div>/g, "").replace(/\&nbsp;/g, ' ')
//         } else {
//             text = view.gettext()
//                 .replace(/<\/div><br><div>/g, "\n\n")
//                 .replace(/<\/div><br><br><div>/g, "\n\n\n")
//                 .replace(/<\/div><br>/g, "\n\n").replace(/<br><div>/g, "\n")
//                 .replace(/<br>/g, "\n")
//                 .replace(/<\/div><div>/g, "\n")
//                 .replace(/<div>/g, "").replace(/<\/div>/g, "").replace(/\&nbsp;/g, ' ')

//                 .replace(/\n/g, "</div><div>").replace(/<div><\/div>/g, "<br>").replace(/ /g,'&nbsp;')

interface Props {
    editorstyle: {
        [x: string]: string
    },
    editable: boolean
}


export const MultiStyleText = ({ editorstyle, editable = true }: Props) => {

    const [CurrentStyle, setCurrentStyle] = useState('')

    const [Html, setHtml] = useState('<div>编辑多样式文本模块</div><div>编辑多样式文本模块</div><div>编辑多样式文本模块</div>')


    const init = CurrentStyle === 'ep-blocks' ? { width: '600px', padding: '165px 9px 28px 12px' } : {}
    const ContentEditableDefauleStyle = {
        width: '500px',
        // display: 'inline-block',
        whiteSpace: 'pre-wrap',
        wordWrap: 'break-word',
        wordBreak: 'break-all',
        minHeight: '30px',
        ...init
    }

    const checkHtml = (htmlStr) => {
        var reg = /<[^>]+>/g;
        return reg.test(htmlStr);
    }
    useEffect(() => {
        if (!checkHtml(Html)) {
            setHtml(`<div>${Html}</div>`)
        }
        return () => {

        };
    }, [CurrentStyle])
    const handleChange = (evt) => {
        if (!checkHtml(evt.target.value)) {
            setHtml(`<div>${evt.target.value}</div>`)
            return
        }
        console.log(3456666, evt.target.value, '<div><br></div>' === evt.target.value, '<br>' === evt.target.value, evt.target.value === "");
        if ('<div><br></div>' === evt.target.value || '<br>' === evt.target.value || evt.target.value === "") {
            setHtml('<div><br></div>')
            return
        }
        setHtml(evt.target.value)
    }
    const getSelected = (msg) => {
        const { value } = msg
        setCurrentStyle(value)
    }
    console.log(999999, Html);

    return (
        <>
            <EpubSelect name={'text-style'} getSelected={getSelected}></EpubSelect>
            <ContentEditable
                className={`editable ${styles[CurrentStyle]}`}
                tagName="div"
                style={{ ...ContentEditableDefauleStyle, ...editorstyle }}
                html={Html}
                disabled={!editable}
                onChange={handleChange}
            />
        </>
    )
}