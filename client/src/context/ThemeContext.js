import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const ThemeContext = createContext(null);

export const ThemeProvider = (props) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [accentColor, setAccentColor] = useState('#63537d');
  const [fontPercentage, setFontPercentage] = useState(100);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    document.body.style.fontSize = `${fontPercentage}%`;

    const theme = {
      isDarkMode,
      accentColor,
      fontPercentage
    };
    Cookies.set("defaultTheme", JSON.stringify(theme));
  }, [isDarkMode, fontPercentage, accentColor]);

  const toggleDarkMode = () => {
    setIsDarkMode(currentMode => !currentMode);
  }

  return (
    <ThemeContext.Provider value={{
      accentColor,
      isDarkMode,
      fontPercentage,
      actions: {
        toggleDarkMode,
        updateAccentColor: setAccentColor,
        updateFontPercentage: setFontPercentage
      }
    }}>
      {props.children}
    </ThemeContext.Provider>
  );
}

export default ThemeContext;