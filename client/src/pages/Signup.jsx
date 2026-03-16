import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import API from '../api/axios'

export default function Signup() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await API.post('/auth/signup', form)
      login(res.data.user)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen bg-background flex items-center justify-center px-4"
      style={{
        backgroundImage: `radial-gradient(ellipse at 40% 20%, #6C63FF22 0%, transparent 60%),
                          radial-gradient(ellipse at 80% 80%, #6C63FF11 0%, transparent 50%)`
      }}
    >
      <div className="w-full max-w-md">

        {/* Card */}
        <div
          className="rounded-3xl p-8 border border-white/10"
          style={{ background: 'rgba(30, 30, 46, 0.85)', backdropFilter: 'blur(20px)' }}
        >

          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-sm">
              S
            </div>
            <span className="text-white font-bold text-lg">StudyOS</span>
          </div>

          {/* Heading */}
          <h2 className="text-white text-2xl font-bold mb-1">Create your account 🚀</h2>
          <p className="text-gray-500 text-sm mb-8">
            Join thousands of students studying smarter
          </p>

          {/* Error */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl mb-6">
              ⚠️ {error}
            </div>
          )}

          {/* Form */}
          <div className="flex flex-col gap-5">

            {/* Name */}
            <div className="flex flex-col gap-1">
              <label className="text-gray-400 text-xs font-medium">Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Jashan Sehdev"
                className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-gray-600 border border-white/10 focus:outline-none focus:border-primary transition-all"
                style={{ background: 'rgba(255,255,255,0.04)' }}
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1">
              <label className="text-gray-400 text-xs font-medium">Email address</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="jashan@email.com"
                className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-gray-600 border border-white/10 focus:outline-none focus:border-primary transition-all"
                style={{ background: 'rgba(255,255,255,0.04)' }}
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1">
              <label className="text-gray-400 text-xs font-medium">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-gray-600 border border-white/10 focus:outline-none focus:border-primary transition-all"
                style={{ background: 'rgba(255,255,255,0.04)' }}
              />
              <p className="text-gray-600 text-xs mt-1">
                Minimum 6 characters
              </p>
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-3 rounded-xl font-semibold text-sm text-white transition-all disabled:opacity-50 mt-1"
              style={{
                background: loading
                  ? '#6C63FF88'
                  : 'linear-gradient(135deg, #6C63FF, #8B85FF)',
                boxShadow: '0 4px 24px #6C63FF44'
              }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"/>
                    <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8z"/>
                  </svg>
                  Creating account...
                </span>
              ) : 'Create Account →'}
            </button>

          </div>

          {/* Terms */}
          <p className="text-gray-600 text-xs text-center mt-5">
            By signing up you agree to our{' '}
            <span className="text-primary cursor-pointer hover:underline">Terms</span>
            {' '}and{' '}
            <span className="text-primary cursor-pointer hover:underline">Privacy Policy</span>
          </p>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-gray-600 text-xs">or</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Login link */}
          <p className="text-center text-gray-500 text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-primary font-semibold hover:underline">
              Log in
            </Link>
          </p>

        </div>

        {/* Bottom tag */}
        <p className="text-center text-gray-700 text-xs mt-6">
          Built for students. Powered by focus. 🎓
        </p>

      </div>
    </div>
  )
}