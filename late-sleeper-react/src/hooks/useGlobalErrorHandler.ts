import { useEffect, useState } from "react";

/**
 * TODO: Make it work
 */
export function useGlobalErrorHandler() {
  const [err, setErr] = useState<ErrorEvent | null>(null);

  useEffect(() => {}, []);

  return err;
}
