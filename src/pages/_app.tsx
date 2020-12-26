import "tailwindcss/tailwind.css";
import {AppProps} from "next/app";
import {QueryClient, QueryClientProvider} from "react-query";
import React from "react";
import {ToastProvider} from 'react-toast-notifications'
import {ModalProvider} from "react-modal-hook";

const queryClient = new QueryClient();

export default function MyApp({Component, pageProps}: AppProps) {
  return <QueryClientProvider client={queryClient}>
    <ModalProvider>
      <ToastProvider placement={"bottom-right"} autoDismiss>
        <div className="bg-gray-200 w-full h-screen">
          <Component {...pageProps} />
        </div>
      </ToastProvider>
    </ModalProvider>
    <div id="modal"/>
  </QueryClientProvider>
}
