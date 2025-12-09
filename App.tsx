import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ClientPortal } from './views/ClientPortal';
import { AdminDashboard } from './views/AdminDashboard';
import { LandingPage } from './views/LandingPage';
import { Scale, ArrowRight, Info } from 'lucide-react';
import { getAdminPassword } from './services/storage';

// EMBEDDED LOGO (SVG) - High Fidelity Vector
export const LOGO_SRC = `data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 350 100'%3E%3Ctext x='5' y='55' font-family='Times New Roman, serif' font-size='42' font-weight='bold' fill='%23c2ac15'%3ELagom Co.%3Ctspan font-size='18' dy='-15'%3E®%3C/tspan%3E%3C/text%3E%3Ctext x='7' y='78' font-family='Arial, sans-serif' font-size='9' fill='%23737373' letter-spacing='2.5' font-weight='bold'%3ESERVICIOS LEGALES CORPORATIVOS%3C/text%3E%3C/svg%3E`;

// Mock Login Component
const Login: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const currentAdminPass = getAdminPassword();
    
    if (password && password.trim() === currentAdminPass) {
      setError('');
      onLogin();
    } else {
      setError('Clave de acceso incorrecta');
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-secondary font-sans p-6">
      <div className="w-full max-w-sm animate-[fadeIn_0.8s_ease-out]">
        <div className="text-center mb-16">
            <img 
                src={LOGO_SRC} 
                alt="Lagom Co." 
                className="mx-auto h-32 w-auto mb-6 object-contain"
            />
            <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mt-4">Acceso Corporativo</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="relative group">
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError('');
              }}
              placeholder="Ingrese su clave"
              className="w-full py-3 border-b border-gray-200 focus:border-primary bg-transparent outline-none transition-all text-center text-lg text-gray-800 placeholder:text-gray-300 placeholder:font-light font-serif tracking-widest"
            />
          </div>
          
          {error && <p className="text-red-800 bg-red-50 py-2 px-4 text-xs text-center uppercase tracking-wider animate-pulse">{error}</p>}
          
          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary-dark text-white py-4 text-xs font-bold uppercase tracking-[0.2em] transition-all duration-500 hover:shadow-lg flex items-center justify-center gap-3 group"
          >
            Iniciar Sesión <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
        
        <div className="mt-20 text-center space-y-4">
             <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400 bg-gray-50 py-2 px-4 rounded-full inline-flex mx-auto border border-gray-100">
                <Info size={12} className="text-primary" />
                <span>Si olvidó su clave, contacte a soporte técnico.</span>
             </div>
             <div>
                <a href="#/" className="text-[10px] text-gray-300 hover:text-primary transition-colors uppercase tracking-widest border-b border-transparent hover:border-primary pb-1">Volver al Inicio</a>
             </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <HashRouter>
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/client" element={<ClientPortal />} />
            <Route 
                path="/admin" 
                element={
                    isAuthenticated ? (
                        <AdminDashboard onLogout={() => setIsAuthenticated(false)} />
                    ) : (
                        <Login onLogin={() => setIsAuthenticated(true)} />
                    )
                } 
            />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    </HashRouter>
  );
}

export default App;