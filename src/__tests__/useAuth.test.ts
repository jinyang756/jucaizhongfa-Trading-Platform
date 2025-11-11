import { useAuth } from '../store/useAuth';
import { act } from '@testing-library/react';

describe('useAuth Store', () => {
  // Reset store and localStorage before each test
  beforeEach(() => {
    act(() => {
      useAuth.getState().logout(); // Reset state to default
    });
    localStorage.clear();
  });

  it('should log in an admin user successfully', () => {
    act(() => {
      const result = useAuth
        .getState()
        .login({ username: 'admin001', password: 'jczf@2025' }, 'admin');
      expect(result.success).toBe(true);
    });

    const state = useAuth.getState();
    expect(state.isLoggedIn).toBe(true);
    expect(state.user).not.toBeNull();
    expect(state.user?.userType).toBe('admin');
    expect(state.user?.username).toBe('admin001');
  });

  it('should log in a regular user successfully', () => {
    act(() => {
      const result = useAuth
        .getState()
        .login({ username: 'testuser01', password: '8a3k7z9x' }, 'user');
      expect(result.success).toBe(true);
      expect(result.requiresEmailVerification).toBe(true);
    });

    const state = useAuth.getState();
    expect(state.isLoggedIn).toBe(true);
    expect(state.user).not.toBeNull();
    expect(state.user?.userType).toBe('user');
    expect(state.user?.username).toBe('testuser01');
    expect(state.user?.isEmailVerified).toBe(false);
  });

  it('should fail to log in with incorrect credentials', () => {
    act(() => {
      const result = useAuth.getState().login({ username: 'wrong', password: 'wrong' }, 'user');
      expect(result.success).toBe(false);
      expect(result.message).toBe('用户名或密码错误');
    });

    const state = useAuth.getState();
    expect(state.isLoggedIn).toBe(false);
    expect(state.user).toBeNull();
  });

  it('should log out the user', () => {
    // First, log in a user
    act(() => {
      useAuth.getState().login({ username: 'testuser01', password: '8a3k7z9x' }, 'user');
    });
    expect(useAuth.getState().isLoggedIn).toBe(true);

    // Then, log out
    act(() => {
      useAuth.getState().logout();
    });

    const state = useAuth.getState();
    expect(state.isLoggedIn).toBe(false);
    expect(state.user).toBeNull();
  });

  it('should send a verification code', async () => {
    let result;
    await act(async () => {
      result = await useAuth.getState().sendVerificationCode('test@example.com');
    });
    // @ts-expect-error Test environment does not correctly infer the type of `result`
    expect(result.success).toBe(true);
    // @ts-expect-error Test environment does not correctly infer the type of `result`
    expect(result.message).toBe('验证码已发送');
  });

  it('should verify an email with the correct code', async () => {
    // Log in user first
    act(() => {
      useAuth.getState().login({ username: 'testuser01', password: '8a3k7z9x' }, 'user');
    });

    expect(useAuth.getState().user?.isEmailVerified).toBe(false);

    let result;
    await act(async () => {
      result = await useAuth.getState().verifyEmail('123456');
    });

    // @ts-expect-error Test environment does not correctly infer the type of `result`
    expect(result.success).toBe(true);
    // @ts-expect-error Test environment does not correctly infer the type of `result`
    expect(result.message).toBe('邮箱验证成功');
    expect(useAuth.getState().user?.isEmailVerified).toBe(true);
  });

  it('should not verify an email with the incorrect code', async () => {
    act(() => {
      useAuth.getState().login({ username: 'testuser01', password: '8a3k7z9x' }, 'user');
    });

    expect(useAuth.getState().user?.isEmailVerified).toBe(false);

    let result;
    await act(async () => {
      result = await useAuth.getState().verifyEmail('wrong-code');
    });

    // @ts-expect-error Test environment does not correctly infer the type of `result`
    expect(result.success).toBe(false);
    // @ts-expect-error Test environment does not correctly infer the type of `result`
    expect(result.message).toBe('验证码错误');
    expect(useAuth.getState().user?.isEmailVerified).toBe(false);
  });
});
