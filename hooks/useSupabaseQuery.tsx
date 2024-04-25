import { useIsFocused } from "@react-navigation/native";
import { PostgrestQueryBuilder } from "@supabase/postgrest-js";
import { QueryData, QueryResult } from "@supabase/supabase-js";
import React, { useEffect, useLayoutEffect, useState } from "react";

const useSupabaseQuery = <T,>(query: T, ignoreFocus: boolean = false) => {
  const isFocused = useIsFocused();

  const [data, setData] = useState<QueryData<T> | null>(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    if (isFocused || ignoreFocus) {
      (async () => {
        setLoading(true);
        const { data, error }: any = await query;
        setData(data);
        setLoading(false);
      })();
    }
  }, [isFocused]);

  return { data, setData, loading };
};

export default useSupabaseQuery;
