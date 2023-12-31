import store from "@/redux/store";
import { Provider, useDispatch } from "react-redux";
import "@/styles/globals.css";
import Container from "@/layouts/Container";

export default function App({ Component, pageProps }) {

  return (
    <Provider store={store}>
      <Container>
        <Component {...pageProps} />
      </Container>
    </Provider>
  );
}
