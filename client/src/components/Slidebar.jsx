import { NavLink } from "react-router-dom";

const Links = [
  { to: "/", icon: "🏚️", label: "Dashboard" },
  { to: "/assignments", icon: "📋", label: "Assignments" },
  { to: "/timetable", icon: "🗓️", label: "Timetable" },
  { to: "/notes", icon: "📝", label: "Notes" },
  { to: "/gpa", icon: "🎯", label: "GPA" },
  { to: "/pomodoro", icon: "⏱️", label: "Pomodoro" },
];

export default function Slidebar() {
    return (
        <aside className="w-64 min-h-screen bg-surface flex flex-col py-8 px-4 gap-2">

            {/* LOGO */}
            <div className="mb-8 px-2">
                <h1 className="text-primary text-2xl font-bold">StudyOS</h1>
                <p className="text-gray-500 text-xs mt-1">Your academic cockpit</p>
            </div>


            {/* NavLinks */}

            {Links.map(link => (
                <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}

                className= {({isActive})=> `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                            ${isActive ? 'bg-primary text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`
                            }
                >
                    <span>{link.icon}</span>
                    <span>{link.label}</span>
                </NavLink>
            ))}


             {/* Bottom user tag */}

             <div className="mt-auto px-2 py-3 rounded-xl bg-white/5 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold">J</div>
                <div>
                    <p className="text-white text-xs font-semibold">Jashan</p>
                    <p className="text-gray-500 text-xs">B.Tech CSE</p>
                </div>
             </div>

        </aside>
    )
}
