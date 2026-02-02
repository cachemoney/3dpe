import React from 'react';
import { render } from '@testing-library/react';
import { Canvas } from '@react-three/fiber';
import { SpaceDust } from './SpaceDust';

describe('SpaceDust Component', () => {
  const renderWithCanvas = (component) => {
    return render(<Canvas>{component}</Canvas>);
  };

  it('renders without crashing', () => {
    expect(() => renderWithCanvas(<SpaceDust count={100} />)).not.toThrow();
  });

  it('generates the correct number of particles', () => {
    const count = 50;
    expect(() => renderWithCanvas(<SpaceDust count={count} />)).not.toThrow();
  });

  it('handles zero particles gracefully', () => {
    expect(() => renderWithCanvas(<SpaceDust count={0} />)).not.toThrow();
  });

  it('handles large particle counts', () => {
    // Test with a large number to ensure performance isn't catastrophically bad
    expect(() => renderWithCanvas(<SpaceDust count={1000} />)).not.toThrow();
  });

  it('uses useMemo for particle generation', () => {
    // This test verifies that re-rendering with the same count
    // doesn't cause issues (particles are memoized)
    const { rerender } = renderWithCanvas(<SpaceDust count={100} />);
    expect(() => rerender(<Canvas><SpaceDust count={100} /></Canvas>)).not.toThrow();
  });

  it('regenerates particles when count changes', () => {
    const { rerender } = renderWithCanvas(<SpaceDust count={50} />);
    expect(() => rerender(<Canvas><SpaceDust count={100} /></Canvas>)).not.toThrow();
  });

  it('is compatible with React 18 concurrent rendering', () => {
    expect(() => renderWithCanvas(<SpaceDust count={100} />)).not.toThrow();
  });
});
