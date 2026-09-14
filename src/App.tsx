import { useState } from 'react';
import { AppProvider } from './context/AppContext';
import { LandingPage } from './pages/Landing';
import { CustomerApp } from './pages/CustomerApp';
import { AdminDashboard } from './pages/AdminDashboard';
import { RestaurantPage } from './pages/RestaurantPage';
import { PersianBorder } from './components/PersianBorder';

export type AppView = 'landing' | 'customer' | 'admin' | 'restaurant';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('landing');

  const navigate = (view: AppView) => {
    setCurrentView(view);
    window.scrollTo(0, 0);
  };

  const showBorder = currentView !== 'admin';

  return (
    <AppProvider>
      <div className="min-h-screen bg-white font-vazir relative flex flex-col">
        {showBorder && (
          <>
            {/* Top Border */}
            <div 
              className="w-full h-12 sm:h-16 bg-cover bg-center bg-repeat-x flex-shrink-0"
              style={{ 
                backgroundImage: `url(https://image.qwenlm.ai/generated-images/0c9ea907-74b3-4e0f-a51f-bf79f1fa1f71/_result.png)`,
                backgroundSize: 'auto 100%'
              }}
            />
            
            {/* Side Borders - Desktop Only */}
            <div 
              className="hidden lg:block fixed top-0 right-0 h-full w-12 z-[1] pointer-events-none bg-cover bg-repeat-y"
              style={{ 
                backgroundImage: `url(https://image.qwenlm.ai/generated-images/b0df7df2-eca0-4588-b1dd-2feafd3f25a0/_result.png)`,
                backgroundSize: '100% auto'
              }}
            />
            <div 
              className="hidden lg:block fixed top-0 left-0 h-full w-12 z-[1] pointer-events-none bg-cover bg-repeat-y"
              style={{ 
                backgroundImage: `url(https://image.qwenlm.ai/generated-images/b0df7df2-eca0-4588-b1dd-2feafd3f25a0/_result.png)`,
                backgroundSize: '100% auto'
              }}
            />
          </>
        )}
        
        {/* Main Content */}
        <div className={`flex-1 relative z-10 ${showBorder ? 'lg:px-12' : ''}`}>
          {currentView === 'landing' && <LandingPage navigate={navigate} />}
          {currentView === 'customer' && <CustomerApp navigate={navigate} />}
          {currentView === 'admin' && <AdminDashboard navigate={navigate} />}
          {currentView === 'restaurant' && <RestaurantPage navigate={navigate} />}
        </div>
        
        {showBorder && (
          /* Bottom Border */
          <div 
            className="w-full h-12 sm:h-16 bg-cover bg-center bg-repeat-x flex-shrink-0"
            style={{ 
              backgroundImage: `url(https://image.qwenlm.ai/generated-images/0c9ea907-74b3-4e0f-a51f-bf79f1fa1f71/_result.png)`,
              backgroundSize: 'auto 100%',
              transform: 'scaleY(-1)'
            }}
          />
        )}
      </div>
    </AppProvider>
  );
}
