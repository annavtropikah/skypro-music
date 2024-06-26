"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "./store";
import { type } from "os";

type ReduxProviderType = {
    children: React.ReactNode,
}

export default function ReduxProvider({ children }: ReduxProviderType) {
    const storeRef = useRef<AppStore>();
    if (!storeRef.current) {
        //для сохранения переменной во время перерендора, чтобы значени не сбрасывалось используем ref
        storeRef.current = makeStore();
    }

    return <Provider store={storeRef.current}>{children}</Provider>;
}