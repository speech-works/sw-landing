const BASE_PATH = process.env.NODE_ENV === "production" ? "/sw-landing" : "";

export function withBasePath(path: string) {
  if (!path) return path;
  if (/^(https?:)?\/\//.test(path) || path.startsWith("data:")) return path;

  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_PATH}${normalized}`;
}
