import type {
  Children,
  TextInputEvent,
  TextInputFocusEvent,
  TextInputKeyboardEvent
} from '~/types'

type TextInputProps = {
  children?: Children
  value: string
  disabled?: boolean
  placeholder: string
  onBlur?: (ev: TextInputFocusEvent) => void
  onKeyUp?: (ev: TextInputKeyboardEvent) => void
  onChange?: (ev: TextInputEvent) => void
  type?: 'text' | 'password'
}

export default (props: TextInputProps) => {
  const events = () => {
    return {
      onBlur: props.onBlur,
      onKeyUp: props.onKeyUp,
      onChange: props.onChange
    }
  }
  return (
    <fieldset class='form-group'>
      <input
        class='form-control form-control-lg'
        type={props.type}
        value={props.value}
        disabled={props.disabled}
        onBlur={events().onBlur}
        onKeyUp={events().onKeyUp}
        onChange={events().onChange}
        placeholder={props.placeholder}
      />
      {props.children}
    </fieldset>
  )
}
