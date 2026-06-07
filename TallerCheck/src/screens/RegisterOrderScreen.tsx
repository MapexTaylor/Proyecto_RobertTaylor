import { useState } from "react";
import { ScrollView, View, Text, StyleSheet, Alert } from "react-native";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";

export default function RegisterOrderScreen() {
  const [clientName, setClientName] = useState("");
  const [phone, setPhone] = useState("");
  const [item, setItem] = useState("");
  const [problem, setProblem] = useState("");

  const [clientNameError, setClientNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [itemError, setItemError] = useState("");
  const [problemError, setProblemError] = useState("");

  const handleSave = () => {
    let isValid = true;

    setClientNameError("");
    setPhoneError("");
    setItemError("");
    setProblemError("");

    if (clientName.trim() === "") {
      setClientNameError("El nombre del cliente es obligatorio.");
      isValid = false;
    }

    const phoneNumbers = phone.replace(/\D/g, "");

    if (phone.trim() === "") {
      setPhoneError("El teléfono es obligatorio.");
      isValid = false;
    } else if (phoneNumbers.length < 8) {
      setPhoneError("El teléfono debe tener al menos 8 números.");
      isValid = false;
    }

    if (item.trim() === "") {
      setItemError("Debe ingresar el vehículo recibido.");
      isValid = false;
    }

    if (problem.trim() === "") {
      setProblemError("Debe ingresar el problema reportado.");
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    const generatedCode = "TC-004";

    Alert.alert(
      "Orden registrada",
      `La orden fue registrada correctamente.\nCódigo: ${generatedCode}`
    );

    setClientName("");
    setPhone("");
    setItem("");
    setProblem("");
  };

  return (
  <ScrollView
    style={styles.container}
    contentContainerStyle={styles.contentContainer}
  >
    <Text style={styles.title}>Nueva Orden</Text>

    <Text style={styles.subtitle}>
      Registre los datos principales de la reparación.
    </Text>

    <View style={styles.form}>
      <CustomInput
        type="text"
        placeholder="Nombre del cliente"
        value={clientName}
        onChange={setClientName}
        error={clientNameError}
      />

      <CustomInput
        type="number"
        placeholder="Teléfono"
        value={phone}
        onChange={setPhone}
        error={phoneError}
      />

      <CustomInput
        type="text"
        placeholder="Vehículo recibido"
        value={item}
        onChange={setItem}
        error={itemError}
      />

      <CustomInput
        type="text"
        placeholder="Problema reportado"
        value={problem}
        onChange={setProblem}
        error={problemError}
      />

      <View style={styles.buttonContainer}>
        <CustomButton
          title="Registrar orden"
          onPress={handleSave}
          variant="primary"
        />
      </View>
    </View>
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
    justifyContent: "center",
    alignItems: "center",
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
  form: {
    backgroundColor: "#fff",
    width: "100%",
    maxWidth: 420,
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
  },

  buttonContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
});