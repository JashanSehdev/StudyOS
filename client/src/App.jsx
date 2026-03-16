import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Slidebar from "./components/Slidebar";
import Dashboard from "./pages/Dashboard";
import Assignments from "./pages/Assignments";
import TimeTable from "./pages/TimeTable";
import Notes from "./pages/Notes";
import GPA from "./pages/GPA";
import Pomodoro from "./pages/Pomodoro";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function ProtectedLayout() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;

  return (
    <div className="flex min-h-screen bg-background font-sans">
      <Slidebar />
      <main className="flex-1 p-8">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/assignments" element={<Assignments />} />
          <Route path="/timetable" element={<TimeTable />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/gpa" element={<GPA />} />
          <Route path="/pomodoro" element={<Pomodoro />} />
        </Routes>
      </main>
    </div>
  );
}


function App() {

  return (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/*" element={<ProtectedLayout/>} />
    </Routes>
  </BrowserRouter>)
}

export default App;
