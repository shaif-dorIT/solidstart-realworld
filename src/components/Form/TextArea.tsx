import type { TextAreaEvent } from '~/types'

type TextAreaProps = {
  value: string
  placeholder: string
  disabled?: boolean
  rows?: string | number
  type?: 'text' | 'password'
  onChange?: (ev: TextAreaEvent) => void
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
