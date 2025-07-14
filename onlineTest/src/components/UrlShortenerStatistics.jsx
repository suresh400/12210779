import React from 'react';
import '../components/stactistics.css';
const UrlShortenerStatistics = ({ stats }) => (
  <div className="p-4 mt-6">
    <h2>URL Statistics</h2>
    {stats.map((item, idx) => (
      <div key={idx} className="border p-4 mb-4">
        <p><strong>Short URL:</strong> {window.location.origin}/{item.shortcode}</p>
        <p><strong>Original URL:</strong> {item.originalUrl}</p>
        <p><strong>Created At:</strong> {item.createdAt}</p>
        <p><strong>Expires At:</strong> {item.expiresAt || '30 days'}</p>
        <p><strong>Total Clicks:</strong> {item.clicks.length}</p>
        <details>
          <summary>Click Details</summary>
          <ul className="ml-5">
            {item.clicks.map((click, i) => (
              <li key={i}>
                Time: {click.timestamp}<br/>
                Source: {click.source}<br/>
                Location: {click.location}
              </li>
            ))}
          </ul>
        </details>
      </div>
    ))}
  </div>
);

export default UrlShortenerStatistics;
