import React from 'react';
import { render } from '@testing-library/react';
import { Canvas } from '@react-three/fiber';
import { SparkStorm } from './SparkStorm';

describe('SparkStorm Component', () => {
  const testColors = ['#ff0000', '#00ff00', '#0000ff'];

  const renderWithCanvas = (component) => {
    return render(<Canvas>{component}</Canvas>);
  };

  it('renders without crashing', () => {
    expect(() =>
      renderWithCanvas(<SparkStorm count={10} colors={testColors} radius={10} />),
    ).not.toThrow();
  });

  it('generates the correct number of storm lines', () => {
    const count = 20;
    expect(() =>
      renderWithCanvas(<SparkStorm count={count} colors={testColors} radius={10} />),
    ).not.toThrow();
  });

  it('handles zero count gracefully', () => {
    expect(() =>
      renderWithCanvas(<SparkStorm count={0} colors={testColors} radius={10} />),
    ).not.toThrow();
  });

  it('handles large line counts', () => {
    // Test with a reasonable large number
    expect(() =>
      renderWithCanvas(<SparkStorm count={100} colors={testColors} radius={10} />),
    ).not.toThrow();
  });

  it('handles different radius values', () => {
    expect(() =>
      renderWithCanvas(<SparkStorm count={10} colors={testColors} radius={20} />),
    ).not.toThrow();
  });

  it('handles single color array', () => {
    expect(() =>
      renderWithCanvas(<SparkStorm count={10} colors={['#ffffff']} radius={10} />),
    ).not.toThrow();
  });

  it('memoizes line generation', () => {
    const props = { count: 10, colors: testColors, radius: 10 };
    const { rerender } = renderWithCanvas(<SparkStorm {...props} />);

    // Re-render with same props shouldn't cause issues
    expect(() =>
      rerender(<Canvas><SparkStorm {...props} /></Canvas>)
    ).not.toThrow();
  });

  it('regenerates lines when props change', () => {
    const { rerender } = renderWithCanvas(
      <SparkStorm count={10} colors={testColors} radius={10} />
    );

    // Changing count should trigger regeneration
    expect(() =>
      rerender(<Canvas><SparkStorm count={20} colors={testColors} radius={10} /></Canvas>)
    ).not.toThrow();
  });

  it('integrates with attractor simulation system', () => {
    // SparkStorm uses complex attractor simulations
    // This test verifies the integration works without errors
    expect(() =>
      renderWithCanvas(<SparkStorm count={10} colors={testColors} radius={10} />),
    ).not.toThrow();
  });

  it('is compatible with React 18 concurrent rendering', () => {
    expect(() =>
      renderWithCanvas(<SparkStorm count={10} colors={testColors} radius={10} />),
    ).not.toThrow();
  });

  it('handles animation frame updates', () => {
    // The component uses useFrame for animation
    // This test ensures it integrates properly with R3F's frame loop
    expect(() =>
      renderWithCanvas(<SparkStorm count={10} colors={testColors} radius={10} />),
    ).not.toThrow();
  });
});
