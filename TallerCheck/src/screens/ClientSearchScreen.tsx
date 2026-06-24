import { useState } from "react";
import { View, Text, StyleSheet, Alert, ScrollView } from "react-native";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { useAuth } from "../contexts/AuthContext";
import { useAppSelector } from "../redux/hooks";
import { Order } from "../redux/ordersSlice";
import { useTheme } from "../contexts/ThemeContext";

export default function ClientSearchScreen() {
  const { colors } = useTheme();

  const orders = useAppSelector((state) => state.orders.orders);

  //const { findOrderByCode } = useOrders();
  const {logout} = useAuth();
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState("");
  const [orderFound, setOrderFound] = useState<Order | null>(null);

  const handleLogout = () =>{
    logout();      
  }

  const handleSearch = () => {
    setCodeError("");
    setOrderFound(null);

    if (code.trim() === "") {
      setCodeError("Debe ingresar el código de reparación.");
      return;
    }

    if (!code.toUpperCase().startsWith("TC-")) {
      setCodeError("El código debe iniciar con TC-. Ejemplo: TC-001");
      return;
    }

    const foundOrder = orders.find(
      (order) =>
        order.code.toUpperCase() === code.toUpperCase().trim()
    );

    if (!foundOrder) {
      Alert.alert(
        "No encontrado",
        "No se encontró ninguna reparación con ese código."
      );
      return;
    }

    setOrderFound(foundOrder);
  };

  const getClientMessage = (status: string) => {
    if (status === "Recibido") {
      return "Su artículo fue recibido por el taller y está pendiente de revisión.";
    }

    if (status === "En diagnóstico") {
      return "El técnico está revisando el problema reportado.";
    }

    if (status === "En reparación") {
      return "Su artículo está siendo reparado actualmente.";
    }

    if (status === "Listo para entrega") {
      return "Su reparación ya está lista. Puede pasar al taller para retirarla.";
    }

    if (status === "Entregado") {
      return "Esta reparación ya fue entregada al cliente.";
    }

    return "Estado no disponible.";
  };

  const getStatusStyle = (status:string) => {
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
  }


  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={[styles.title, { color: colors.text }]}>Consulta de Reparación</Text>

      <Text style={[styles.subtitle, { color: colors.subtitle }]}>
        Ingrese el código que le entregó el taller para revisar el estado de su reparación.
      </Text>

      <View style={[styles.searchCard,{backgroundColor: colors.card,borderColor: colors.border,},]}>
        <View style={styles.input}>
            <CustomInput
            type="text"
            placeholder="Ejemplo: TC-001"
            value={code}
            onChange={setCode}
            error={codeError}
            />
        </View>
            <CustomButton
            title="Buscar reparación"
            onPress={handleSearch}
            variant="primary"
            />
      </View>

      {orderFound && (
        <View style={[styles.resultCard,{backgroundColor: colors.card,borderColor: colors.border,},]}>
          <Text style={[styles.resultTitle, { color: colors.text }]}>Resultado de la reparación</Text>

          <Text style={[styles.code, { color: colors.primary }]}>{orderFound.code}</Text>

          <Text style={[[styles.label, { color: colors.text }], { color: colors.text }]}>Cliente:</Text>
          <Text style={[styles.value, { color: colors.subtitle }]}>{orderFound.clientName}</Text>

          <Text style={[styles.label, { color: colors.text }]}>Vehículo:</Text>
          <Text style={[styles.value, { color: colors.subtitle }]}>{orderFound.marca}</Text>

          <Text style={[styles.label, { color: colors.text }]}>Problema reportado:</Text>
          <Text style={[styles.value, { color: colors.subtitle }]}>{orderFound.problem}</Text>

          <Text style={[styles.label, { color: colors.text }]}>Fecha de ingreso:</Text>
          <Text style={[styles.value, { color: colors.subtitle }]}>{orderFound.entryDate}</Text>

          <Text style={[styles.label, { color: colors.text }]}>Estado actual:</Text>
          <Text style={[styles.status, getStatusStyle(orderFound.status)]}>{orderFound.status}</Text>

          <Text style={[styles.message, { color: colors.text }]}>
            {getClientMessage(orderFound.status)}
          </Text>
        </View>
      )}
      <CustomButton 
            title={"Volver al inicio!"} 
            onPress={handleLogout}/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eaeaea",
  },
  contentContainer: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
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
  searchCard: {
    backgroundColor: "#fff",
    width: "100%",
    maxWidth: 420,
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 20,
    alignItems:'center'
  },
  input:{
    width: "100%",
    alignItems: "center",
  },
  resultCard: {
    backgroundColor: "#fff",
    width: "100%",
    maxWidth: 420,
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  resultTitle: {
    fontSize: 21,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  code: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
    color: "#1f6feb",
  },
  label: {
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 8,
  },
  value: {
    fontSize: 15,
    color: "#333",
  },
  status: {
    padding: 8,
    borderRadius: 10,
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 5,
  },
  receivedStatus:{
    backgroundColor: '#8194ff'
  },
  diagnosisStatus:{
    backgroundColor:'#fdba62'
  },
  repairStatus:{
    backgroundColor:'#f5ff69'
  },
  readyStatus:{
    backgroundColor:'#d7ff67'
  },
  deliveredStatus:{
    backgroundColor:'#1eff00'
  },
  defaultStatus:{
    backgroundColor: "#ffe0b2",
  },
  message: {
    marginTop: 15,
    fontSize: 20,
    textAlign: "center",
    color: "#333",
    fontWeight:'bold'
  },
});