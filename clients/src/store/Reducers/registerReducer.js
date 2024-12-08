import { REGISTER_SUCCESS, REGISTER_FAILED } from "./actionTypes";

const initialState = {
  errors: null,
  users: null,
  loading: false,
};

export const registerReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading:false
      };
    case REGISTER_FAILED:
      return {
        ...state,
        errors: payload,
        loading:false
      };
    default:
      return state;
  }
};
