"use client";

import { useState, useEffect, useCallback } from "react";

export function useAdminFetch<T>(url: string) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(url);
      const json = await res.json();
      if (!json.success) throw new Error(json.error || `Failed to load data from ${url}`);
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    let ignore = false;
    (async () => {
      if (!ignore) await fetchData();
    })();
    return () => { ignore = true; };
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
