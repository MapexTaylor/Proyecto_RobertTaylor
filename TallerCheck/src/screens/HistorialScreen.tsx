import { ScrollView, View, Text, StyleSheet } from "react-native";
import { useAppSelector } from "../redux/hooks";
import { useTheme } from "../contexts/ThemeContext";

export default function HistoryScreen() {

  const { colors } = useTheme();

  const orders = useAppSelector((state) => state.orders.orders);

  const deliveredOrders = orders.filter(
    (order) => order.status === "Entregado"
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Historial</Text>

      <Text style={[styles.subtitle, { color: colors.subtitle }]}>
        Reparaciones que ya fueron entregadas al cliente.
      </Text>

      {deliveredOrders.map((order) => (
        <View key={order.id} style={[styles.card,{backgroundColor: colors.card,borderColor: colors.border,},]}>
          <View style={styles.cardHeader}>
            <Text style={[styles.code, { color: colors.primary }]}>{order.code}</Text>
            <Text style={styles.status}>{order.status}</Text>
          </View>

          <Text style={[styles.text, { color: colors.text }]}>Cliente: {order.clientName}</Text>
          <Text style={[styles.text, { color: colors.text }]}>Teléfono: {order.phone}</Text>
          <Text style={[styles.text, { color: colors.text }]}>Vehículo: {order.marca}</Text>
          <Text style={[styles.text, { color: colors.text }]}>Matrícula: {order.matricula}</Text>
          <Text style={[styles.text, { color: colors.text }]}>Problema: {order.problem}</Text>
          <Text style={[styles.date, { color: colors.mutedText }]}>Fecha de ingreso: {order.entryDate}</Text>
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
    backgroundColor: "#c8e6c9",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    fontWeight: "bold",
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