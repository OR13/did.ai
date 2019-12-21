import { connectRouter } from "connected-react-router";

// Reducers.
import hello from "./hello";
import history from "./history";

export default {
  router: connectRouter(history),
  hello: hello.reducer
};
