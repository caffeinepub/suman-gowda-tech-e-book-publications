import { useState, useEffect } from 'react';

const LINKS_KEY = 'site_social_links';

export interface SocialLinks {
  instagram: string;
  telegram: string;
  linkedin: string;
}

const DEFAULT_LINKS: SocialLinks = {
  instagram: 'https://instagram.com',
  telegram: 'https://t.me',
  linkedin: 'https://linkedin.com',
};

export function useSiteLinks() {
  const [links, setLinks] = useState<SocialLinks>(DEFAULT_LINKS);

  useEffect(() => {
    const stored = localStorage.getItem(LINKS_KEY);
    if (stored) {
      try {
        setLinks(JSON.parse(stored));
      } catch {
        setLinks(DEFAULT_LINKS);
      }
    }
  }, []);

  const updateLinks = (newLinks: SocialLinks) => {
    localStorage.setItem(LINKS_KEY, JSON.stringify(newLinks));
    setLinks(newLinks);
  };

  return { links, updateLinks };
}
