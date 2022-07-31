import { JSX } from 'solid-js'

export type MouseButtonEvent =
  | MouseEvent & { currentTarget: HTMLButtonElement; target: Element }

export type MouseLIEvent =
  | MouseEvent & { currentTarget: HTMLLIElement; target: Element }

export type TextAreaEvent = Event & {
  currentTarget: HTMLTextAreaElement
  target: Element
}

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

export type Children =
  | number
  | boolean
  | Node
  | JSX.Element
  | JSX.ArrayElement
  | JSX.FunctionElement
  | (string & Record<string, unknown>)
