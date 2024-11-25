import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from './ThemeContext';
import Sidebar from "./components/Sidebar";
import Users from "./pages/Users";
import Roles from "./pages/Roles";
import Permissions from "./pages/Permissions";

function App() {
  return (
    <ThemeProvider>
    <Router>
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 p-4">
          <Routes>
            <Route path="/users" element={<Users />} />
            <Route path="/roles" element={<Roles />} />
            <Route path="/permissions" element={<Permissions />} />
          </Routes>
        </div>
      </div>
    </Router>
  </ThemeProvider>
  );
}

export default App;
