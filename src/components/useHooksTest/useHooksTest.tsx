import { useCallback, useMemo, useRef, useState } from "react";

export default function UseHooksTest() {
  const [count, setCount] = useState<number>(0);
  //useRef is used mostly to get into DOM elements, because we can not use
  //javascript document obj like for example, 'let domElem = document.getElementById'
  //instead we use useRef like below, and then we can manipulate the DOM.
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    inputRef?.current?.focus();
  };

  //useCallback "memoize" a function in cache, so it will not re render between
  //renders. It will give you the function to you for using it whenever u like,
  //but it will NOT CALL IT, just store it in cache. I think this is useful to
  //avoid some unnecesary renders and/or to savethe potential result of the
  //function with the arguments that are binded within the dependency array.
  const addTwo = useCallback((): void => setCount(prev => prev + 2), []);

  //define the type of my fib functions, it is the same that doing it on the
  //function itself, but for lulz. I think it betters the lecture of the
  //function definition without all that types in the middle of the declaration
  type fibFunc = (n: number) => number;

  const fib: fibFunc = n => {
    if (n < 2) return n;
    return fib(n - 1) + fib(n - 2);
  };

  const myNum = 30;

  // useMemo "memoize" a value, usually the result of expensive calculation. The
  //idea behind is to save that time and power by memoizing the value in cache
  //in a variable to be used later. This is good because it will not be calculated
  //over and over if the component is rerendered, only once.
  const resultOfFib = useMemo(() => fib(myNum), [myNum]);

  return (
    <>
      <button onClick={addTwo}>{count}</button>
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>Focus Input</button>
      <h2>
        the result of doing a fibonacci of {myNum} is : {resultOfFib}
      </h2>
    </>
  );
}
