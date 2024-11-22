import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CompanySetup from "./pages/CompanySetup";
import InviteTeam from "./pages/InviteTeam";
import Dashboard from "./pages/Dashboard";
import Benefits from "./pages/Benefits";
import Deductions from "./pages/Deductions";
import DashboardLayout from "./components/DashboardLayout";
import CompanyInfo from "./pages/CompanyInfo";
import Home from "./pages/Home";
import NotFound from "./pages/Notfound";
import EmployeeManagement from "./pages/Employees";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/company-setup" element={<CompanySetup />} />
          <Route path="/invite-team" element={<InviteTeam />} />

          {/* Protected dashboard routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route path="" element={<Dashboard />} />
            <Route path="employees" element={<EmployeeManagement />} />
            <Route path="benefits" element={<Benefits />} />
            <Route path="deductions" element={<Deductions />} />
            <Route path="company-info" element={<CompanyInfo />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster position="top-center" />
      </div>
    </BrowserRouter>
  );
}

export default App;
