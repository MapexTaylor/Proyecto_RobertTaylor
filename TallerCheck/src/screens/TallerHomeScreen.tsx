import { View, Text, StyleSheet } from "react-native";
import CustomButton from "../components/CustomButton";
import { useAppSelector } from "../redux/hooks";
import { useTheme } from "../contexts/ThemeContext";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TallerHomeScreen({ navigation }: any) {

  const { colors } = useTheme();
  
  const orders = useAppSelector((state) => state.orders.orders);

  const activeOrdersCount = orders.filter(
    (order) => order.status !== "Entregado"
  ).length;

  const deliveredOrdersCount = orders.filter(
    (order) => order.status === "Entregado"
  ).length;

  const totalOrdersCount = orders.length;

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
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Panel del Taller 🔧</Text>

      <Text style={[styles.subtitle, { color: colors.subtitle }]}>
        Administra y revisa el estado de las reparaciones registradas.
      </Text>

      <View style={styles.summaryContainer}>
        <View style={[[styles.summaryCard,{backgroundColor: colors.card,borderColor: colors.border,},],{backgroundColor: colors.card,borderColor: colors.border,},]}>
          <Text style={[[styles.summaryNumber, { color: colors.primary }], { color: colors.primary }]}>{activeOrdersCount}</Text>
          <Text style={[[styles.summaryText, { color: colors.text }], { color: colors.text }]}>Órdenes activas</Text>
        </View>

        <View style={[styles.summaryCard,{backgroundColor: colors.card,borderColor: colors.border,},]}>
          <Text style={[styles.summaryNumber, { color: colors.primary }]}>{diagnosisOrders}</Text>
          <Text style={[[styles.summaryText, { color: colors.text }], { color: colors.text }]}>En diagnóstico</Text>
        </View>

        <View style={[styles.summaryCard,{backgroundColor: colors.card,borderColor: colors.border,},]}>
          <Text style={[styles.summaryNumber, { color: colors.primary }]}>{repairingOrders}</Text>
          <Text style={[styles.summaryText, { color: colors.text }]}>En reparación</Text>
        </View>

        <View style={[styles.summaryCard,{backgroundColor: colors.card,borderColor: colors.border,},]}>
          <Text style={[styles.summaryNumber, { color: colors.primary }]}>{readyToGoOrders}</Text>
          <Text style={[styles.summaryText, { color: colors.text }]}>Listas para entrega</Text>
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
    </SafeAreaView>
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