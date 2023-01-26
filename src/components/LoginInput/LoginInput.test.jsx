/* eslint-disable no-use-before-define */
/* eslint-disable no-shadow */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/jsx-filename-extension */
/**
 * skenario testing
 *
 * - LoginInput component
 *   - should handle username typing correctly
 *   - should handle password typing correctly
 *   - should call login function when login button is clicked
 */
import { describe, it, expect, afterEach, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { render, screen, cleanup } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';
import { BrowserRouter } from 'react-router-dom';
import LoginInput from './index';

expect.extend(matchers);

describe('LoginInput component', () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('should handle email typing correctly', async () => {
    // arrange

    render(
      <BrowserRouter>
        <LoginInput login={() => {}} />
      </BrowserRouter>,
    );

    const emailInput = screen.getByPlaceholderText('you@example.com');

    // action
    await userEvent.type(emailInput, 'emailtest');

    // assert
    expect(emailInput).toHaveValue('emailtest');
  });

  it('should handle password typing correctly', async () => {
    // arrange
    render(
      <BrowserRouter>
        <LoginInput login={() => {}} />
      </BrowserRouter>,
    );

    const passwordInput = screen.getByPlaceholderText('******', {
      selector: 'input[type="password"]',
    });

    // action
    await userEvent.type(passwordInput, 'passwordtest');

    // assert
    expect(passwordInput).toHaveValue('passwordtest');
  });

  it('should call login function when login button is clicked', async () => {
    // mock login
    const mockLogin = vi.fn();

    render(
      <BrowserRouter>
        <LoginInput login={mockLogin} />
      </BrowserRouter>,
    );

    const emailElement = await screen.getByPlaceholderText('you@example.com', {
      selector: 'input[type="email"]',
    });
    await userEvent.type(emailElement, 'emailtest');
    const passwordElement = await screen.getByPlaceholderText('******', {
      selector: 'input[type="password"]',
    });
    await userEvent.type(passwordElement, 'passwordtest');
    const loginButton = await screen.getByRole('button', { name: 'Login' });

    // action
    await userEvent.click(loginButton);

    // assert
    expect(mockLogin).toBeCalledWith({
      email: 'emailtest',
      password: 'passwordtest',
    });
  });
});
