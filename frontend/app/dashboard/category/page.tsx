import styles from './styles.module.scss'
import { Button } from "../../../app/dashboard/components/button"  
import { api } from '../../../services/api' 
import { redirect } from 'next/navigation'
import { getCookieServer } from '../../../lib/cookieServer'
import { AxiosError } from 'axios'

export default function Category() {

  async function handleRegisterCategory(formData: FormData) {
    "use server"
    
    const name = formData.get("name")
    if (!name) return;

    const data = { name };
    
    try {
      const token = await getCookieServer(); 

      console.log("Token recebido:", token); 

      if (!token) {
        console.error("Erro: Token não encontrado.");
        return;
      }

      const response = await api.post("/category", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      console.log("Resposta da API:", response.data);
      redirect("/dashboard");

    } catch (err: unknown) {
      if (err instanceof AxiosError) {   
        console.error("Erro na requisição:", err.response?.data || err.message);
      } else {
        console.error("Erro desconhecido:", err);
      }
    }
  }

  return (
    <main className={styles.container}>
      <h1>Nova Categoria</h1>

      <form 
        className={styles.form}
        action={handleRegisterCategory}
      >
        <input 
          type="text"
          name="name"
          placeholder="Nome da categoria, ex: Pizzas"
          required
          className={styles.input}
        />

        <Button name="Cadastrar" />
      </form>
    </main>
  );
}
