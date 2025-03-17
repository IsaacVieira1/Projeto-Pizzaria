import { Orders } from "./components/orders";
import { api } from '../../services/api' 
import { getCookieServer } from '../../lib/cookieServer' 
import { OrderProps } from '../../lib/order.type'   
 
async function getOrders(): Promise<OrderProps[] | []> {
  try {
    const token = await getCookieServer();  

    if (!token) {
      console.error("Token não encontrado");
      return [];
    }

    return api.get("/orders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data || [];
    })
    .catch((err) => {
      console.error("Erro ao buscar pedidos:", err.response?.data || err.message);
      return [];
    });
  } catch (err) {
    console.error("Erro ao obter token:", err);
    return [];
  }
}


export default async function Dashboard(){

  const orders = await getOrders();

  return(
    <>
     <Orders orders={orders}/>
    </>
  )
}