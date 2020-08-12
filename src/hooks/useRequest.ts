/*
 * @Author: bucai
 * @Date: 2020-07-16 22:24:23
 * @LastEditors: bucai
 * @LastEditTime: 2020-07-18 09:37:22
 * @Description: 
 */

import { useState, useCallback, useEffect } from "react";
import { Response } from "@bucai/taro-request";

function useRequest<T> (fn: (...args: any[]) => Promise<Response<T>>) {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState<boolean>(false);

  const run = useCallback(async (...args: any[]) => {
    setLoading(true);
    try {
      const _data: T = await fn(...args);
      setData(_data);
    } catch (_error) {
      setError(_error);
    } finally {
      setLoading(false);
    }

  }, [fn]);

  return { data, error, loading, run };
}

export default useRequest;