import React, { useEffect, useState } from 'react';
import UrlShortenerForm from './components/UrlShortenerForm';
import UrlShortenerResult from './components/UrlShortenerResult';
import UrlShortenerStatistics from './components/UrlShortenerStatistics';
import { registerClient, authenticateClient, sendLog } from './utils/logMiddlewareApi';

const LOCAL_STORAGE_KEY = 'shortenerData';

const App = () => {
  const [results, setResults] = useState([]);
  const [statistics, setStatistics] = useState([]);

  useEffect(() => {
    const setupLogging = async () => {
      try {
        await registerClient();
        await authenticateClient();
        await sendLog({
          stack: 'frontend',
          level: 'info',
          message: 'User loaded the app successfully',
        });
      } catch (err) {
        console.error('Logging setup failed', err);
      }
    };

    setupLogging();

    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      setResults(parsed);
      setStatistics(parsed);
    }
  }, []);

  const persistData = (data) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  };

  const handleShorten = async (data) => {
    const updated = [...results, ...data];
    setResults(updated);
    setStatistics(updated);
    persistData(updated);

    for (const item of data) {
      await sendLog({
        stack: 'frontend',
        level: 'info',
        message: `Shortened URL: ${item.originalUrl} → ${item.shortcode}`,
      });
    }
  };

  const handleClick = async (shortcode) => {
    const geo = await fetch('https://ipapi.co/json')
      .then(res => res.json())
      .catch(() => null);

    const updatedStats = statistics.map((url) => {
      if (url.shortcode === shortcode) {
        const newClick = {
          timestamp: new Date().toISOString(),
          source: document.referrer || 'direct',
          location: geo ? `${geo.city}, ${geo.country_name}` : 'unknown',
        };
        return {
          ...url,
          clicks: [...url.clicks, newClick],
        };
      }
      return url;
    });

    setStatistics(updatedStats);
    setResults(updatedStats);
    persistData(updatedStats);

    await sendLog({
      stack: 'frontend',
      level: 'info',
      message: `Short URL clicked: ${shortcode}`,
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">URL Shortener</h1>
      <UrlShortenerForm onShorten={handleShorten} />
      <UrlShortenerResult results={results} onClickTrack={handleClick} />
      <UrlShortenerStatistics stats={statistics} />
    </div>
  );
};

export default App;
