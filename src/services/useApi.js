import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

function useApi(endPoint) {
  const { data, isError, isLoading } = useQuery({
    queryKey: [endPoint],
    queryFn: () => {
      return axios.get(`https://ecommerce.routemisr.com/api/v1/${endPoint}`);
    },
  });
  return { data, isError, isLoading };
}

export default useApi;
