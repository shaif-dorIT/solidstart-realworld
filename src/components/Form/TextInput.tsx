<<<<<<< HEAD
import type {
  Children,
  TextInputEvent,
  TextInputFocusEvent,
  TextInputKeyboardEvent
} from '~/types'
=======
import type { Children } from '~/types'
>>>>>>> master

type TextInputProps = {
  children?: Children
  value: string
  disabled?: boolean
  placeholder: string
<<<<<<< HEAD
  onBlur?: (ev: any) => void
  onKeyUp?: (ev: any) => void
  onChange?: (ev: any) => void
=======
<<<<<<< HEAD
  onBlur?: (ev: TextInputFocusEvent) => void
  onKeyUp?: (ev: TextInputKeyboardEvent) => void
  onChange?: (ev: TextInputEvent) => void
=======
  onBlur?: (ev: any) => void
  onKeyUp?: (ev: any) => void
  onChange?: (ev: any) => void
>>>>>>> master
>>>>>>> 4af4b2cfbde519398a69976e4cbf0b831d966671
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
