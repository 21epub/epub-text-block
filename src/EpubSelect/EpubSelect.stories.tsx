// eslint-disable-next-line no-use-before-define
import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { EpubSelect } from './EpubSelect'
import { SelectProps } from '../type/Style'
import { attrs } from '../MultiStyleText/text'

export default {
  title: 'EpubSelect',
  component: EpubSelect,
  argTypes: {
    name: {
      name: 'select组件name属性',
      type: { name: 'string', required: false }
    },
    optionlist: {
      name: 'option选项',
      type: { optionlist: 'array', required: false }
    },
    getSelected: {
      name: '获取select选项',
      type: { getSelected: 'function', required: false }
    }
  }
} as Meta

const Template: Story<SelectProps> = (args) => <EpubSelect {...args} />
const getSelected = (msg: { value: string }) => {
  console.log(44444, msg)
}

export const textblock = Template.bind({})
textblock.args = {
  name: 'text-style',
  optionlist: attrs.styles,
  getSelected: getSelected
}
textblock.parameters = {
  backgrounds: {
    values: [
      { name: 'white', value: '#fff' },
      { name: 'black', value: '#000' }
    ]
  }
}
