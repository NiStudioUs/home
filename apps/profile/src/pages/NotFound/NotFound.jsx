import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
      <div className="card bento-card" style={{ textAlign: 'center', padding: '4rem 2rem', maxWidth: '500px', width: '100%' }}>
        <h1 style={{ fontSize: '4rem', color: 'var(--accent-color)', marginBottom: '1rem', marginTop: 0 }}>404</h1>
        <h2 style={{ marginBottom: '2rem', color: 'var(--text-secondary)' }}>This page doesn't exist.</h2>
        <Link to="/" className="btn btn-primary">Go home</Link>
      </div>
    </div>
  );
}
