import { render, screen } from '@testing-library/react';

import { Home } from ".";

describe("<Home />", () => {
  test("renders home", () => {
    render(<Home/>)
  });
});
