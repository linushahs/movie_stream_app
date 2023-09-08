import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { RecoilRoot } from "recoil";
import "./index.css";
import { router } from "./routes/routes.tsx";
import DebugObserver from "./stores/DebugObserver.tsx";

//css styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";

//firebase
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase/firebaseConfig.ts";

//initialize firebase app
initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RecoilRoot>
      <DebugObserver />
      <RouterProvider router={router} />
    </RecoilRoot>
  </React.StrictMode>
);
