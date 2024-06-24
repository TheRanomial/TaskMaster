"use client"

import React, { useEffect, useState } from "react";
import { GlobalProvider } from "../_context/globalProvider";

interface Props {
  children: React.ReactNode;
}

export default function ContextProvider({ children }: Props) {
  const [ready, setIsReady] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsReady(true);
    }, 250);
  }, []);

  if(!ready){
    return null;
  }

  return <GlobalProvider>{children}</GlobalProvider>;
}
