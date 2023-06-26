import store from "@/redux/store";
import { Provider, useDispatch } from "react-redux";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {

  return (
    <Provider store={store}>
      {/* <Container> */}
        <Component {...pageProps} />
      {/* </Container> */}
    </Provider>
  );
}
