import axios from "axios";

const configuredApiUrl = import.meta.env.VITE_API_URL?.trim();

export const apiBaseUrl =
  configuredApiUrl && configuredApiUrl !== "/api"
    ? configuredApiUrl
    : import.meta.env.DEV
      ? "/api"
      : "/_/backend/api";

export const api = axios.create({
  baseURL: apiBaseUrl
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("renato_portfolio_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export function imageUrl(url) {
  if (!url) return "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80";
  if (url.startsWith("http")) return url;
  if (url.startsWith("/uploads")) return `${apiBaseUrl.replace(/\/api\/?$/, "")}${url}`;
  if (url.startsWith("/")) return url;
  return `${apiBaseUrl.replace(/\/api\/?$/, "")}${url}`;
}
