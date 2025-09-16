import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { MentalScoreSlider } from '@/components/ui/MentalScoreSlider'

// Next.jsのImageコンポーネントをモック
jest.mock('next/image', () => {
  return function MockImage({ src, alt, ...props }: { src: string; alt: string; [key: string]: unknown }) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} {...props} />
  }
})

describe('MentalScoreSlider', () => {
  const defaultProps = {
    value: 5,
    onChange: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('レンダリングされる', () => {
    render(<MentalScoreSlider {...defaultProps} />)
    expect(screen.getByLabelText('今日のメンタルは？')).toBeInTheDocument()
    expect(screen.getByDisplayValue('5')).toBeInTheDocument()
  })

  it('カスタムラベルが表示される', () => {
    render(<MentalScoreSlider {...defaultProps} label="カスタムラベル" />)
    expect(screen.getByLabelText('カスタムラベル')).toBeInTheDocument()
  })

  it('スライダーの値が変更されるとonChangeが呼ばれる', () => {
    const onChange = jest.fn()
    render(<MentalScoreSlider {...defaultProps} onChange={onChange} />)
    
    const slider = screen.getByRole('slider')
    fireEvent.change(slider, { target: { value: '7' } })
    
    expect(onChange).toHaveBeenCalledWith(7)
  })

  it('最小値と最大値が正しく設定される', () => {
    render(<MentalScoreSlider {...defaultProps} min={0} max={20} />)
    
    const slider = screen.getByRole('slider')
    expect(slider).toHaveAttribute('min', '0')
    expect(slider).toHaveAttribute('max', '20')
  })

  it('スコア1-3で絹豆腐メンタルが表示される', () => {
    render(<MentalScoreSlider {...defaultProps} value={2} />)
    
    expect(screen.getByText('絹豆腐メンタル')).toBeInTheDocument()
    expect(screen.getByText('今日はもう限界かも。。。')).toBeInTheDocument()
    expect(screen.getByAltText('絹豆腐メンタル')).toHaveAttribute('src', '/tofu-kinu.png.webp')
  })

  it('スコア4-6で木綿豆腐メンタルが表示される', () => {
    render(<MentalScoreSlider {...defaultProps} value={5} />)
    
    expect(screen.getByText('木綿豆腐メンタル')).toBeInTheDocument()
    expect(screen.getByText('まあまあキツい。')).toBeInTheDocument()
    expect(screen.getByAltText('木綿豆腐メンタル')).toHaveAttribute('src', '/tofu-momen.png.webp')
  })

  it('スコア7-9で焼き豆腐メンタルが表示される', () => {
    render(<MentalScoreSlider {...defaultProps} value={8} />)
    
    expect(screen.getByText('焼き豆腐メンタル')).toBeInTheDocument()
    expect(screen.getByText('わりかし元気〜！')).toBeInTheDocument()
    expect(screen.getByAltText('焼き豆腐メンタル')).toHaveAttribute('src', '/tofu-yaki.png.webp')
  })

  it('スコア10で鋼のメンタルが表示される', () => {
    render(<MentalScoreSlider {...defaultProps} value={10} />)
    
    expect(screen.getByText('鋼のメンタル')).toBeInTheDocument()
    expect(screen.getByText('自分サイキョー！！！！！')).toBeInTheDocument()
    expect(screen.getByAltText('鋼のメンタル')).toHaveAttribute('src', '/tofu-hagane.png.webp')
  })

  it('スコア0で鋼のメンタルが表示される（デフォルトケース）', () => {
    render(<MentalScoreSlider {...defaultProps} value={0} />)
    
    expect(screen.getByText('鋼のメンタル')).toBeInTheDocument()
    expect(screen.getByText('自分サイキョー！！！！！')).toBeInTheDocument()
  })

  it('現在の値が表示される', () => {
    render(<MentalScoreSlider {...defaultProps} value={7} />)
    expect(screen.getByText('7')).toBeInTheDocument()
  })
})
