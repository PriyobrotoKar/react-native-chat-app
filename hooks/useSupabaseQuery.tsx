import { useIsFocused } from "@react-navigation/native";
import { PostgrestQueryBuilder } from "@supabase/postgrest-js";
import { QueryData, QueryResult } from "@supabase/supabase-js";
import React, { useEffect, useState } from "react";

const useSupabaseQuery = <T,>(query: T) => {
  const isFocused = useIsFocused();

  const [data, setData] = useState<QueryData<T> | null>(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("useEffect triggered", Date());
    (async () => {
      const { data, error }: any = await query;
      setData(data);
    })();
  }, []);

  return { data, setData };
};

export default useSupabaseQuery;
