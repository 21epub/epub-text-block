// eslint-disable-next-line no-use-before-define
import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { MultiStyleText } from './MultiStyleText'
import { MultiStyleTextProps } from '../type/Style'

export default {
  title: 'MultiStyleText',
  component: MultiStyleText,
  argTypes: {
    editable: {
      name: '是否编辑',
      type: { name: 'boolean', required: false }
    },
    editorstyle: {
      name: '编辑器样式',
      type: { name: 'object', required: false }
    }
  }
} as Meta

const Template: Story<MultiStyleTextProps> = (args) => (
  <MultiStyleText {...args} />
)

const getMultiText = (val) => {
  console.log(2222221, val)
}
const calculateAdaptiveHeight = (val) => {
  console.log(3333331, val)
}
export const textblock = Template.bind({})
textblock.args = {
  params: {
    editable: true,
    editorstyle: { width: '100%' },
    // textSpace: 'ep-alert-info',
    textSpace: 'ep-list05',
    textStyle: 'spacing-15',
    content: '<div>test</div>',
    getMultiText: getMultiText,
    getHeight: calculateAdaptiveHeight
  }
}
textblock.parameters = {
  backgrounds: {
    values: [
      { name: 'white', value: '#fff' },
      { name: 'black', value: '#000' }
    ]
  }
}
