<<<<<<< HEAD
import type { TextAreaEvent } from '~/types'

type TextAreaProps = {
  value: string
  placeholder: string
  disabled?: boolean
  rows?: string | number
  type?: 'text' | 'password'
  onChange?: (ev: TextAreaEvent) => void
=======
import type { TextAreaChangeEvent } from '~/types'

type TextAreaProps = {
  rows: string | number
  value: string
  disabled?: boolean
  placeholder: string
  onChange?: (ev: TextAreaChangeEvent) => void
  type?: 'text' | 'password'
>>>>>>> master
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
