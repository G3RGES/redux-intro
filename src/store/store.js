import { createStore } from "redux";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
      };
    case "account/withdraw":
      return {
        ...state,
        balance: state.balance - action.payload,
      };

    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: state.loan + action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };

    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };

    //* INCASE THE payLoan CAN BE PAID IN AMOUNTS IT TAKES A PAYLOAD WITH THE AMOUNT
    //* PAID AND IT'S DEDUCTED FROM THE BALANCE AND THE LOAN IS SET TO
    //* LOAN AMOUNT - AMOUNT PAID (state.loan - action.payload)
    // case "account/payLoan":
    //   return {
    //     ...state,
    //     loan: state.loan - action.payload,
    //     loanPurpose: "",
    //     balance: state.balance - action.payload,
    //   };

    default:
      return state;
  }
}

const store = createStore(reducer);

store.dispatch({
  type: "account/deposit",
  payload: 500,
});

store.dispatch({
  type: "account/withdraw",
  payload: 200,
});
console.log(store.getState());

store.dispatch({
  type: "account/requestLoan",
  payload: {
    amount: 1000,
    purpose: "car",
  },
});

console.log(store.getState());

// store.dispatch({
//   type: "account/payLoan",
//   payload: 500,
// });

store.dispatch({
  type: "account/payLoan",
});

console.log(store.getState());
