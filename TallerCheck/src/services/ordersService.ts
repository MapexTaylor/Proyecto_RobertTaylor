import { supabase } from "../lib/supabase";
import { Order, OrderStatus } from "../redux/ordersSlice";

export const saveOrderToSupabase = async (order: Order) => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("No hay usuario autenticado.");
  }

  const { error } = await supabase.from("orders").insert({
    id: order.id,
    code: order.code,
    client_name: order.clientName,
    phone: order.phone,
    marca: order.marca,
    matricula: order.matricula,
    problem: order.problem,
    entry_date: order.entryDate,
    status: order.status,
    mechanic_id: user.id,
  });

  if (error) {
    throw error;
  }
};

export const getOrdersFromSupabase = async () => {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    throw error;
  }

  return data.map((order) => ({
    id: order.id,
    code: order.code,
    clientName: order.client_name,
    phone: order.phone,
    marca: order.marca,
    matricula: order.matricula,
    problem: order.problem,
    entryDate: order.entry_date,
    status: order.status,
  }));
};

export const updateOrderStatusInSupabase = async (
  code: string,
  status: OrderStatus
) => {
  const { error } = await supabase
    .from("orders")
    .update({ status })
    .eq("code", code);

  if (error) {
    throw error;
  }
};