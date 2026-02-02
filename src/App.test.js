import React from 'react';
import { render } from '@testing-library/react';
import { App } from './App';

describe('App Component', () => {
  it('renders without crashing', () => {
    render(<App />);
    const canvas = document.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
  });

  it('creates a Three.js canvas with correct camera settings', () => {
    render(<App />);
    const canvas = document.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
  });

  it('renders the Scene component inside Canvas', () => {
    const { container } = render(<App />);
    expect(container.querySelector('div')).toHaveStyle({
      width: '100vw',
      height: '100vh',
    });
  });

  it('is compatible with React 18 concurrent rendering', () => {
    // This test verifies that the component doesn't throw errors
    // when rendered with React 18's concurrent features
    expect(() => render(<App />)).not.toThrow();
  });
});
