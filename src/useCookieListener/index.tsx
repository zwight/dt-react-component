import { useEffect, useRef } from 'react';
import { Cookies } from '@dtinsight/dt-utils';
import { isEqual } from 'lodash-es';

export interface Fields {
    key: string;
    value: string | undefined;
}
export interface ICookieOptions {
    timeout?: number; // 轮训间隔
    immediately?: boolean; // 当Cookie字段为新增时是否会触发
}

const defaultOptions: ICookieOptions = {
    timeout: 200,
    immediately: false,
};

type CompareCookieHandler = (params: {
    prevValue: Record<string, string | undefined>;
    nextValue: Record<string, string | undefined>;
    changedFields?: Fields[];
}) => void;

const getWatchFieldsValue = (watchFields: string[]) => {
    const result: Record<string, string | undefined> = {};
    if (!watchFields.length) {
        return Cookies.get();
    }
    for (let i = 0; i < watchFields.length; i++) {
        const key = watchFields[i];
        const value = Cookies.get(key);
        result[key] = value;
    }
    return result;
};

const useCookieListener = (
    handler: CompareCookieHandler,
    watchFields: string[],
    options: ICookieOptions = defaultOptions
) => {
    const { timeout, immediately } = options;
    const isWatchAll = !watchFields.length;
    const timerRef = useRef<number>();
    const currentCookiesRef = useRef<Record<(typeof watchFields)[number], string | undefined>>(
        getWatchFieldsValue(watchFields)
    );
    const handlerRef = useRef<CompareCookieHandler>();
    handlerRef.current = handler;

    useEffect(() => {
        timerRef.current = window.setInterval(() => {
            compareValue();
        }, timeout);
        return () => {
            window.clearInterval(timerRef.current);
        };
    }, []);

    const handleFieldsChange = (
        prevValue: Record<string, string | undefined>,
        nextValue: Record<string, string | undefined>
    ) => {
        const changedFields: Fields[] = [];
        for (let i = 0; i < watchFields.length; i++) {
            const key = watchFields[i];
            const originValue = prevValue[key];
            const newValue = nextValue[key];
            if (originValue === newValue) continue;
            if (originValue === undefined && !immediately) continue;
            changedFields.push({ key, value: newValue });
        }
        if (!changedFields.length) return;
        handlerRef.current?.({ changedFields, prevValue, nextValue });
    };

    const compareValue = () => {
        const prevValue = currentCookiesRef.current;
        const nextValue = getWatchFieldsValue(watchFields);
        if (!isEqual(prevValue, nextValue)) {
            isWatchAll
                ? handlerRef.current?.({ prevValue, nextValue })
                : handleFieldsChange(prevValue, nextValue);
            currentCookiesRef.current = nextValue;
        }
    };
};

export default useCookieListener;
