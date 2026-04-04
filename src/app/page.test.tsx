import { render } from '@testing-library/react';
import Home from './page';

describe('Home', () => {
  it('renders without errors', () => {
    const { container } = render(<Home />);
    expect(container.querySelector('main')).toBeInTheDocument();
  });
});
