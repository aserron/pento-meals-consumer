import {AxiosError} from "axios";

export type State = 'all' | 'open' | 'done'

export interface MyMeta extends Record<string, unknown> {
    optionalData?: string
}

declare module '@tanstack/react-query' {
    interface Register {
        queryMeta: MyMeta,
        mutationMeta: MyMeta,
        defaultError: AxiosError
    }
}
