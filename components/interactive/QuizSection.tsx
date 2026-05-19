'use client';
import { useState } from 'react';
import type { QuizQuestion, I18nContent } from '@/types';

interface Props {
  questions: QuizQuestion[];
  t: I18nContent['topic'];
}

export default function QuizSection({ questions, t }: Props) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null));

  const question = questions[current];

  const handleCheck = () => {
    if (selected === null) return;
    setChecked(true);
    if (selected === question.correct) {
      setScore(prev => prev + 1);
    }
    const newAnswers = [...answers];
    newAnswers[current] = selected;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (current + 1 >= questions.length) {
      setDone(true);
    } else {
      setCurrent(prev => prev + 1);
      setSelected(null);
      setChecked(false);
    }
  };

  const retake = () => {
    setCurrent(0);
    setSelected(null);
    setChecked(false);
    setScore(0);
    setDone(false);
    setAnswers(new Array(questions.length).fill(null));
  };

  const percentage = Math.round((score / questions.length) * 100);

  return (
    <div id="quiz" style={{ marginTop: '3rem' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '1.5rem',
      }}>
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '8px',
          background: 'rgba(0, 212, 170, 0.1)',
          border: '1px solid rgba(0, 212, 170, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1rem',
        }}>✦</div>
        <div>
          <h2 style={{
            fontFamily: 'IBM Plex Mono, monospace',
            fontSize: '1.125rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            margin: 0,
          }}>{t.quizTitle}</h2>
          <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', margin: '2px 0 0', fontFamily: 'Outfit, sans-serif' }}>
            {t.quizSubtitle}
          </p>
        </div>
      </div>

      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: '12px',
        overflow: 'hidden',
      }}>
        {done ? (
          /* Results screen */
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            <div style={{
              fontSize: '3rem',
              marginBottom: '0.75rem',
            }}>
              {percentage >= 80 ? '🎯' : percentage >= 60 ? '📈' : '📚'}
            </div>
            <h3 style={{
              fontFamily: 'IBM Plex Mono, monospace',
              fontSize: '1.5rem',
              color: 'var(--accent-primary)',
              margin: '0 0 0.5rem',
            }}>
              {score}/{questions.length}
            </h3>
            <p style={{
              color: 'var(--text-secondary)',
              fontFamily: 'Outfit, sans-serif',
              margin: '0 0 0.25rem',
            }}>
              {t.score}: {percentage}%
            </p>
            <p style={{
              color: 'var(--text-muted)',
              fontSize: '0.875rem',
              fontFamily: 'Outfit, sans-serif',
              marginBottom: '1.5rem',
            }}>
              {percentage >= 80 ? '🔥 Excellent! You really know your Docker.' :
               percentage >= 60 ? 'Good progress! Review the sections you missed.' :
               'Keep studying — revisit the topic and try again.'}
            </p>
            <button
              onClick={retake}
              style={{
                background: 'var(--accent-primary)',
                color: '#000',
                border: 'none',
                borderRadius: '8px',
                padding: '0.6rem 1.5rem',
                fontFamily: 'IBM Plex Mono, monospace',
                fontSize: '0.825rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              ↻ {t.retake}
            </button>
          </div>
        ) : (
          /* Question screen */
          <div style={{ padding: '1.5rem' }}>
            {/* Progress */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.25rem',
            }}>
              <span style={{
                fontSize: '0.75rem',
                fontFamily: 'IBM Plex Mono, monospace',
                color: 'var(--text-muted)',
              }}>
                {current + 1} / {questions.length}
              </span>
              <div style={{
                flex: 1,
                height: '3px',
                background: 'var(--border)',
                borderRadius: '2px',
                margin: '0 1rem',
                overflow: 'hidden',
              }}>
                <div style={{
                  height: '100%',
                  width: `${((current + (checked ? 1 : 0)) / questions.length) * 100}%`,
                  background: 'var(--accent-primary)',
                  borderRadius: '2px',
                  transition: 'width 0.4s ease',
                }} />
              </div>
              <span style={{
                fontSize: '0.75rem',
                fontFamily: 'IBM Plex Mono, monospace',
                color: 'var(--accent-primary)',
              }}>
                {score} ✓
              </span>
            </div>

            {/* Question */}
            <p style={{
              fontSize: '1rem',
              color: 'var(--text-primary)',
              fontFamily: 'Outfit, sans-serif',
              fontWeight: 500,
              marginBottom: '1.25rem',
              lineHeight: 1.6,
            }}>
              {question.question}
            </p>

            {/* Options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '1.25rem' }}>
              {question.options.map((option, i) => {
                const isSelected = selected === i;
                const isCorrect = i === question.correct;
                const showResult = checked;

                let borderColor = 'var(--border)';
                let bg = 'var(--bg-surface)';
                let textColor = 'var(--text-secondary)';

                if (showResult && isCorrect) {
                  borderColor = 'rgba(0, 212, 170, 0.6)';
                  bg = 'rgba(0, 212, 170, 0.08)';
                  textColor = '#00d4aa';
                } else if (showResult && isSelected && !isCorrect) {
                  borderColor = 'rgba(247, 79, 79, 0.6)';
                  bg = 'rgba(247, 79, 79, 0.08)';
                  textColor = '#f74f4f';
                } else if (!showResult && isSelected) {
                  borderColor = 'var(--accent-secondary)';
                  bg = 'rgba(79, 142, 247, 0.08)';
                  textColor = 'var(--text-primary)';
                }

                return (
                  <button
                    key={i}
                    disabled={checked}
                    onClick={() => setSelected(i)}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      border: `1px solid ${borderColor}`,
                      background: bg,
                      cursor: checked ? 'default' : 'pointer',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '10px',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <span style={{
                      width: '22px',
                      height: '22px',
                      borderRadius: '50%',
                      border: `1px solid ${borderColor}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      fontSize: '0.65rem',
                      fontFamily: 'IBM Plex Mono, monospace',
                      color: textColor,
                      background: isSelected || (showResult && isCorrect) ? bg : 'transparent',
                      fontWeight: 600,
                    }}>
                      {showResult && isCorrect ? '✓' : showResult && isSelected && !isCorrect ? '✗' : String.fromCharCode(65 + i)}
                    </span>
                    <span style={{
                      fontSize: '0.875rem',
                      color: textColor,
                      fontFamily: 'Outfit, sans-serif',
                      lineHeight: 1.5,
                    }}>
                      {option}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Explanation */}
            {checked && (
              <div style={{
                background: selected === question.correct ? 'rgba(0,212,170,0.06)' : 'rgba(247,79,79,0.06)',
                borderRadius: '8px',
                padding: '0.875rem 1rem',
                border: `1px solid ${selected === question.correct ? 'rgba(0,212,170,0.2)' : 'rgba(247,79,79,0.2)'}`,
                marginBottom: '1.25rem',
                animation: 'fadeIn 0.3s ease',
              }}>
                <p style={{
                  fontSize: '0.7rem',
                  fontFamily: 'IBM Plex Mono, monospace',
                  color: selected === question.correct ? '#00d4aa' : '#f74f4f',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  marginBottom: '4px',
                }}>
                  {selected === question.correct ? `✓ ${t.correct}` : `✗ ${t.incorrect}`}
                </p>
                <p style={{
                  margin: 0,
                  fontSize: '0.85rem',
                  color: 'var(--text-secondary)',
                  fontFamily: 'Outfit, sans-serif',
                  lineHeight: 1.6,
                }}>
                  {question.explanation}
                </p>
              </div>
            )}

            {/* Actions */}
            <div style={{ display: 'flex', gap: '10px' }}>
              {!checked ? (
                <button
                  disabled={selected === null}
                  onClick={handleCheck}
                  style={{
                    background: selected !== null ? 'var(--accent-primary)' : 'var(--bg-hover)',
                    color: selected !== null ? '#000' : 'var(--text-muted)',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.6rem 1.25rem',
                    fontFamily: 'IBM Plex Mono, monospace',
                    fontSize: '0.825rem',
                    fontWeight: 600,
                    cursor: selected !== null ? 'pointer' : 'not-allowed',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {t.checkAnswer}
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  style={{
                    background: 'var(--accent-primary)',
                    color: '#000',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.6rem 1.25rem',
                    fontFamily: 'IBM Plex Mono, monospace',
                    fontSize: '0.825rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  {current + 1 >= questions.length ? `${t.score} →` : `${t.nextQuestion} →`}
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
