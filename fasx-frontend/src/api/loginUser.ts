export async function loginUser(email: string, password: string) {
  const res = await fetch("http://87.249.50.183:4000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Ошибка входа");
  }

  return data;
}

