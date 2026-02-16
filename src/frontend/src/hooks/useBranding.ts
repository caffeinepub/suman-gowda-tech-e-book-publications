import { useState, useEffect } from 'react';

const LOGO_KEY = 'site_logo';

export function useBranding() {
  const [logo, setLogo] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(LOGO_KEY);
    if (stored) {
      setLogo(stored);
    }
  }, []);

  const updateLogo = (dataUrl: string) => {
    localStorage.setItem(LOGO_KEY, dataUrl);
    setLogo(dataUrl);
  };

  const clearLogo = () => {
    localStorage.removeItem(LOGO_KEY);
    setLogo(null);
  };

  return { logo, updateLogo, clearLogo };
}
