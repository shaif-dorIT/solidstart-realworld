import { JSX } from 'solid-js'

export type MouseButtonEvent =
  | MouseEvent & { currentTarget: HTMLButtonElement; target: Element }

<<<<<<< HEAD
export type MouseLIEvent =
  | MouseEvent & { currentTarget: HTMLLIElement; target: Element }

export type TextAreaEvent = Event & {
=======
export type TextAreaChangeEvent = Event & {
>>>>>>> master
  currentTarget: HTMLTextAreaElement
  target: Element
}

<<<<<<< HEAD
export type TextInputEvent = Event & {
  currentTarget: HTMLInputElement
  target: Element
}

export type TextInputKeyboardEvent = KeyboardEvent & {
  currentTarget: HTMLInputElement
  target: Element
}
export type TextInputFocusEvent = FocusEvent & {
  currentTarget: HTMLInputElement
  target: Element
}

=======
>>>>>>> master
export type Children =
  | number
  | boolean
  | Node
  | JSX.Element
  | JSX.ArrayElement
  | JSX.FunctionElement
  | (string & Record<string, unknown>)
