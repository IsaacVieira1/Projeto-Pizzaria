import { cookies } from 'next/headers';

export async function getCookieServer() {
  const cookieStore = await cookies(); // Aguarda a Promise ser resolvida
  const token = cookieStore.get("session")?.value; // Agora podemos acessar o valor do cookie
  return token || null;
}
