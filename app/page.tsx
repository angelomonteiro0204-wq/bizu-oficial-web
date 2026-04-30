'use client'

import { useState, useCallback } from 'react'

// Sample quizzes data
const SAMPLE_QUIZZES = [
  { id: 1, name: 'Constituição Federal', questions: 15, date: '2026-04-28', score: 87 },
  { id: 2, name: 'Direito Penal', questions: 20, date: '2026-04-27', score: 92 },
  { id: 3, name: 'Processo Penal', questions: 18, date: '2026-04-26', score: 78 },
]

const SAMPLE_QUESTIONS = [
  {
    id: 1,
    text: 'Qual é o artigo da Constituição Federal que trata dos direitos fundamentais?',
    options: { A: 'Artigo 1º', B: 'Artigo 5º', C: 'Artigo 10º', D: 'Artigo 15º', E: 'Artigo 20º' },
    correct: 'B',
    explanation: 'O artigo 5º da Constituição Federal de 1988 trata dos direitos e deveres individuais e coletivos.'
  },
  {
    id: 2,
    text: 'Qual é a pena máxima para homicídio simples no Código Penal Brasileiro?',
    options: { A: '10 anos', B: '15 anos', C: '20 anos', D: '30 anos', E: '40 anos' },
    correct: 'C',
    explanation: 'De acordo com o artigo 121 do Código Penal, a pena para homicídio simples é de 6 a 20 anos de reclusão.'
  },
  {
    id: 3,
    text: 'Qual é o prazo para prescrição de um crime de roubo?',
    options: { A: '2 anos', B: '4 anos', C: '8 anos', D: '12 anos', E: '20 anos' },
    correct: 'D',
    explanation: 'O prazo de prescrição para roubo é de 12 anos, conforme artigo 109 do Código Penal.'
  },
]

