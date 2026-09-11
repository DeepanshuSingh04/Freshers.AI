import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Scorer from './pages/Scorer'
import { useState, useEffect } from 'react'
import { getCurrentUser } from './apis/user.api'
import { getResume } from './apis/resume.api'
import { useDispatch } from 'react-redux'
import { setResume } from './redux/resumeSlice'
import ResumeBuilder from './pages/ResumeBuilder'
import InterviewStart from './pages/InterviewStart'
import InterviewPage from './pages/InterviewPage'
import InterviewReport from './pages/InterviewReport'
import Roadmap from './pages/Roadmap'
import Billing from './pages/Billing'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(8)
  const [loadingMessage, setLoadingMessage] = useState(
    'Microservices are starting'
  )

  const dispatch = useDispatch()

  useEffect(() => {
    if (!loading) return

    const messages = [
      'Microservices are starting',
      'Connecting to Freshers.AI services',
      'Warming up the application',
      'Connecting to your workspace',
      'Almost there...'
    ]

    let messageIndex = 0

    const interval = setInterval(() => {
      setProgress((current) => {
        if (current >= 90) return current

        const increment =
          current < 35 ? 7 :
          current < 60 ? 4 :
          current < 80 ? 2 :
          1

        return Math.min(current + increment, 90)
      })

      messageIndex = Math.min(messageIndex + 1, messages.length - 1)
      setLoadingMessage(messages[messageIndex])
    }, 3500)

    return () => clearInterval(interval)
  }, [loading])

  useEffect(() => {
    const getUser = async () => {
      try {
        const data = await getCurrentUser()
        setUser(data?.user || null)
      } catch (error) {
        setUser(null)
      } finally {
        setProgress(100)

        setTimeout(() => {
          setLoading(false)
        }, 300)
      }
    }

    getUser()
  }, [])

  useEffect(() => {
    if (!user) return

    const getResumeData = async () => {
      try {
        const result = await getResume()

        if (result?.data) {
          dispatch(setResume(result.data))
        }
      } catch (error) {
        console.log('Resume fetch error:', error)
      }
    }

    getResumeData()
  }, [user, dispatch])

  if (loading) {
    return (
      <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#F8F9FA] px-6">

        <div className="flex items-center gap-3 mb-7">
          <div className="w-11 h-11 rounded-xl bg-[#0A0A0A] flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">
              F
            </span>
          </div>

          <span className="text-2xl font-extrabold tracking-tight text-[#0A0A0A]">
            FresherAI
          </span>
        </div>

        <p className="text-sm sm:text-base font-medium text-[#0A0A0A]">
          {loadingMessage}
        </p>

        <p className="mt-2 text-xs text-black/40 text-center">
          First visit may take 30–40 seconds while the services wake up
        </p>

        <div className="mt-7 w-full max-w-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] text-black/40">
              Loading Freshers.AI
            </span>

            <span className="text-[11px] font-semibold text-black/50">
              {progress}%
            </span>
          </div>

          <div className="h-2 w-full rounded-full bg-black/10 overflow-hidden">
            <div
              className="h-full rounded-full bg-[#0A0A0A] transition-all duration-700 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex items-center gap-2 mt-5 text-xs text-black/35">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0A0A0A] animate-pulse" />
          Please wait while Freshers.AI gets ready
        </div>

      </div>
    )
  }

  return (
    <>
      <Routes>

        <Route
          path="/"
          element={
            user
              ? <Navigate to="/dashboard" replace />
              : <Home setUser={setUser} />
          }
        />

        <Route
          path="/dashboard"
          element={
            user
              ? <Dashboard user={user} setUser={setUser} />
              : <Navigate to="/" replace />
          }
        />

        <Route
          path="/scorer"
          element={
            user
              ? <Scorer user={user} setUser={setUser} />
              : <Navigate to="/" replace />
          }
        />

        <Route
          path="/resume"
          element={
            user
              ? <ResumeBuilder user={user} setUser={setUser} />
              : <Navigate to="/" replace />
          }
        />

        <Route
          path="/interview"
          element={
            user
              ? <InterviewStart user={user} setUser={setUser} />
              : <Navigate to="/" replace />
          }
        />

        <Route
          path="/interview/:id"
          element={
            user
              ? <InterviewPage user={user} setUser={setUser} />
              : <Navigate to="/" replace />
          }
        />

        <Route
          path="/interview/:id/report"
          element={
            user
              ? <InterviewReport user={user} setUser={setUser} />
              : <Navigate to="/" replace />
          }
        />

        <Route
          path="/roadmap"
          element={
            user
              ? <Roadmap user={user} setUser={setUser} />
              : <Navigate to="/" replace />
          }
        />

        <Route
          path="/billing"
          element={
            user
              ? <Billing user={user} setUser={setUser} />
              : <Navigate to="/" replace />
          }
        />

      </Routes>
    </>
  )
}

export default App