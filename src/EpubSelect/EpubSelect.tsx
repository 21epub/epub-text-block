/* eslint-disable no-use-before-define */
import * as React from 'react'
import { SelectProps } from '../type/Style'
import styles from './EpubSelect.module.less'

export const EpubSelect = ({ optionlist, name, getSelected }: SelectProps) => {
  const getSelect = (eve: { target: { value: string } }) => {
    const { value } = eve.target
    getSelected({ attr: name, value: value })
  }
  return (
    <select className={styles.select} name={name} onChange={getSelect}>
      {optionlist.map((it) => {
        return (
          <option
            className='c-option option_RejMHq'
            value={it.classname}
            key={it.classname || 'init'}
          >
            {it.name}
          </option>
        )
      })}
    </select>
  )
}
