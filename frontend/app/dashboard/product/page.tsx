import { Form } from './components/form'
import { api } from '../../../services/api'
import { getCookieServer } from '../../../lib/cookieServer'

export default async function Product() {
  const token = await getCookieServer();  
  
  try {
    const response = await api.get("/category", {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    return <Form categories={response.data} />;
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
    return <Form categories={[]} />;
  }
}
