// File: src/App.jsx
import React, { useState } from 'react';
import UrlShortenerForm from './components/UrlShortenerForm';
import UrlShortenerResult from './components/UrlShortenerResult';
import UrlShortenerStatistics from './components/UrlShortenerStatistics';

const App = () => {
  const [results, setResults] = useState([]);
  const [statistics, setStatistics] = useState([]);

  const handleShorten = (data) => {
    const updatedResults = [...results, ...data];
    setResults(updatedResults);
    setStatistics(updatedResults);
  };

  const handleClick = (shortcode) => {
    const updatedStats = statistics.map((url) => {
      if (url.shortcode === shortcode) {
        const newClick = {
          timestamp: new Date().toISOString(),
          source: document.referrer || 'direct',
          location: 'unknown',
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
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Client-Side URL Shortener</h1>
      <UrlShortenerForm onShorten={handleShorten} />
      <UrlShortenerResult results={results} onClickTrack={handleClick} />
      <UrlShortenerStatistics stats={statistics} />
    </div>
  );
};

export default App;

// File: src/components/UrlShortenerResult.jsx
import React from 'react';

const UrlShortenerResult = ({ results, onClickTrack }) => (
  <div className="mt-6">
    <h2 className="text-xl font-bold mb-4">Shortened URLs</h2>
    {results.map((res, idx) => (
      <div key={idx} className="p-2 border-b">
        <p>
          <strong>Short:</strong>{' '}
          <a
            href={res.originalUrl}
            className="text-blue-600 underline"
            target="_blank"
            rel="noreferrer"
            onClick={() => onClickTrack(res.shortcode)}
          >
            {window.location.origin}/{res.shortcode}
          </a>
        </p>
        <p><strong>Expires At:</strong> {res.expiresAt || 'Never'}</p>
        <p><strong>Clicks:</strong> {res.clicks.length}</p>
      </div>
    ))}
  </div>
);

export default UrlShortenerResult;

// File: src/components/UrlShortenerStatistics.jsx
import React from 'react';

const UrlShortenerStatistics = ({ stats }) => (
  <div className="p-4 mt-6">
    <h2 className="text-2xl font-bold mb-4">URL Statistics</h2>
    {stats.map((item, idx) => (
      <div key={idx} className="border p-4 mb-4">
        <p><strong>Short URL:</strong> {window.location.origin}/{item.shortcode}</p>
        <p><strong>Original URL:</strong> {item.originalUrl}</p>
        <p><strong>Created At:</strong> {item.createdAt}</p>
        <p><strong>Expires At:</strong> {item.expiresAt || 'Never'}</p>
        <p><strong>Total Clicks:</strong> {item.clicks.length}</p>
        <details>
          <summary>Click Details</summary>
          <ul className="list-disc ml-5">
            {item.clicks.map((click, i) => (
              <li key={i}>
                Time: {click.timestamp}, Source: {click.source || 'direct'}, Location: {click.location || 'unknown'}
              </li>
            ))}
          </ul>
        </details>
      </div>
    ))}
  </div>
);

export default UrlShortenerStatistics;
