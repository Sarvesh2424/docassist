const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function loginReducer(
  state: {
    email: string;
    password: string;
    error: { email: string; password: string };
  },
  action: { type: string; email?: string; password?: string },
) {
  switch (action.type) {
    case "SET_EMAIL":
      return { ...state, email: action.email ?? state.email };
    case "SET_PASSWORD":
      return { ...state, password: action.password ?? state.password };
    case "VALIDATE_EMAIL":
      return {
        ...state,
        error: {
          ...state.error,
          email: regex.test(state.email)
            ? ""
            : state.email.length === 0
              ? "Email cannot be empty!"
              : "Invalid email format!",
        },
      };
    case "VALIDATE_PASSWORD":
      return {
        ...state,
        error: {
          ...state.error,
          password:
            state.password.length >= 6
              ? ""
              : state.password.length === 0
                ? "Password cannot be empty!"
                : "Password must be at least 6 characters long!",
        },
      };
    default:
      return state;
  }
}

export default loginReducer;
