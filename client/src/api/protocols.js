const apiUrl = "http://localhost:2020";

export async function Get(path) {
  const res = await fetch(apiUrl + path, {
    method: "get",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await res.json();
}

export async function Post(path, request) {
  const res = await fetch(apiUrl + path, {
    method: "post",
    credentials: "include",
    body: JSON.stringify(request),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await res.json();
}