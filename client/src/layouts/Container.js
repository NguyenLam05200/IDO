import { Children, useEffect } from "react";

const Container = ({ children }) => {
//   const dispatch = useDispatch();
//   const setupState = async () => {
//     const initState = await getInitState();
//     dispatch(setInitState(initState));
//   };

//   useEffect(() => {
//     setupState();
//   }, []);

//   useEffect(() => {}, []);
  return <div className="container">{children}</div>;
};

export default Container;
