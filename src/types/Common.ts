import { JSX } from 'solid-js'

export type MouseButtonEvent =
  | MouseEvent & { currentTarget: HTMLButtonElement; target: Element }

export type TextAreaChangeEvent = Event & {
  currentTarget: HTMLTextAreaElement
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
