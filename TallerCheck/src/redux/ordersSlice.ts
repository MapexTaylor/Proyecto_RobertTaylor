import { ordersData } from "../data/ordersData";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

type OrdersState = {
    orders: Order[];
};

const initialState: OrdersState = {
  orders: [],
};

const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers:{
        setOrders: (state, action: PayloadAction<Order[]>) => {
        state.orders = action.payload;
        },

        addOrder: (state, action: PayloadAction<Order>) => {
            state.orders.push(action.payload);
        },

        updateOrderStatus: (
            state,
            action: PayloadAction<{code: String; status: OrderStatus}>
        ) => {
            const orderFound = state.orders.find(
                (order) => order.code === action.payload.code
            );

            if (orderFound) {
                orderFound.status = action.payload.status;
            }
        },
    },
});

export const { addOrder, updateOrderStatus, setOrders } = ordersSlice.actions;
export default ordersSlice.reducer;