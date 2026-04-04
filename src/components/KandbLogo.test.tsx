import { render } from '@testing-library/react';
import { KandbLogo } from './KandbLogo';

describe('KandbLogo', () => {
  it('renders an SVG element', () => {
    const { container } = render(<KandbLogo />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });
});
