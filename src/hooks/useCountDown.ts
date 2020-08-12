/*
 * @Author: bucai
 * @Date: 2020-07-13 21:59:22
 * @LastEditors: bucai
 * @LastEditTime: 2020-07-16 22:30:12
 * @Description: 
 */
import { useState, useRef, useEffect, useCallback } from "react";

const useCountDown = (initCount) => {
  const [count, setCount] = useState(initCount);
  const clock = useRef<NodeJS.Timeout>();

  useEffect(() => {
    clock.current = setInterval(() => {
      setCount((_count: number) => _count - 1);
    }, 1000)
    return () => { };
  }, []);
  const clearCount = useCallback(() => {
    clock.current && clearInterval(clock.current);
  }, [])

  return { count, clearCount };
}

export default useCountDown;