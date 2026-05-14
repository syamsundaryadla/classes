export type QuizStatus = 'waiting' | 'active' | 'leaderboard' | 'finished'

export interface Question {
  id: string
  text: string
  options: string[]
  correctIndex: number
  timeLimit: number
}

export interface Player {
  id: string
  name: string
  score: number
  streak: number
  hasAnsweredCurrent: boolean
}

export interface QuizState {
  status: QuizStatus
  accessCode: string
  players: Player[]
  currentQuestionIndex: number
  questionStartTime: number | null
  questions: Question[]
}

const defaultQuestions: Question[] = [
  {
    id: 'q1',
    text: 'What is the primary purpose of embeddings in a RAG system?',
    options: [
      'To compress data for storage',
      'To convert text into numerical vectors for semantic similarity',
      'To translate text into different languages automatically',
      'To generate the final response'
    ],
    correctIndex: 1,
    timeLimit: 30
  },
  {
    id: 'q2',
    text: 'In the ReAct framework, what immediately follows a "Thought"?',
    options: [
      'Observation',
      'Response',
      'Action',
      'Planning'
    ],
    correctIndex: 2,
    timeLimit: 30
  },
  {
    id: 'q3',
    text: 'What does MCP stand for in the context of modern Agentic AI?',
    options: [
      'Model Context Protocol',
      'Machine Control Process',
      'Multi-Core Processing',
      'Memory Context Pattern'
    ],
    correctIndex: 0,
    timeLimit: 30
  },
  {
    id: 'q4',
    text: 'Which metric measures if the generated answer is strictly derived from the retrieved context?',
    options: [
      'Context Precision',
      'Answer Relevance',
      'Context Recall',
      'Faithfulness'
    ],
    correctIndex: 3,
    timeLimit: 30
  },
  {
    id: 'q5',
    text: 'Why would an enterprise use Graph RAG over standard Vector RAG?',
    options: [
      'It is faster to query',
      'To solve "multi-hop" reasoning across connected entities',
      'It requires less memory',
      'It automatically writes SQL queries'
    ],
    correctIndex: 1,
    timeLimit: 30
  }
]

const initialState: QuizState = {
  status: 'waiting',
  accessCode: 'RAG2026',
  players: [],
  currentQuestionIndex: -1,
  questionStartTime: null,
  questions: defaultQuestions
}

// Persist across HMR in development
const globalForQuiz = global as unknown as { quizState: QuizState }
export const quizStore = globalForQuiz.quizState || { ...initialState }
if (process.env.NODE_ENV !== 'production') globalForQuiz.quizState = quizStore

export const resetQuiz = () => {
  quizStore.status = 'waiting'
  quizStore.players = []
  quizStore.currentQuestionIndex = -1
  quizStore.questionStartTime = null
}
