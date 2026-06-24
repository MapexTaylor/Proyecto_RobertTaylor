import { useState } from "react";
import { ScrollView, View, Text, StyleSheet, Alert } from "react-native";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { useAppDispatch} from "../redux/hooks";
import { addOrder, Order } from "../redux/ordersSlice";
import { useTheme } from "../contexts/ThemeContext";
import { saveOrderToSupabase } from "../services/ordersService";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RegisterOrderScreen() {

  const { colors } = useTheme();

  const dispatch = useAppDispatch();

  const [clientName, setClientName] = useState("");
  const [phone, setPhone] = useState("");
  const [marca, setmarca] = useState("");
  const [matricula, setMatricula] = useState("");
  const [problem, setProblem] = useState("");

  const [clientNameError, setClientNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [marcaError, setmarcaError] = useState("");
  const [matriculaError, setMatriculaError] = useState("");
  const [problemError, setProblemError] = useState("");

  const generateUniqueCode = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "TC-";

  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters[randomIndex];
  }

  return code;
};

  const handleSave = async () => {
    let isValid = true;

    setClientNameError("");
    setPhoneError("");
    setmarcaError("");
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

    if (marca.trim() === "") {
      setmarcaError("Debe ingresar el vehículo recibido.");
      isValid = false;
    }

    const regex = /\d{4}$/;

    if(!matricula.startsWith('HN')){
      setMatriculaError("Matricula invalida. Debe de comenzar con 'HN'")
      isValid = false;
    }else {
      if(matricula.length!==7){
        setMatriculaError("Matricula invalida. Debe de contener 7 caracteres");
        isValid = false;
      }else{
        if(!regex.test(matricula)){
          setMatriculaError("Matricula invalida. Debe de terminar con 4 numeros");
          isValid = false;
        }
      }
    }

    if (problem.trim() === "") {
      setProblemError("Debe ingresar el problema reportado.");
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    const generatedCode = generateUniqueCode();

    const newOrder: Order = {
      id: Date.now().toString(),
      code: generatedCode,
      clientName,
      phone,
      marca,
      matricula,
      problem,
      entryDate: new Date().toLocaleDateString(),
      status: "Recibido",
    };

    try {
    await saveOrderToSupabase(newOrder);

    dispatch(addOrder(newOrder));

    Alert.alert(
      "Orden registrada",
      `La orden fue registrada correctamente.\nCódigo: ${generatedCode}`
    );

    setClientName("");
    setPhone("");
    setmarca("");
    setMatricula("");
    setProblem("");

    setClientNameError("");
    setPhoneError("");
    setmarcaError("");
    setMatriculaError("");
    setProblemError("");
    } catch (error) {
      Alert.alert(
        "Error",
        "La orden se guardó en la app, pero no se pudo guardar en Supabase."
      );

    console.log(error);
    }
    };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={[styles.title, { color: colors.text }]}>Nueva Orden 📝</Text>

      <Text style={[styles.subtitle, { color: colors.subtitle }]}>
        Registre los datos principales de la reparación.
      </Text>

      <View style={[styles.form,{backgroundColor: colors.card,borderColor: colors.border,},]}>
        <View style={styles.input}>
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
          value={marca}
          onChange={setmarca}
          error={marcaError}
        />

        <CustomInput
          type="text"
          placeholder="Matricula de su vehiculo"
          value={matricula.toUpperCase()}
          onChange={(text) => setMatricula(text.toUpperCase())}
          error={matriculaError}
        />

        <CustomInput
          type="text"
          placeholder="Problema reportado"
          value={problem}
          onChange={setProblem}
          error={problemError}
        />
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton
            title="Registrar orden"
            onPress={handleSave}
            variant="primary"
          />
        </View>
      </View>
    </ScrollView>
  </SafeAreaView>
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
  input: {
    width: "100%",
    alignItems: "center",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
});