export default function Home() {
  const [currentTab, setCurrentTab] = useState<'home' | 'novo' | 'historico'>('home')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [quizStarted, setQuizStarted] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({})
  const [showResult, setShowResult] = useState(false)
  const [uploadedFileName, setUploadedFileName] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (email && password) {
      setIsLoggedIn(true)
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setEmail('')
    setPassword('')
  }

  const startQuiz = () => {
    setQuizStarted(true)
    setCurrentQuestionIndex(0)
    setSelectedAnswers({})
    setShowResult(false)
  }

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionIndex]: answer
    })
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < SAMPLE_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      setShowResult(true)
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploadedFileName(file.name)
    }
  }

  const calculateScore = () => {
    let correct = 0
    SAMPLE_QUESTIONS.forEach((q, i) => {
      if (selectedAnswers[i] === q.correct) correct++
    })
    return Math.round((correct / SAMPLE_QUESTIONS.length) * 100)
  }

  if (!isLoggedIn) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1B3A6B 0%, #2E5090 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'system-ui',
        padding: '1rem'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '2rem',
          maxWidth: '400px',
          width: '100%',
          boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h1 style={{ fontSize: '2.5rem', margin: '0 0 0.5rem 0' }}>🎖️</h1>
            <h2 style={{ fontSize: '1.5rem', margin: '0 0 0.5rem 0', color: '#1B3A6B' }}>Bizu do Cadete</h2>
            <p style={{ color: '#666', margin: '0', fontSize: '0.9rem' }}>Preparação Militar</p>
          </div>

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', color: '#1B3A6B', fontWeight: '600', marginBottom: '0.5rem' }}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', color: '#1B3A6B', fontWeight: '600', marginBottom: '0.5rem' }}>Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '0.75rem',
                background: '#1B3A6B',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Entrar
            </button>
          </form>

          <p style={{ textAlign: 'center', color: '#666', marginTop: '1rem', fontSize: '0.85rem' }}>
            Teste: teste@test.com / 123456
          </p>
        </div>
      </div>
    )
  }

  if (quizStarted) {
    if (showResult) {
      const score = calculateScore()
      const correct = Object.values(selectedAnswers).filter((a, i) => a === SAMPLE_QUESTIONS[i].correct).length
      
      return (
        <div style={{ minHeight: '100vh', background: '#F5F6FA', fontFamily: 'system-ui' }}>
          <header style={{
            background: 'linear-gradient(135deg, #1B3A6B 0%, #2E5090 100%)',
            color: 'white',
            padding: '1rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h1 style={{ margin: '0', fontSize: '1.5rem' }}>🎖️ Resultado</h1>
              <button onClick={handleLogout} style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer' }}>Sair</button>
            </div>
          </header>

          <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
            <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', textAlign: 'center' }}>
              <h2 style={{ color: '#1B3A6B', marginTop: '0' }}>Questionário Concluído!</h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', margin: '2rem 0' }}>
                <div style={{ background: '#f0f7ff', padding: '2rem', borderRadius: '8px' }}>
                  <div style={{ fontSize: '3rem', color: '#1B3A6B', fontWeight: 'bold' }}>{score}%</div>
                  <p style={{ color: '#666', margin: '0.5rem 0 0 0' }}>Taxa de Acerto</p>
                </div>
                <div style={{ background: '#f0f7ff', padding: '2rem', borderRadius: '8px' }}>
                  <div style={{ fontSize: '3rem', color: '#1B3A6B', fontWeight: 'bold' }}>{correct}/{SAMPLE_QUESTIONS.length}</div>
                  <p style={{ color: '#666', margin: '0.5rem 0 0 0' }}>Acertos</p>
                </div>
              </div>

              <h3 style={{ color: '#1B3A6B', marginTop: '2rem' }}>Detalhes das Questões</h3>
              {SAMPLE_QUESTIONS.map((q, i) => {
                const isCorrect = selectedAnswers[i] === q.correct
                return (
                  <div key={i} style={{
                    background: isCorrect ? '#f0fff0' : '#fff0f0',
                    padding: '1rem',
                    borderRadius: '8px',
                    marginBottom: '1rem',
                    borderLeft: `4px solid ${isCorrect ? '#16A34A' : '#DC2626'}`
                  }}>
                    <p style={{ margin: '0 0 0.5rem 0', fontWeight: '600', color: '#1B3A6B' }}>
                      Questão {i + 1}: {isCorrect ? '✓ Correta' : '✗ Incorreta'}
                    </p>
                    <p style={{ margin: '0', color: '#666', fontSize: '0.9rem' }}>
                      Sua resposta: <strong>{selectedAnswers[i]}</strong> | Resposta correta: <strong>{q.correct}</strong>
                    </p>
                  </div>
                )
              })}

              <button
                onClick={() => {
                  setQuizStarted(false)
                  setCurrentTab('home')
                }}
                style={{
                  marginTop: '2rem',
                  background: '#1B3A6B',
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem 2rem',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                Voltar ao Início
              </button>
            </div>
          </main>
        </div>
      )
    }

    const currentQuestion = SAMPLE_QUESTIONS[currentQuestionIndex]
    const selectedAnswer = selectedAnswers[currentQuestionIndex]

    return (
      <div style={{ minHeight: '100vh', background: '#F5F6FA', fontFamily: 'system-ui' }}>
        <header style={{
          background: 'linear-gradient(135deg, #1B3A6B 0%, #2E5090 100%)',
          color: 'white',
          padding: '1rem',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 style={{ margin: '0', fontSize: '1.5rem' }}>🎖️ Quiz</h1>
            <button onClick={handleLogout} style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer' }}>Sair</button>
          </div>
        </header>

        <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
          <div style={{ background: 'white', padding: '2rem', borderRadius: '12px' }}>
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: '#1B3A6B', fontWeight: '600' }}>Questão {currentQuestionIndex + 1} de {SAMPLE_QUESTIONS.length}</span>
                <span style={{ color: '#666' }}>{Math.round(((currentQuestionIndex + 1) / SAMPLE_QUESTIONS.length) * 100)}%</span>
              </div>
              <div style={{ background: '#e0e0e0', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{
                  background: '#1B3A6B',
                  height: '100%',
                  width: `${((currentQuestionIndex + 1) / SAMPLE_QUESTIONS.length) * 100}%`,
                  transition: 'width 0.3s'
                }} />
              </div>
            </div>

            <h2 style={{ color: '#1B3A6B', marginTop: '0', fontSize: '1.3rem' }}>{currentQuestion.text}</h2>

            <div style={{ margin: '2rem 0' }}>
              {Object.entries(currentQuestion.options).map(([letter, text]) => (
                <button
                  key={letter}
                  onClick={() => handleAnswerSelect(letter)}
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '1rem',
                    margin: '0.75rem 0',
                    border: `2px solid ${selectedAnswer === letter ? '#1B3A6B' : '#ddd'}`,
                    background: selectedAnswer === letter ? '#f0f7ff' : 'white',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontSize: '1rem',
                    transition: 'all 0.3s'
                  }}
                >
                  <strong>{letter})</strong> {text}
                </button>
              ))}
            </div>

            <button
              onClick={handleNextQuestion}
              disabled={!selectedAnswer}
              style={{
                width: '100%',
                padding: '0.75rem',
                background: selectedAnswer ? '#1B3A6B' : '#ccc',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: selectedAnswer ? 'pointer' : 'not-allowed',
                fontWeight: '600',
                marginTop: '2rem'
              }}
            >
              {currentQuestionIndex === SAMPLE_QUESTIONS.length - 1 ? 'Finalizar' : 'Próxima'}
            </button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F5F6FA', fontFamily: 'system-ui' }}>
      {/* Header */}
      <header style={{
        background: 'linear-gradient(135deg, #1B3A6B 0%, #2E5090 100%)',
        color: 'white',
        padding: '1rem',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ margin: '0', fontSize: '0.9rem', opacity: 0.9 }}>Preparação Militar</p>
            <h1 style={{ margin: '0', fontSize: '1.5rem' }}>🎖️ Bizu do Cadete</h1>
          </div>
          <button onClick={handleLogout} style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer' }}>Sair</button>
        </div>
      </header>

      {/* Tabs */}
      <div style={{
        background: 'white',
        borderBottom: '1px solid #e0e0e0',
        padding: '0 1rem',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{ display: 'flex', gap: '2rem' }}>
          {(['home', 'novo', 'historico'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setCurrentTab(tab)}
              style={{
                padding: '1rem 0',
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                fontWeight: currentTab === tab ? '600' : '400',
                color: currentTab === tab ? '#1B3A6B' : '#666',
                borderBottom: currentTab === tab ? '3px solid #1B3A6B' : 'none',
                fontSize: '1rem'
              }}
            >
              {tab === 'home' && '🏠 Início'}
              {tab === 'novo' && '➕ Novo'}
              {tab === 'historico' && '📋 Histórico'}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
        {currentTab === 'home' && (
          <div>
            <h2 style={{ color: '#1B3A6B', marginTop: '0' }}>Bem-vindo!</h2>
            
            {/* Stats */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.5rem',
              marginBottom: '2rem'
            }}>
              <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <p style={{ color: '#666', margin: '0 0 0.5rem 0', fontSize: '0.9rem' }}>Total de Questionários</p>
                <p style={{ color: '#1B3A6B', margin: '0', fontSize: '2rem', fontWeight: 'bold' }}>3</p>
              </div>
              <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <p style={{ color: '#666', margin: '0 0 0.5rem 0', fontSize: '0.9rem' }}>Questões Respondidas</p>
                <p style={{ color: '#1B3A6B', margin: '0', fontSize: '2rem', fontWeight: 'bold' }}>53</p>
              </div>
              <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <p style={{ color: '#666', margin: '0 0 0.5rem 0', fontSize: '0.9rem' }}>Taxa de Acerto</p>
                <p style={{ color: '#1B3A6B', margin: '0', fontSize: '2rem', fontWeight: 'bold' }}>85%</p>
              </div>
            </div>

            {/* Recent Quizzes */}
            <h3 style={{ color: '#1B3A6B' }}>Questionários Recentes</h3>
            {SAMPLE_QUIZZES.map((quiz) => (
              <div key={quiz.id} style={{
                background: 'white',
                padding: '1.5rem',
                borderRadius: '12px',
                marginBottom: '1rem',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                borderLeft: '4px solid #1B3A6B'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ margin: '0 0 0.5rem 0', color: '#1B3A6B' }}>{quiz.name}</h4>
                    <p style={{ margin: '0', color: '#666', fontSize: '0.9rem' }}>{quiz.questions} questões • {quiz.date}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ margin: '0', color: '#1B3A6B', fontSize: '1.5rem', fontWeight: 'bold' }}>{quiz.score}%</p>
                    <button
                      onClick={startQuiz}
                      style={{
                        background: '#1B3A6B',
                        color: 'white',
                        border: 'none',
                        padding: '0.5rem 1rem',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        marginTop: '0.5rem',
                        fontSize: '0.9rem'
                      }}
                    >
                      Refazer
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {currentTab === 'novo' && (
          <div style={{ background: 'white', padding: '2rem', borderRadius: '12px' }}>
            <h2 style={{ color: '#1B3A6B', marginTop: '0' }}>Novo Questionário</h2>
            <p style={{ color: '#666' }}>Faça upload de um arquivo PDF ou PowerPoint para gerar um questionário</p>

            <div style={{
              border: '2px dashed #1B3A6B',
              borderRadius: '8px',
              padding: '2rem',
              textAlign: 'center',
              cursor: 'pointer',
              background: '#f0f7ff'
            }}>
              <p style={{ fontSize: '2rem', margin: '0 0 1rem 0' }}>📄</p>
              <p style={{ color: '#1B3A6B', fontWeight: '600', margin: '0 0 0.5rem 0' }}>Clique para selecionar um arquivo</p>
              <p style={{ color: '#666', margin: '0', fontSize: '0.9rem' }}>PDF ou PowerPoint (máx. 10MB)</p>
              <input
                type="file"
                accept=".pdf,.ppt,.pptx"
                onChange={handleFileUpload}
                style={{
                  position: 'absolute',
                  opacity: 0,
                  width: '100%',
                  height: '100%',
                  cursor: 'pointer'
                }}
              />
            </div>

            {uploadedFileName && (
              <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#f0fff0', borderRadius: '8px', borderLeft: '4px solid #16A34A' }}>
                <p style={{ margin: '0', color: '#1B3A6B', fontWeight: '600' }}>✓ Arquivo selecionado</p>
                <p style={{ margin: '0.5rem 0 0 0', color: '#666', fontSize: '0.9rem' }}>{uploadedFileName}</p>
              </div>
            )}

            <button
              onClick={startQuiz}
              disabled={!uploadedFileName}
              style={{
                marginTop: '1.5rem',
                width: '100%',
                padding: '0.75rem',
                background: uploadedFileName ? '#1B3A6B' : '#ccc',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: uploadedFileName ? 'pointer' : 'not-allowed',
                fontWeight: '600'
              }}
            >
              Gerar Questionário
            </button>
          </div>
        )}

        {currentTab === 'historico' && (
          <div>
            <h2 style={{ color: '#1B3A6B', marginTop: '0' }}>Histórico</h2>
            {SAMPLE_QUIZZES.map((quiz) => (
              <div key={quiz.id} style={{
                background: 'white',
                padding: '1.5rem',
                borderRadius: '12px',
                marginBottom: '1rem',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                borderLeft: '4px solid #1B3A6B'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ margin: '0 0 0.5rem 0', color: '#1B3A6B' }}>{quiz.name}</h4>
                    <p style={{ margin: '0', color: '#666', fontSize: '0.9rem' }}>{quiz.questions} questões • {quiz.date}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ margin: '0', color: '#1B3A6B', fontSize: '1.5rem', fontWeight: 'bold' }}>{quiz.score}%</p>
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                      <button
                        onClick={startQuiz}
                        style={{
                          background: '#1B3A6B',
                          color: 'white',
                          border: 'none',
                          padding: '0.5rem 1rem',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '0.9rem'
                        }}
                      >
                        Refazer
                      </button>
                      <button
                        style={{
                          background: '#f0f0f0',
                          color: '#1B3A6B',
                          border: 'none',
                          padding: '0.5rem 1rem',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '0.9rem'
                        }}
                      >
                        Revisar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer style={{
        background: '#1B3A6B',
        color: 'white',
        textAlign: 'center',
        padding: '2rem 1rem',
        marginTop: '3rem'
      }}>
        <p style={{ margin: '0' }}>&copy; 2026 Bizu do Cadete. Todos os direitos reservados.</p>
      </footer>
    </div>
  )
}
