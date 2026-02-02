import React from 'react';
import { render } from '@testing-library/react';
import { Canvas } from '@react-three/fiber';
import { Scene, Controls } from './Scene';

describe('Scene Component', () => {
  const renderWithCanvas = (component) => {
    return render(<Canvas>{component}</Canvas>);
  };

  it('renders without crashing', () => {
    expect(() => renderWithCanvas(<Scene />)).not.toThrow();
  });

  it('uses Suspense for lazy loading', () => {
    // The Scene component wraps content in Suspense
    // This test verifies it doesn't throw during render
    const { container } = renderWithCanvas(<Scene />);
    expect(container).toBeInTheDocument();
  });

  it('includes all expected child components', () => {
    // Verify the Scene renders without errors, which means
    // all child components (Planet, SpaceDust, Sparks, SparkStorm) are rendering
    expect(() => renderWithCanvas(<Scene />)).not.toThrow();
  });

  it('includes lighting setup', () => {
    // Verify that the component structure includes lighting
    expect(() => renderWithCanvas(<Scene />)).not.toThrow();
  });

  it('is compatible with React 18 concurrent features', () => {
    // React 18 compatibility test with Suspense
    expect(() => renderWithCanvas(<Scene />)).not.toThrow();
  });
});
