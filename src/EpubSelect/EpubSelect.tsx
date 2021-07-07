import * as React from 'react'
import { attrs } from './text'

import styles from './EpubSelect.module.less'

export const EpubSelect = ({ name, getSelected }) => {
    const getSelect = (eve) => {
        const { value } = eve.target
        getSelected({ attr: name, value: value })
    }
    return (
        <select className={styles.select} name={name} onChange={getSelect}>
            {attrs.styles.map(it => {
                return (
                    <option className="c-option option_RejMHq" value={it.classname}>{it.name}</option>
                )
            })}
        </select>
    )
}


