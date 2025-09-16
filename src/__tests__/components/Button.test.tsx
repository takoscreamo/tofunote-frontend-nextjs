import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '@/components/ui/Button'

describe('Button', () => {
  it('レンダリングされる', () => {
    render(<Button>テストボタン</Button>)
    expect(screen.getByRole('button', { name: 'テストボタン' })).toBeInTheDocument()
  })

  it('クリックイベントが発火する', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>クリック</Button>)
    
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('disabled状態でクリックイベントが発火しない', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick} disabled>無効ボタン</Button>)
    
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('異なるバリアントが正しく適用される', () => {
    const { rerender } = render(<Button variant="primary">プライマリ</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-teal-500')

    rerender(<Button variant="secondary">セカンダリ</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-teal-100')

    rerender(<Button variant="outline">アウトライン</Button>)
    expect(screen.getByRole('button')).toHaveClass('border-teal-300')

    rerender(<Button variant="danger">デンジャー</Button>)
    expect(screen.getByRole('button')).toHaveClass('text-red-600')
  })

  it('異なるサイズが正しく適用される', () => {
    const { rerender } = render(<Button size="sm">小</Button>)
    expect(screen.getByRole('button')).toHaveClass('px-3', 'py-1.5', 'text-sm')

    rerender(<Button size="md">中</Button>)
    expect(screen.getByRole('button')).toHaveClass('px-4', 'py-2')

    rerender(<Button size="lg">大</Button>)
    expect(screen.getByRole('button')).toHaveClass('px-6', 'py-3', 'text-lg')
  })

  it('fullWidthプロパティが正しく適用される', () => {
    render(<Button fullWidth>全幅ボタン</Button>)
    expect(screen.getByRole('button')).toHaveClass('w-full')
  })

  it('カスタムクラス名が適用される', () => {
    render(<Button className="custom-class">カスタム</Button>)
    expect(screen.getByRole('button')).toHaveClass('custom-class')
  })

  it('type属性が正しく設定される', () => {
    render(<Button type="submit">送信</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit')
  })

  it('disabled属性が正しく設定される', () => {
    render(<Button disabled>無効</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
