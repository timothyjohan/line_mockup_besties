import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import store from "./app/store.js";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter, useNavigate } from "react-router-dom";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";
import { CookiesProvider } from "react-cookie";
import ActualHome from "./pages/ActualHome.jsx";
import Chat from "./pages/Chat.jsx";
import Unauthorized from "./pages/Unauthorized.jsx";
import Add from "./pages/Add.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/error",
    element: <Unauthorized />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/home",
    element: <Home />,
    errorElement: <Unauthorized />
    // children: [
    //   {
    //     path: "",
    //     element: <ActualHome />,
    //   },
    // ],
  },
  {
    path: "/add",
    element: <Add />,
    errorElement: <Unauthorized />
  },
  {
    path: "/chat/:idUser/:idFriend",
    element: <Home />,
    children: [
      {
        path: "",
        element: <Chat />
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CookiesProvider defaultSetOptions={{ path: "/" }}>
      <Provider store={store}>
        <RouterProvider router={router}></RouterProvider>
      </Provider>
    </CookiesProvider>
  </React.StrictMode>
);
