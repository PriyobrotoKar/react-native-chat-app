import { PostgrestQueryBuilder } from "@supabase/postgrest-js";
import { QueryData, QueryResult } from "@supabase/supabase-js";
import React, { useEffect, useState } from "react";

const useSupabaseQuery = <T,>(query: T) => {
  const [data, setData] = useState<QueryData<T> | null>(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const { data, error }: any = await query;
      setData(data);
    })();
  }, []);

  return { data, setData };
};

export default useSupabaseQuery;
