function loginReducer(
  state: { email: string ; password: string  },
  action: { type: string; email?: string; password?: string },
) {
  switch (action.type) {
    case "SET_EMAIL":
      return { ...state, email: action.email ?? state.email };
    case "SET_PASSWORD":
      return { ...state, password: action.password ?? state.password };
    default:
      return state;
  }
}

export default loginReducer;
