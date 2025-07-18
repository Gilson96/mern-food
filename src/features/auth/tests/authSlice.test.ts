import authReducer, { setCredentials, logOut, selectCurrentToken } from '@/features/auth/authSlice';
import type { AuthState } from '@/hooks/dataTypes';

const initialState: AuthState = {
  email: null,
  token: null,
};

const testUsers = [
  { email: 'admin@admin.com', token: 'admin123' },
  { email: 'user@user.com', token: 'user123' },
];

testUsers.forEach(({ email, token }) => {
  it(`should handle setCredentials for ${email}`, () => {
    const action = setCredentials({ email, token });
    const state = authReducer(initialState, action);
    expect(state.email).toBe(email);
    expect(state.token).toBe(token);
  });
});

testUsers.forEach((user) => {
  it(`should handle logOut for ${user.email}`, () => {
    const loggedInState = {
      ...initialState,
      email: user.email,
      token: user.token,
    };
    const state = authReducer(loggedInState, logOut());
    expect(state.email).toBeNull();
    expect(state.token).toBeNull();
  });
});

describe('authSlice', () => {
  it('should return the initial state', () => {
    expect(authReducer(undefined, { type: '@@INIT' })).toEqual({
      email: null,
      token: null,
    });
  });
});
