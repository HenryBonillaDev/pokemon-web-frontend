import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { PokemonListPage } from './pages/pokemon/PokemonListPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import { PokemonVsPage } from './pages/pokemon/PokemonVsPage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/pokemon"
            element={
              <ProtectedRoute>
                <PokemonListPage />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/vs" element={<PokemonVsPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;