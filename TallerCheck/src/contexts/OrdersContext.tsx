import { createContext, useContext, useState } from "react";
import { ordersData } from "../data/ordersData";

export type OrderStatus =
  | "Recibido"
  | "En diagnóstico"
  | "En reparación"
  | "Listo para entrega"
  | "Entregado";

export type Order = {
  id: string;
  code: string;
  clientName: string;
  phone: string;
  marca: string;
  matricula: string;
  problem: string;
  entryDate: string;
  status: OrderStatus;
};

type NewOrderData = {
  clientName: string;
  phone: string;
  marca: string;
  matricula: string;
  problem: string;
};

type OrdersContextType = {
  orders: Order[];
  addOrder: (newOrderData: NewOrderData) => string;
  findOrderByCode: (code: string) => Order | undefined;
  updateOrderStatus: (code: string, status: OrderStatus) => void;
};

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

export function OrdersProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(ordersData as Order[]);

  const generateCode = () => {
    const nextNumber = orders.length + 1;
    return `TC-${String(nextNumber).padStart(3, "0")}`;
  };

  const addOrder = (newOrderData: NewOrderData) => {
    const generatedCode = generateCode();

    const newOrder: Order = {
      id: Date.now().toString(),
      code: generatedCode,
      clientName: newOrderData.clientName,
      phone: newOrderData.phone,
      marca: newOrderData.marca,
      matricula: newOrderData.matricula,
      problem: newOrderData.problem,
      entryDate: new Date().toLocaleDateString(),
      status: "Recibido",
    };

    setOrders((prevOrders) => [...prevOrders, newOrder]);

    return generatedCode;
  };

  const findOrderByCode = (code: string) => {
    return orders.find(
      (order) => order.code.toUpperCase() === code.toUpperCase().trim()
    );
  };

  const updateOrderStatus = (code: string, status: OrderStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.code === code ? { ...order, status: status } : order
      )
    );
  };

  return (
    <OrdersContext.Provider
      value={{
        orders,
        addOrder,
        findOrderByCode,
        updateOrderStatus,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrdersContext);

  if (!context) {
    throw new Error("useOrders debe usarse dentro de OrdersProvider");
  }

  return context;
}