'use client'
import { useState } from 'react'

const QUIZZES = [
  { id: 1, name: 'Constituição Federal', questions: 15, date: '2026-04-28', score: 87 },
  { id: 2, name: 'Direito Penal', questions: 20, date: '2026-04-27', score: 92 },
  { id: 3, name: 'Processo Penal', questions: 18, date: '2026-04-26', score: 78 },
]

const QUESTIONS = [
  { id: 1, text: 'Qual é o artigo da Constituição Federal que trata dos direitos fundamentais?', options: { A: 'Artigo 1º', B: 'Artigo 5º', C: 'Artigo 10º', D: 'Artigo 15º', E: 'Artigo 20º' }, correct: 'B', explanation: 'O artigo 5º trata dos direitos fundamentais.' },
  { id: 2, text: 'Qual é a pena máxima para homicídio simples?', options: { A: '10 anos', B: '15 anos', C: '20 anos', D: '30 anos', E: '40 anos' }, correct: 'C', explanation: 'A pena é de 6 a 20 anos de reclusão.' },
  { id: 3, text: 'Qual é o prazo para prescrição de um crime de roubo?', options: { A: '2 anos', B: '4 anos', C: '8 anos', D: '12 anos', E: '20 anos' }, correct: 'D', explanation: 'O prazo é de 12 anos.' },
]

