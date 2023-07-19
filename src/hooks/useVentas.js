import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API } from "../api/api";

export const api = axios.create({
  baseURL: API + "/venta",
});

const getVentas = async () => {
  const { data } = await api.get("/");
  return data;
};

export const useGetVentas = () => {
  return useQuery({
    queryKey: ["ventas"],
    queryFn: getVentas,
    select: (ventas) => ventas.sort((a, b) => b.id - a.id),
  });
};

export const registrarVenta = (venta) => {
  return api.post("/registro-venta", venta);
};

