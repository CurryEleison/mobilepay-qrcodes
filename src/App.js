import React, { useState } from 'react';
import { createMuiTheme, ThemeProvider, responsiveFontSizes} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import useLocalStorage from './modules/useLocalStorage';

import Skeleton from './components/Skeleton';

const defaultTheme = createMuiTheme({
  palette: {
    //type: 'dark',
  },
});
const defaultSettings = {
  acctno: '',
  title: 'Create MobilePay QR Codes',
  language: 'en',
  darkmode: null,
}


// Upgrade this to something better later. 
const removeFalsy = (obj) => {
  let newObj = {};
  Object.keys(obj).forEach((prop) => {
    if (obj[prop]) { newObj[prop] = obj[prop]; }
  });
  return newObj;
};


function App() {
  const [theme, setTheme] = useState(responsiveFontSizes(defaultTheme));
  const [storedSettings, setStoredSettings] = useLocalStorage('settings', {});
  
  const [settings, setSettings] = useState({...defaultSettings, ...storedSettings});

  const updateSettings = (newsettings) => {
    const cleanSettingsForStore = removeFalsy(newsettings);
    const consolidatedSettings = {...defaultSettings, ...cleanSettingsForStore}
    setStoredSettings(cleanSettingsForStore);
    setSettings(consolidatedSettings);
    console.log(removeFalsy(newsettings));
    console.log(consolidatedSettings);
    }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Skeleton 
        settings={settings}
        storedSettings={storedSettings}        
        onSettingsChange={updateSettings}
        onThemeChange={setTheme}
      />
    </ThemeProvider>
  );
}

export default App;
