import { authAxios } from "./authAxios";
import type { AxiosError } from "axios";

// GETリクエスト用fetcher（SWR等で利用）
export const fetcherGet = async <T>(url: string): Promise<T> =>
    authAxios.get<T>(url)
        .then((res: { data: T }) => res.data)
        .catch((err: AxiosError) => {
            // ネットワークエラー時の特別処理
            if (err?.message?.startsWith("Network Error")) {
                throw { message: "Network Error" };
            }
            throw err.response;
        });

// POSTリクエスト用fetcher
export const fetcherPost = <T>(url: string, body: object = {}) =>
    authAxios.post<T>(url, body)
        .then((res: { data: T }) => {
            return {data: res.data, err: undefined}
        })
        .catch((err: AxiosError) => {
            return {data: null, err: err.response}
        })

// PUTリクエスト用fetcher
export const fetcherPut = <T>(url: string, body: object = {}) =>
    authAxios.put<T>(url, body)
        .then((res: import("axios").AxiosResponse<T>) => {
            return {data: res, err: undefined}
        })
        .catch((err: AxiosError) => {
            return {data: undefined, err: err.response}
        })

// DELETEリクエスト用fetcher
export const fetcherDelete = <T>(url: string) =>
    authAxios.delete<T>(url)
        .then((res: import("axios").AxiosResponse<T>) => {
            return { data: res.data, err: undefined };
        })
        .catch((err: AxiosError) => {
            return { data: undefined, err: err.response };
        });

// PATCHリクエスト用fetcher
export const fetcherPatch = <T>(url: string, body: object = {}) =>
  authAxios.patch<T>(url, body)
    .then((res: import("axios").AxiosResponse<T>) => {
      return { data: res, err: undefined };
    })
    .catch((err: AxiosError) => {
      return { data: undefined, err: err.response };
    });
