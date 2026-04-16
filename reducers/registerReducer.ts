function registerReducer(
  state: { email: string; password: string; confirm: string },
  action: { type: string; email?: string; password?: string; confirm?: string },
) {
  switch (action.type) {
    case "SET_EMAIL":
      return { ...state, email: action.email ?? state.email };
    case "SET_PASSWORD":
      return { ...state, password: action.password ?? state.password };
    case "SET_CONFIRM":
      return { ...state, confirm: action.confirm ?? state.confirm };
    default:
      return state;
  }
}

export default registerReducer;
