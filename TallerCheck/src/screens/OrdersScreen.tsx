import { ScrollView, View, Text, StyleSheet } from "react-native";
import { ordersData } from "../data/ordersData";

export default function OrdersScreen() {
  const activeOrders = ordersData.filter(
    (order) => order.status !== "Entregado"
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Órdenes Activas</Text>

      <Text style={styles.subtitle}>
        Reparaciones que todavía están en proceso dentro del taller.
      </Text>

      {activeOrders.map((order) => (
        <View key={order.id} style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.code}>{order.code}</Text>

            <Text
              style={[
                styles.status,
                order.status === "En reparación" && styles.repairStatus,
                order.status === "En diagnóstico" && styles.diagnosisStatus,
              ]}
            >
              {order.status}
            </Text>
          </View>

          <Text style={styles.text}>Cliente: {order.clientName}</Text>
          <Text style={styles.text}>Teléfono: {order.phone}</Text>
          <Text style={styles.text}>Vehículo: {order.marca}</Text>
          <Text style={styles.text}>Problema: {order.problem}</Text>
          <Text style={styles.date}>Ingreso: {order.entryDate}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eaeaea",
    padding: 20,
  },
  title: {
    fontSize: 27,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  code: {
    fontSize: 18,
    fontWeight: "bold",
  },
  status: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    fontWeight: "bold",
    backgroundColor: "#ddd",
  },
  repairStatus: {
    backgroundColor: "#ffe0b2",
  },
  diagnosisStatus: {
    backgroundColor: "#bbdefb",
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
});