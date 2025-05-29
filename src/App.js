import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

function make_amazon_url(isbn) {
  const base = 'https://www.amazon.co.jp/dp/B0'

  const url = '${base}${isbn}';
  return url
}

function App() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);

  const handleSearch = async () => {
    const apiKey = process.env.REACT_APP_GOOGLE_BOOKS_API_KEY;
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&key=${apiKey}`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      setBooks(data.items || []);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>書籍 検索</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="本のタイトル・著者・isbnコードなど"
        style={{ padding: '0.5rem', width: '300px' }}
      />
      <button onClick={handleSearch} style={{ marginLeft: '1rem', padding: '0.5rem' }}>
        検索
      </button>

      <div style={{ marginTop: '2rem' }}>
        {books.map((item) => {
          const book = item.volumeInfo;
          const url = make_amazon_url(book.industryIdentifiers[0].identifier);
          return (
            <div key={item.id} style={{ marginBottom: '1rem', borderBottom: '1px solid #ccc' }}>
              <h3>{book.title}</h3>
              <p>{book.authors?.join(', ')}</p>
              <a href={url} target="_blank" rel="noopener noreferrer">
                Amazonで見る
              </a>
              {book.imageLinks?.thumbnail && (
                <img src={book.imageLinks.thumbnail} alt={book.title} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
