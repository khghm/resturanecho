import { useState } from 'react';
import { AppProvider } from './context/AppContext';
import { LandingPage } from './pages/Landing';
import { CustomerApp } from './pages/CustomerApp';
import { AdminDashboard } from './pages/AdminDashboard';
import { RestaurantPage } from './pages/RestaurantPage';

export type AppView = 'landing' | 'customer' | 'admin' | 'restaurant';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('landing');

  const navigate = (view: AppView) => {
    setCurrentView(view);
    window.scrollTo(0, 0);
  };

  return (
    <AppProvider>
      <div className="min-h-screen bg-white font-vazir">
        {currentView === 'landing' && <LandingPage navigate={navigate} />}
        {currentView === 'customer' && <CustomerApp navigate={navigate} />}
        {currentView === 'admin' && <AdminDashboard navigate={navigate} />}
        {currentView === 'restaurant' && <RestaurantPage navigate={navigate} />}
      </div>
    </AppProvider>
  );
}
