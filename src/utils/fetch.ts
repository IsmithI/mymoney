interface ITypedResponse<T = any> extends Response {
  /**
   * this will override `json` method from `Body` that is extended by `Response`
   * interface Body {
   *     json(): Promise<any>;
   * }
   */
  json<P = T>(): Promise<P>;
}

interface IPayload<T> {
  status: number;
  payload: T;
}

declare function fetch<T>(...args: any): Promise<ITypedResponse<T>>;

export const get = <T>(url: string) => fetch<IPayload<T>>(url).then(checkJSON);

export const put = (url: string, data: any) =>
  fetch(url, {
    method: "put",
    body: JSON.stringify(data),
  }).then((res) => res.json());

const checkJSON = (res: Response) => {
  try {
    return res.json();
  } catch (err) {
    throw new Error(err);
  }
};