export default function Home() {
  const [tab, setTab] = useState('home')
  const [loggedIn, setLoggedIn] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [quizStarted, setQuizStarted] = useState(false)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [showResult, setShowResult] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault()
    if (email && password) setLoggedIn(true)
  }

  if (!loggedIn) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1B3A6B 0%, #2E5090 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui', padding: '1rem' }}>
        <div style={{ background: 'white', borderRadius: '12px', padding: '2rem', maxWidth: '400px', width: '100%', boxShadow: '0 10px 40px rgba(0,0,0,0.2)' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h1 style={{ fontSize: '2.5rem', margin: '0 0 0.5rem 0' }}>🎖️</h1>
            <h2 style={{ fontSize: '1.5rem', margin: '0 0 0.5rem 0', color: '#1B3A6B' }}>Bizu do Cadete</h2>
            <p style={{ color: '#666', margin: '0', fontSize: '0.9rem' }}>Preparação Militar</p>
          </div>
          <form onSubmit={handleLogin}>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="seu@email.com" style={{ width: '100%', padding: '0.75rem', border: '2px solid #ddd', borderRadius: '8px', marginBottom: '1rem', boxSizing: 'border-box' }} />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" style={{ width: '100%', padding: '0.75rem', border: '2px solid #ddd', borderRadius: '8px', marginBottom: '1.5rem', boxSizing: 'border-box' }} />
            <button type="submit" style={{ width: '100%', padding: '0.75rem', background: '#1B3A6B', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: '600', cursor: 'pointer' }}>Entrar</button>
          </form>
          <p style={{ textAlign: 'center', color: '#666', marginTop: '1rem', fontSize: '0.85rem' }}>Teste: teste@test.com / 123456</p>
        </div>
      </div>
    )
  }

  if (quizStarted) {
    if (showResult) {
      const correct = Object.entries(answers).filter(([i, a]) => a === QUESTIONS[parseInt(i)].correct).length
      const score = Math.round((correct / QUESTIONS.length) * 100)
      return (
        <div style={{ minHeight: '100vh', background: '#F5F6FA', fontFamily: 'system-ui' }}>
          <header style={{ background: 'linear-gradient(135deg, #1B3A6B 0%, #2E5090 100%)', color: 'white', padding: '1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h1 style={{ margin: '0', fontSize: '1.5rem' }}>🎖️ Resultado</h1>
              <button onClick={() => setLoggedIn(false)} style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer' }}>Sair</button>
            </div>
          </header>
          <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
            <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', textAlign: 'center' }}>
              <h2 style={{ color: '#1B3A6B', marginTop: '0' }}>Questionário Concluído!</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', margin: '2rem 0' }}>
                <div style={{ background: '#f0f7ff', padding: '2rem', borderRadius: '8px' }}>
                  <div style={{ fontSize: '3rem', color: '#1B3A6B', fontWeight: 'bold' }}>{score}%</div>
                  <p style={{ color: '#666', margin: '0.5rem 0 0 0' }}>Taxa de Acerto</p>
                </div>
                <div style={{ background: '#f0f7ff', padding: '2rem', borderRadius: '8px' }}>
                  <div style={{ fontSize: '3rem', color: '#1B3A6B', fontWeight: 'bold' }}>{correct}/{QUESTIONS.length}</div>
                  <p style={{ color: '#666', margin: '0.5rem 0 0 0' }}>Acertos</p>
                </div>
              </div>
              <button onClick={() => { setQuizStarted(false); setTab('home') }} style={{ marginTop: '2rem', background: '#1B3A6B', color: 'white', border: 'none', padding: '0.75rem 2rem', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>Voltar ao Início</button>
            </div>
          </main>
        </div>
      )
    }

    const q = QUESTIONS[questionIndex]
    const selected = answers[questionIndex]
    return (
      <div style={{ minHeight: '100vh', background: '#F5F6FA', fontFamily: 'system-ui' }}>
        <header style={{ background: 'linear-gradient(135deg, #1B3A6B 0%, #2E5090 100%)', color: 'white', padding: '1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 style={{ margin: '0', fontSize: '1.5rem' }}>🎖️ Quiz</h1>
            <button onClick={() => setLoggedIn(false)} style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer' }}>Sair</button>
          </div>
        </header>
        <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
          <div style={{ background: 'white', padding: '2rem', borderRadius: '12px' }}>
            <div style={{ marginBottom: '2rem' }}>
              <span style={{ color: '#1B3A6B', fontWeight: '600' }}>Questão {questionIndex + 1} de {QUESTIONS.length}</span>
              <div style={{ background: '#e0e0e0', height: '8px', borderRadius: '4px', marginTop: '0.5rem', overflow: 'hidden' }}>
                <div style={{ background: '#1B3A6B', height: '100%', width: `${((questionIndex + 1) / QUESTIONS.length) * 100}%` }} />
              </div>
            </div>
            <h2 style={{ color: '#1B3A6B', marginTop: '0', fontSize: '1.3rem' }}>{q.text}</h2>
            <div style={{ margin: '2rem 0' }}>
              {Object.entries(q.options).map(([letter, text]) => (
                <button key={letter} onClick={() => setAnswers({...answers, [questionIndex]: letter})} style={{ display: 'block', width: '100%', padding: '1rem', margin: '0.75rem 0', border: `2px solid ${selected === letter ? '#1B3A6B' : '#ddd'}`, background: selected === letter ? '#f0f7ff' : 'white', borderRadius: '8px', cursor: 'pointer', textAlign: 'left', fontSize: '1rem' }}><strong>{letter})</strong> {text}</button>
              ))}
            </div>
            <button onClick={() => { if (questionIndex < QUESTIONS.length - 1) setQuestionIndex(questionIndex + 1); else setShowResult(true) }} disabled={!selected} style={{ width: '100%', padding: '0.75rem', background: selected ? '#1B3A6B' : '#ccc', color: 'white', border: 'none', borderRadius: '8px', cursor: selected ? 'pointer' : 'not-allowed', fontWeight: '600', marginTop: '2rem' }}>{questionIndex === QUESTIONS.length - 1 ? 'Finalizar' : 'Próxima'}</button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F5F6FA', fontFamily: 'system-ui' }}>
      <header style={{ background: 'linear-gradient(135deg, #1B3A6B 0%, #2E5090 100%)', color: 'white', padding: '1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div><p style={{ margin: '0', fontSize: '0.9rem', opacity: 0.9 }}>Preparação Militar</p><h1 style={{ margin: '0', fontSize: '1.5rem' }}>🎖️ Bizu do Cadete</h1></div>
          <button onClick={() => setLoggedIn(false)} style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer' }}>Sair</button>
        </div>
      </header>
      <div style={{ background: 'white', borderBottom: '1px solid #e0e0e0', padding: '0 1rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: '2rem' }}>
          {['home', 'novo', 'historico'].map((t) => (
            <button key={t} onClick={() => setTab(t)} style={{ padding: '1rem 0', border: 'none', background: 'none', cursor: 'pointer', fontWeight: tab === t ? '600' : '400', color: tab === t ? '#1B3A6B' : '#666', borderBottom: tab === t ? '3px solid #1B3A6B' : 'none', fontSize: '1rem' }}>
              {t === 'home' && '🏠 Início'} {t === 'novo' && '➕ Novo'} {t === 'historico' && '📋 Histórico'}
            </button>
          ))}
        </div>
      </div>
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
        {tab === 'home' && (
          <div>
            <h2 style={{ color: '#1B3A6B', marginTop: '0' }}>Bem-vindo!</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
              <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}><p style={{ color: '#666', margin: '0 0 0.5rem 0', fontSize: '0.9rem' }}>Total de Questionários</p><p style={{ color: '#1B3A6B', margin: '0', fontSize: '2rem', fontWeight: 'bold' }}>3</p></div>
              <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}><p style={{ color: '#666', margin: '0 0 0.5rem 0', fontSize: '0.9rem' }}>Questões Respondidas</p><p style={{ color: '#1B3A6B', margin: '0', fontSize: '2rem', fontWeight: 'bold' }}>53</p></div>
              <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}><p style={{ color: '#666', margin: '0 0 0.5rem 0', fontSize: '0.9rem' }}>Taxa de Acerto</p><p style={{ color: '#1B3A6B', margin: '0', fontSize: '2rem', fontWeight: 'bold' }}>85%</p></div>
            </div>
            <h3 style={{ color: '#1B3A6B' }}>Questionários Recentes</h3>
            {QUIZZES.map((quiz) => (
              <div key={quiz.id} style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', marginBottom: '1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', borderLeft: '4px solid #1B3A6B', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div><h4 style={{ margin: '0 0 0.5rem 0', color: '#1B3A6B' }}>{quiz.name}</h4><p style={{ margin: '0', color: '#666', fontSize: '0.9rem' }}>{quiz.questions} questões • {quiz.date}</p></div>
                <div style={{ textAlign: 'right' }}><p style={{ margin: '0', color: '#1B3A6B', fontSize: '1.5rem', fontWeight: 'bold' }}>{quiz.score}%</p><button onClick={() => setQuizStarted(true)} style={{ background: '#1B3A6B', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer', marginTop: '0.5rem', fontSize: '0.9rem' }}>Refazer</button></div>
              </div>
            ))}
          </div>
        )}
        {tab === 'novo' && (
          <div style={{ background: 'white', padding: '2rem', borderRadius: '12px' }}>
            <h2 style={{ color: '#1B3A6B', marginTop: '0' }}>Novo Questionário</h2>
            <p style={{ color: '#666' }}>Faça upload de um arquivo PDF ou PowerPoint para gerar um questionário</p>
            <div style={{ border: '2px dashed #1B3A6B', borderRadius: '8px', padding: '2rem', textAlign: 'center', cursor: 'pointer', background: '#f0f7ff' }}>
              <p style={{ fontSize: '2rem', margin: '0 0 1rem 0' }}>📄</p>
              <p style={{ color: '#1B3A6B', fontWeight: '600', margin: '0 0 0.5rem 0' }}>Clique para selecionar um arquivo</p>
              <p style={{ color: '#666', margin: '0', fontSize: '0.9rem' }}>PDF ou PowerPoint (máx. 10MB)</p>
            </div>
            <button onClick={() => setQuizStarted(true)} style={{ marginTop: '1.5rem', width: '100%', padding: '0.75rem', background: '#1B3A6B', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>Gerar Questionário</button>
          </div>
        )}
        {tab === 'historico' && (
          <div>
            <h2 style={{ color: '#1B3A6B', marginTop: '0' }}>Histórico</h2>
            {QUIZZES.map((quiz) => (
              <div key={quiz.id} style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', marginBottom: '1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', borderLeft: '4px solid #1B3A6B', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div><h4 style={{ margin: '0 0 0.5rem 0', color: '#1B3A6B' }}>{quiz.name}</h4><p style={{ margin: '0', color: '#666', fontSize: '0.9rem' }}>{quiz.questions} questões • {quiz.date}</p></div>
                <div style={{ textAlign: 'right' }}><p style={{ margin: '0', color: '#1B3A6B', fontSize: '1.5rem', fontWeight: 'bold' }}>{quiz.score}%</p><div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}><button onClick={() => setQuizStarted(true)} style={{ background: '#1B3A6B', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.9rem' }}>Refazer</button><button style={{ background: '#f0f0f0', color: '#1B3A6B', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.9rem' }}>Revisar</button></div></div>
              </div>
            ))}
          </div>
        )}
      </main>
      <footer style={{ background: '#1B3A6B', color: 'white', textAlign: 'center', padding: '2rem 1rem', marginTop: '3rem' }}>
        <p style={{ margin: '0' }}>&copy; 2026 Bizu do Cadete. Todos os direitos reservados.</p>
      </footer>
    </div>
  )
}
