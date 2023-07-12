import { useQuery } from "@tanstack/react-query";
import { api } from "../api/api";

const getMedida = async () => {
  const { data } = await api.get("/enums/medida");
  return data;
};

export const useGetMedida = () => {
  return useQuery({
    queryKey: ["medida"],
    queryFn: getMedida,
    staleTime: Infinity, // Evitar peticiones innecesarias durante un tiempo infinito
  });
};

const getCategoria = async () => {
  const { data } = await api.get("/enums/categoria");
  return data;
};

export const useGetCategoria = () => {
  return useQuery({
    queryKey: ["categoria"],
    queryFn: getCategoria,
    staleTime: Infinity, // Evitar peticiones innecesarias durante un tiempo infinito
  });
};
