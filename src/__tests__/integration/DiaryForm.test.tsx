import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { DiaryForm } from '@/app/(app)/diary/DiaryForm'

// Next.jsのImageコンポーネントをモック
jest.mock('next/image', () => {
  return function MockImage({ src, alt, ...props }: { src: string; alt: string; [key: string]: unknown }) {
    return <img src={src} alt={alt} {...props} />
  }
})

describe('DiaryForm Integration Tests', () => {
  const defaultFormData = {
    date: '2024-01-15',
    mentalScore: 5,
    content: '',
  }

  const defaultProps = {
    formData: defaultFormData,
    onDateChange: jest.fn(),
    onPreviousDay: jest.fn(),
    onNextDay: jest.fn(),
    onMentalScoreChange: jest.fn(),
    onContentChange: jest.fn(),
    onSubmit: jest.fn(),
    isLoading: false,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('フォーム全体がレンダリングされる', () => {
    render(<DiaryForm {...defaultProps} />)
    
    expect(screen.getByLabelText('日付')).toBeInTheDocument()
    expect(screen.getByLabelText('今日のメンタルは？')).toBeInTheDocument()
    expect(screen.getByLabelText('日記')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '保存' })).toBeInTheDocument()
  })

  it('フォーム送信が正しく動作する', () => {
    const onSubmit = jest.fn()
    
    render(<DiaryForm {...defaultProps} onSubmit={onSubmit} />)
    
    const submitButton = screen.getByRole('button', { name: '保存' })
    fireEvent.click(submitButton)
    
    expect(onSubmit).toHaveBeenCalled()
  })

  it('メンタルスコアの変更が正しく動作する', () => {
    const onMentalScoreChange = jest.fn()
    
    render(<DiaryForm {...defaultProps} onMentalScoreChange={onMentalScoreChange} />)
    
    const slider = screen.getByRole('slider')
    fireEvent.change(slider, { target: { value: '7' } })
    
    expect(onMentalScoreChange).toHaveBeenCalledWith(7)
  })

  it('日記内容の変更が正しく動作する', () => {
    const onContentChange = jest.fn()
    
    render(<DiaryForm {...defaultProps} onContentChange={onContentChange} />)
    
    const textarea = screen.getByLabelText('日記')
    fireEvent.change(textarea, { target: { value: '今日は良い日でした' } })
    
    expect(onContentChange).toHaveBeenCalledWith('今日は良い日でした')
  })

  it('日付の変更が正しく動作する', () => {
    const onDateChange = jest.fn()
    
    render(<DiaryForm {...defaultProps} onDateChange={onDateChange} />)
    
    const dateInput = screen.getByLabelText('日付')
    fireEvent.change(dateInput, { target: { value: '2024-01-14' } })
    
    expect(onDateChange).toHaveBeenCalledWith('2024-01-14')
  })

  it('前の日ボタンが正しく動作する', () => {
    const onPreviousDay = jest.fn()
    
    render(<DiaryForm {...defaultProps} onPreviousDay={onPreviousDay} />)
    
    const prevButton = screen.getByRole('button', { name: '前の日' })
    fireEvent.click(prevButton)
    
    expect(onPreviousDay).toHaveBeenCalled()
  })

  it('次の日ボタンが正しく動作する', () => {
    const onNextDay = jest.fn()
    
    render(<DiaryForm {...defaultProps} onNextDay={onNextDay} />)
    
    const nextButton = screen.getByRole('button', { name: '次の日' })
    fireEvent.click(nextButton)
    
    expect(onNextDay).toHaveBeenCalled()
  })

  it('ローディング状態が正しく表示される', () => {
    render(<DiaryForm {...defaultProps} isLoading={true} />)
    
    expect(screen.getByRole('button', { name: '保存中...' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '保存中...' })).toBeDisabled()
  })

  it('削除ボタンが表示される（onDeleteDiaryが提供された場合）', () => {
    const onDeleteDiary = jest.fn()
    render(<DiaryForm {...defaultProps} onDeleteDiary={onDeleteDiary} />)
    
    expect(screen.getByRole('button', { name: '削除' })).toBeInTheDocument()
  })

  it('削除ボタンがクリックされた時にonDeleteDiaryが呼ばれる', () => {
    const onDeleteDiary = jest.fn()
    
    render(<DiaryForm {...defaultProps} onDeleteDiary={onDeleteDiary} />)
    
    const deleteButton = screen.getByRole('button', { name: '削除' })
    fireEvent.click(deleteButton)
    
    expect(onDeleteDiary).toHaveBeenCalled()
  })

  it('削除ボタンが表示されない（onDeleteDiaryが提供されない場合）', () => {
    render(<DiaryForm {...defaultProps} />)
    
    expect(screen.queryByRole('button', { name: '削除' })).not.toBeInTheDocument()
  })

  it('フォームの初期値が正しく設定される', () => {
    const formData = {
      date: '2024-01-10',
      mentalScore: 8,
      content: 'テストの日記内容',
    }
    
    render(<DiaryForm {...defaultProps} formData={formData} />)
    
    expect(screen.getByDisplayValue('2024-01-10')).toBeInTheDocument()
    expect(screen.getByDisplayValue('8')).toBeInTheDocument()
    expect(screen.getByDisplayValue('テストの日記内容')).toBeInTheDocument()
  })

  it('メンタルスコアに応じて豆腐の種類が表示される', () => {
    const formData = {
      ...defaultFormData,
      mentalScore: 3,
    }
    
    render(<DiaryForm {...defaultProps} formData={formData} />)
    
    expect(screen.getByText('絹豆腐メンタル')).toBeInTheDocument()
    expect(screen.getByText('今日はもう限界かも。。。')).toBeInTheDocument()
  })
})
