import { View, Text, StyleSheet, FlatList } from "react-native";
import CustomButton from "../components/CustomButton";
import { OrderStatus, updateOrderStatus } from "../redux/ordersSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useTheme } from "../contexts/ThemeContext";

export default function OrdersScreen() {

  const { colors } = useTheme();
  const dispatch = useAppDispatch();

  const orders = useAppSelector((state) => state.orders.orders);

  const activeOrders = orders.filter(
    (order) => order.status !== "Entregado"
  );

  const getNextStatus = (currentStatus : OrderStatus): OrderStatus => {
    if(currentStatus === 'Recibido'){
      return 'En diagnóstico';
    }

    if(currentStatus === 'En diagnóstico'){
      return 'En reparación';
    }

    if(currentStatus === 'En reparación'){
      return 'Listo para entrega';
    }

    if(currentStatus === 'Listo para entrega'){
      return 'Entregado';
    }

    return "Entregado";
  };

  const getStatusStyle = (status: OrderStatus) => {
  if (status === "Recibido") {
    return styles.receivedStatus;
  }

  if (status === "En diagnóstico") {
    return styles.diagnosisStatus;
  }

  if (status === "En reparación") {
    return styles.repairStatus;
  }

  if (status === "Listo para entrega") {
    return styles.readyStatus;
  }

  if (status === "Entregado") {
    return styles.deliveredStatus;
  }

  return styles.defaultStatus;
};

  const handleUpdateStatus = (code: string, currentStatus: OrderStatus) => {
    const nextStatus = getNextStatus(currentStatus);

    dispatch(updateOrderStatus({ code, status: nextStatus }));
  };
  

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Órdenes activas 🛠️</Text>

      <FlatList
        data={activeOrders}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No hay órdenes activas.</Text>
        }
        renderItem={({ item }) => (
          <View style={[
            styles.card,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
            },
          ]}>
            <Text style={[styles.code, { color: colors.primary }]}>{item.code}</Text>
            <Text style={[styles.text, { color: colors.text }]}>Cliente: {item.clientName}</Text>
            <Text style={[styles.text, { color: colors.text }]}>Teléfono: {item.phone}</Text>
            <Text style={[styles.text, { color: colors.text }]}>Marca de vehículo: {item.marca}</Text>
            <Text style={[styles.text, { color: colors.text }]}>Matricula: {item.matricula}</Text>
            <Text style={[styles.text, { color: colors.text }]}>Problema: {item.problem}</Text>
            <Text style={[styles.date, { color: colors.mutedText }]}>Fecha de ingreso: {item.entryDate}</Text>

            <Text style={[styles.status, getStatusStyle(item.status)]}>
              Estado actual: {item.status}
            </Text>

            <CustomButton
              title="Avanzar estado"
              onPress={() => handleUpdateStatus(item.code, item.status)}
              variant="primary"
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eaeaea",
    padding: 20,
    alignItems:'center'
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 25,
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  code: {
    fontSize: 25,
    fontWeight: "bold",
    margin:10,
    textAlign:'center'
  },
  status: {
    paddingVertical: 10,
    textAlign:'center',
    borderRadius: 10,
    fontWeight: "bold",
    backgroundColor: "#ddd",
  },
  receivedStatus: {
  backgroundColor: "#e0e0e0",
  color: "#333",
  },

  diagnosisStatus: {
    backgroundColor: "#bbdefb",
    color: "#0d47a1",
  },

  repairStatus: {
    backgroundColor: "#ffe0b2",
    color: "#e65100",
  },

  readyStatus: {
    backgroundColor: "#c8e6c9",
    color: "#1b5e20",
  },

  deliveredStatus: {
    backgroundColor: "#d1c4e9",
    color: "#311b92",
  },

  defaultStatus: {
    backgroundColor: "#ddd",
    color: "#333",
  },
  
  text: {
    fontSize: 15,
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    marginTop: 8,
    color: "#555",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
});
