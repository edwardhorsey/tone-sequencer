import {
  Dispatch, Reducer, RefObject, useEffect, useReducer, useRef,
} from 'react';

type UseReducerWithRef<S, A> = [S, Dispatch<A>, RefObject<S>]

const useReducerWithRef = <S, A>(
  reducer: Reducer<S, A>,
  initialState: S,
): UseReducerWithRef<S, A> => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const stateRef = useRef<S>(state);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  return [state, dispatch, stateRef];
};

export default useReducerWithRef;
