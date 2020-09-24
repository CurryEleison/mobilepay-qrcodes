import React, { useEffect, useState } from 'react';
import { createMuiTheme, ThemeProvider, responsiveFontSizes} from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useTranslation } from 'react-i18next';

import useLocalStorage from './modules/useLocalStorage';

import Skeleton from './components/Skeleton';

// const defaultTheme = createMuiTheme({
//   palette: {
//     type: 'light',
//   },
// });
const defaultSettings = (i18n) => ({
  acctno: '',
  language: i18n.language,
});


// Upgrade this to something better later. 
const removeFalsy = (obj) => {
  let newObj = {};
  Object.keys(obj).forEach((prop) => {
    if (obj[prop]) { newObj[prop] = obj[prop]; }
  });
  return newObj;
};

const paletteType = (settings, detecteddarkmode) => {
  if (settings && settings.palette) {
    return settings.palette;
  }
  return (detecteddarkmode) ? 'dark' : 'light';
}

const defaultTheme = (settings, detecteddarkmode) => {
  return createMuiTheme({palette: {type: paletteType(settings, detecteddarkmode)}});
}


function App() {
  const { t, i18n } = useTranslation();
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');  

  const [storedSettings, setStoredSettings] = useLocalStorage('settings', {});
  
  const [settings, setSettings] = useState({...defaultSettings(i18n), ...storedSettings});
  const [theme, setTheme] = useState(responsiveFontSizes(defaultTheme(settings, prefersDarkMode)));

  useEffect(() => {
    if (settings.language && settings.language !== i18n.language) {
      i18n.changeLanguage(settings.language);
    }
  }, [i18n, settings.language])

  useEffect(() => {
    setTheme(responsiveFontSizes(defaultTheme(settings, prefersDarkMode)));
  }, [settings, prefersDarkMode])


  const updateSettings = (newsettings) => {
    const cleanSettingsForStore = removeFalsy(newsettings);
    const consolidatedSettings = {...defaultSettings(i18n), ...cleanSettingsForStore};
    
    setStoredSettings(cleanSettingsForStore);
    setSettings(consolidatedSettings);
    // console.log(removeFalsy(newsettings));
    // console.log(consolidatedSettings);
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
