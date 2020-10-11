const apiUrl = "http://159.89.86.142:2020";

export async function Get(path) {
  const res = await fetch(apiUrl + path, {
    method: "get",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  console.log(data);

  return data
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

  const data = await res.json();

  return data
}