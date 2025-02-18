import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app/app'; // Sesuaikan path-nya
import './styles/styles.css';

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);
  root.render(<App />);
} else {
  console.error('Elemen root tidak ditemukan!');
}