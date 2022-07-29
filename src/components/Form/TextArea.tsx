import type { TextAreaChangeEvent } from '~/types'

type TextAreaProps = {
  rows: string | number
  value: string
  disabled?: boolean
  placeholder: string
  onChange?: (ev: TextAreaChangeEvent) => void
  type?: 'text' | 'password'
}

export default (props: TextAreaProps) => {
  return (
    <fieldset class='form-group'>
      <textarea
        class='form-control form-control-lg'
        rows={props.rows}
        placeholder={props.placeholder}
        value={props.value}
        onChange={(event) => props.onChange(event)}
        disabled={props.disabled}
      />
    </fieldset>
  )
}
