import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API } from "../api/api";

export const api = axios.create({
  baseURL: API + "/producto",
});

const getProducts = async () => {
  const { data } = await api.get("/");
  return data;
};

export const useGetProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    select: (products) => products.sort((a, b) => b.id - a.id),
  });
};

export const createProduct = (product) => {
  return api.post("/crear", product);
};

export const deleteProduct = (id) => {
  return api.delete(`/${id}`);
};

export const updateProduct = (product) => {
  return api.put(`/${product.id}`, product);
};
