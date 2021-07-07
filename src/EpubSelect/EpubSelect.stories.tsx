
import React from 'react'
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0'

import { EpubSelect } from './EpubSelect'
// import 'antd/es/button/style/index.css'

export default {
    title: 'EpubSelect',
    component: EpubSelect,
    argTypes: {
        text: {
            name: '文本',
            type: { name: 'string', required: false }
        }
    }
} as Meta

const Template: Story<{ text: string }> = (args) => (
    <EpubSelect {...args} />
)

export const textblock = Template.bind({})
textblock.args = {
    text: 'This is a example'
}
textblock.parameters = {
    backgrounds: {
        values: [
            { name: 'white', value: '#fff' },
            { name: 'black', value: '#000' }
        ]
    }
}
