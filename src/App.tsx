import './App.css';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';
import React, { useEffect } from 'react';
import i18n from './i18n';
import CustomMuiThemeProvider from './customTheme';
import { DeviceContextProvider } from './contexts/DeviceContext';
import { MainLayout } from './components/templates/MainLayout';
import Routes from './routes/Routes';
import { LoadingInProgress } from './components/molecules/common/LoadingInProgress';

function App () {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  useEffect(() => {
    if (i18n.isInitialized === false) {
      i18n.init();
    }
    setIsLoading(false);
  }, []);

  return (
    <div className="App">
      {isLoading.valueOf() === true ? (
        <LoadingInProgress />
      ) : (
        <CustomMuiThemeProvider>
          <I18nextProvider i18n={i18n}>
            <DeviceContextProvider>
              <BrowserRouter>
                <MainLayout>
                  <Routes />
                </MainLayout>
              </BrowserRouter>
            </DeviceContextProvider>
          </I18nextProvider>
        </CustomMuiThemeProvider>
      )}
    </div>
  );
}

export default App;
