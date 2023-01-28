import { ChangeEvent, ReactNode, useReducer } from "react";
//Setting up a reducer is not complicated, but verbose and it is easy to get
//lost with the type declarations that typescript requires. But once done, it
//will save more lines on react components passing props between childrens.

//useReducer REPLACES useSate, the idea being to avoid the passing of state to
//unecessary but unavoidable childrens, just to reach another one deep nested. This
//can trigger a lot of re-renders, affecting performance and verbosing your code

//The structure of the initial state, the one to be used
const initState = { count: 0, text: "" };

// This enum is somewhat controvertial, not everbody likes it inside javascript,
//but is a way to get constants and avoid writing mistakeable code
const enum REDUCER_ACTION_TYPE {
  INCREMENT,
  DECREMENT,
  NEW_INPUT,
}

// the structure of the reducer to use
type ReducerAction = {
  type: REDUCER_ACTION_TYPE;
  payload?: string;
};

//a reducer is a function that takes a state and a 'action', and returns
//the state UPDATED with the new info. Pls do not forget to use the spread
//operator to avoid replacing the whole state.
const reducer = (
  state: typeof initState,
  action: ReducerAction
): typeof initState => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.INCREMENT:
      return { ...state, count: state.count + 1 };
    case REDUCER_ACTION_TYPE.DECREMENT:
      return { ...state, count: state.count - 1 };
    case REDUCER_ACTION_TYPE.NEW_INPUT:
      return { ...state, text: action.payload ?? "" };
    default:
      throw new Error();
  }
};

//type of the children that the component function uses
type ChildrenType = {
  children: (num: number) => ReactNode;
};

export default function UseReducerTest({ children }: ChildrenType) {
  /*const [count, setCount] = useState<number>(1);*/

  //useReducer is a hook (function) that needs a reducer(switch cases
  //with state) and an initial state to be initialized. It then get destructured
  //assigned between the dispatch (our "setter") and the state.

  const [state, dispatch] = useReducer(reducer, initState);

  //As you can see, we only write 1 line of code regarding the state, but in
  //fact we have 3 different types of actions/states. They were REDUCED.

  const increment = () => {
    /*setCount(prev => prev + 1) */
    dispatch({ type: REDUCER_ACTION_TYPE.INCREMENT });
  };
  const decrement = () => {
    dispatch({ type: REDUCER_ACTION_TYPE.DECREMENT });
  };
  const handleTextInput = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: REDUCER_ACTION_TYPE.NEW_INPUT, payload: e.target.value });
  };

  return (
    <>
      <h1>{children(state.count)}</h1>
      <button onClick={increment}> aumentaaa</button>
      <button onClick={decrement}> restaaa</button>

      <input type="text" onChange={handleTextInput}></input>
      <h2>{state.text}</h2>
    </>
  );
}
