import React from 'react'
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import Home from '../../pages'

/* 実施するテストケース

- レンダリング
*/

jest.mock('next/router', () => ({
  useRouter() {
    return {
      asPath: '/',
    }
  },
}))

beforeEach(() => {
  cleanup()
})

afterEach(() => {
  cleanup()
})

describe('Unit', () => {
  it('Rendering h1 Component', () => {
    act(() => {
      render(<Home />)
    })
    expect(screen.getByText(/welcome to next.js/i)).toBeInTheDocument()
  })
  it('Rendering Link Component', () => {
    act(() => {
      render(<Home />)
    })
    expect(
      screen.getByRole('link', { name: /this is a link/i }),
    ).toBeInTheDocument()
  })
  it('Rendering Button Action', () => {
    act(() => {
      render(<Home />)
    })
    // find an element with a role of button and text of "change to blue"
    const btn = screen.getByRole('button', { name: /change to red/i })

    // detail of test
    expect(btn).toHaveClass('bg-red-500')
    expect(btn).toHaveStyle({ color: 'white' })

    // click the button
    fireEvent.click(btn)

    // expect the background color to be red
    expect(btn.textContent).toBe('Change to Blue')
    expect(btn).toHaveClass('bg-blue-500')

    // click the button
    fireEvent.click(btn)

    // expect the background color to be red
    expect(btn.textContent).toBe('Change to Red')
    expect(btn).toHaveClass('bg-red-500')
  })
  it('initial conditions', () => {
    act(() => {
      render(<Home />)
    })
    // check that the button starts out enabled
    const btn = screen.getByRole('button', { name: /change to red/i })
    expect(btn).toBeEnabled()

    // check that the checkbox starts out unchecked
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).not.toBeChecked()
  })
  it('Checkbox disables button on first click and enables on second click', () => {
    act(() => {
      render(<Home />)
    })
    const btn = screen.getByRole('button', { name: /change to red/i })
    const checkbox = screen.getByRole('checkbox')

    fireEvent.click(checkbox)
    expect(btn).toBeDisabled()

    fireEvent.click(checkbox)
    expect(btn).toBeEnabled()
  })
})
