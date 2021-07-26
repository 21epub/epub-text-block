export interface MultiStyleTextProps {
  params: {
    editorstyle?: {
      [x: string]: string
    }
    editable?: boolean
    textStyle?: string
    textSpace?: string
    content?: string
    getMultiText?: (text: string) => void
    getHeight?: (value: { height: number | null }) => void
  }
}

export interface SelectProp {
  name: string
  classname: string
}

export type SelectProps = {
  value: string
  width: number
  getSelected: ({ attr, value }: { attr: string; value: string }) => void
  name: string
  optionlist: Array<SelectProp>
  labelname?: string
}
