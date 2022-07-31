import { describe, expect, test } from 'vitest'
import { render, fireEvent } from 'solid-testing-library'
import Counter from './Counter'

describe('<Counter />', () => {
  test('renders', () => {
    const { container, unmount } = render(() => <Counter />)
    expect(container).toMatchSnapshot()
    unmount()
  })

  test('increments value', async () => {
    const { queryByRole, unmount } = render(() => <Counter />)
    const button = (await queryByRole('button')) as HTMLButtonElement
    expect(button).toBeCalled()
    expect(button).toHaveProperty('textContent', 'Clicks: 0')
    fireEvent.click(button)
    expect(button).toHaveProperty('textContent', 'Clicks: 1')
    unmount()
  })
})
