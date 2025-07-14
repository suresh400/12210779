import React from 'react';
import '../components/urlresult.css';
const UrlShortenerResult = ({ results, onClickTrack }) => (
  <div className="mt-6">
    <h2 className="text-xl font-bold mb-4">Shortened URLs</h2>
    {results.map((res, idx) => (
      <div key={idx} className="p-2 border-b">
        <p>
          <strong>Short:</strong>{' '}
          <a
            href={res.originalUrl}
            
            target="_blank"
            rel="noreferrer"
            onClick={() => onClickTrack(res.shortcode)}
          >
            {window.location.origin}/{res.shortcode}
          </a>
        </p>
        <p><strong>Expires At:</strong> {res.expiresAt || '30 days'}</p>
        <p><strong>Clicks:</strong> {res.clicks.length}</p>
      </div>
    ))}
  </div>
);

export default UrlShortenerResult;