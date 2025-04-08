import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import App from './App';
import BankMain from './components/BankMain';
import Pin from './components/Pin';
import ProtectedRoute from './ProtectedRoute';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement // Ensure the root element exists in your HTML
);

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/pin" element={<ProtectedRoute element={<Pin />} />} />
      <Route path="/bank-main" element={<ProtectedRoute element={<BankMain />} />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
);

