import { View, Text, StyleSheet } from "react-native";
import CustomButton from "../components/CustomButton";
import { useOrders } from "../contexts/OrdersContext";

export default function TallerHomeScreen({ navigation }: any) {
  const { orders } = useOrders();

  const activeOrders = orders.filter(
    (order)=>order.status !== "Entregado"
  ).length;

  const diagnosisOrders = orders.filter(
    (order)=>order.status === "En diagnóstico"
  ).length;

  const repairingOrders = orders.filter(
    (order)=>order.status === "En reparación"
  ).length;

  const readyToGoOrders = orders.filter(
    (order) => order.status === "Listo para entrega"
  ).length;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Panel del Taller 🔧</Text>

      <Text style={styles.subtitle}>
        Administra y revisa el estado de las reparaciones registradas.
      </Text>

      <View style={styles.summaryContainer}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryNumber}>{activeOrders}</Text>
          <Text style={styles.summaryText}>Órdenes activas</Text>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryNumber}>{diagnosisOrders}</Text>
          <Text style={styles.summaryText}>En diagnóstico</Text>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryNumber}>{repairingOrders}</Text>
          <Text style={styles.summaryText}>En reparación</Text>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryNumber}>{readyToGoOrders}</Text>
          <Text style={styles.summaryText}>Listas para entrega</Text>
        </View>
      </View>

      <View style={styles.buttonsContainer}>
        <CustomButton
          title="Registrar nueva orden"
          onPress={() => navigation.navigate("NuevaOrden")}
          variant="primary"
        />

        <CustomButton
          title="Ver órdenes activas"
          onPress={() => navigation.navigate("Ordenes")}
          variant="secondary"
        />

        <CustomButton
          title="Ver historial"
          onPress={() => navigation.navigate("Historial")}
          variant="secondary"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eaeaea",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 25,
    color: "#333",
  },
  summaryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  summaryCard: {
    backgroundColor: "#ffffff",
    width: "48%",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  summaryNumber: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1f6feb",
  },
  summaryText: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 5,
  },
  buttonsContainer: {
    gap: 10,
    alignItems:'center'
  },
});