import React, { useState } from 'react';
import { generateShortcode, calculateExpiry } from '../utils/urlUtils';
import '../components/urlform.css';
const UrlShortenerForm = ({ onShorten }) => {
  const [urls, setUrls] = useState([{ originalUrl: '', validity: '', shortcode: '' }]);

  const handleChange = (index, field, value) => {
    const updated = [...urls];
    updated[index][field] = value;
    setUrls(updated);
  };

  const addField = () => {
    if (urls.length < 5)
      setUrls([...urls, { originalUrl: '', validity: '', shortcode: '' }]);
  };

  const validate = ({ originalUrl, validity, shortcode }) => {
    if (!originalUrl || !/^https?:\/\/.+\..+/.test(originalUrl)) return 'Invalid URL';
    if (validity && isNaN(validity)) return 'Validity must be a number';
    if (shortcode && !/^[a-zA-Z0-9]{1,10}$/.test(shortcode)) return 'Invalid shortcode';
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const results = [];
    for (const url of urls) {
      const error = validate(url);
      if (error) {
        alert(error);
        return;
      }
    }
    for (const url of urls) {
      const short = url.shortcode || generateShortcode();
      const expiresAt = url.validity ? calculateExpiry(url.validity) : null;
      results.push({
        originalUrl: url.originalUrl,
        shortcode: short,
        createdAt: new Date().toISOString(),
        expiresAt,
        clicks: [],
      });
    }
    onShorten(results);
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      {urls.map((url, idx) => (
        <div key={idx} className="mb-4">
          <input
            type="text"
            placeholder="Original URL"
            value={url.originalUrl}
            onChange={(e) => handleChange(idx, 'originalUrl', e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Validity (mins)"
            value={url.validity}
            onChange={(e) => handleChange(idx, 'validity', e.target.value)}
          />
          <input
            type="text"
            placeholder="Preferred Shortcode"
            value={url.shortcode}
            onChange={(e) => handleChange(idx, 'shortcode', e.target.value)}
            
          />
        </div>
      ))}
      <button type="button" onClick={addField} className="bg-blue-500 text-white p-2 rounded">
        Add Another URL
      </button>
      <button type="submit" className="bg-green-500 text-white p-2 rounded">
        Shorten URLs
      </button>
    </form>
  );
};

export default UrlShortenerForm;