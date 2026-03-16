import {useState} from "react"
import useTimeTable from "../hooks/useTimetable"

const DAYS = ['Monday', 'Tuesday','Wednesday','Thursday','Friday','Saturday'];

const emptyForm = {
  subject: 'Computer Science',
  day: 'Monday',
  start_time: '',
  end_time: '',
  room: '',
  professor: ''
}

const SUBJECTS = ['Computer Science', 'Mathmatics', 'Physics', 'English', 'Other'];

const COLORS = [
  'bg-purple-500/20 border-purple-500/30 text-purple-300',
  'bg-blue-500/20   border-blue-500/30   text-blue-300',
  'bg-green-500/20  border-green-500/30  text-green-300',
  'bg-yellow-500/20 border-yellow-500/30 text-yellow-300',
  'bg-red-500/20    border-red-500/30    text-red-300',
  'bg-pink-500/20   border-pink-500/30   text-pink-300',
]

export default function TimeTable() {
  const {entries, loading, addEntry, deleteEntry} = useTimeTable();
  const [showForm, setShowForm ] = useState(false);
  const [form, setForm ] = useState(emptyForm);
  
  const handleChange = (e) => {
    setForm({ ...form , [e.target.name]: e.target.value})
  }

  const handleSubmit = async () => {
    if(!form.subject || !form.day || !form.start_time || !form.end_time) return
    await addEntry(form)
    setForm(emptyForm);
    setShowForm(false)
  }
  
  const getEntriesForDay = (day) => {
    return entries.filter(e => e.day === day).sort((a,b) => a.start_time.localeCompare(b.start_time))
  }

  const subjectColorMap = {}
  entries.forEach(e => {
    if( !subjectColorMap[e.subject]) {
      const index = Object.keys(subjectColorMap).length%COLORS.length
      subjectColorMap[e.subject] = COLORS[index]
    }
  })

  return (
    <div className="">
      {/* Header */}
      <div className="">
        <h1>TimeTable</h1>
        <p className="">
          {entries.length} 
          class scheduled
        </p>
      </div>

      <button>
        + Add Class
      </button>

      {/* Add class form */}
      {showForm && (
        <div>
          <h3>New Class</h3>
          <div>
            <div>
              <label htmlFor="">New class</label>
              <select name="" id=""></select>
            </div>
            <div>
              <label htmlFor="">Subject</label>
              <select name="" id=""></select>
            </div>
            <div>
              <label htmlFor="">Day</label>
              <select name="" id=""></select>
            </div>

            <div>
              <label htmlFor="">Start Time</label>
              <input type="text" />
            </div>
            <div>
              <label htmlFor="">End Time</label>
              <input type="text" />
            </div>

            <div>
              <label htmlFor="">room</label>
              <input type="text" />
            </div>

            <div>
              <label htmlFor="">Professor</label>
            </div>
          </div>
          <div>
            <button>
              Save
            </button>
            <button>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Weekly Grid */}
      {loading ? (<p>Loading...</p>) : (
        <div>
          {DAYS.map(day => (
            <div>
              {/* Day Headers */}
              <h3>{day}</h3>

              {/* classes */}
              {getEntriesForDay(day).length === 0 ? (
                <p>No classes</p>
              ) : (
                <div>
                  {getEntriesForDay(day).map(entry => (
                    <div>
                      <button>
                        X
                      </button>
                      <p>{entry.subject}</p>
                      <p>{entry.start_time.slice(0,5)} - {entry.end_time.slice(0,5)}</p>
                      {entry.room && (
                        <p>{entry.room}</p>
                      )}
                      {entry.professor && (
                        <p>{entry.professor}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}