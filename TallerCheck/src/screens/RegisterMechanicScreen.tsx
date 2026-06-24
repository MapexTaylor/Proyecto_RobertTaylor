import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { useTheme } from "../contexts/ThemeContext";
import { registerWithEmail } from "../services/authService";

export default function RegisterMechanicScreen({ navigation }: any) {
  const { colors } = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleRegister = async () => {
    let isValid = true;

    setEmailError("");
    setPasswordError("");

    if (email.trim() === "") {
      setEmailError("El correo es obligatorio.");
      isValid = false;
    } else if (!email.includes("@")) {
      setEmailError("Ingrese un correo válido.");
      isValid = false;
    }

    if (password.trim() === "") {
      setPasswordError("La contraseña es obligatoria.");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("La contraseña debe tener al menos 6 caracteres.");
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    try {
      await registerWithEmail(email.trim(), password);

      Alert.alert(
        "Cuenta creada",
        "El usuario de taller fue creado correctamente. Ahora puede iniciar sesión.",
        [
          {
            text: "Aceptar",
            onPress: () => navigation.goBack(),
          },
        ]
      );

      setEmail("");
      setPassword("");
    } catch (error) {
      Alert.alert(
        "Error",
        "No se pudo crear la cuenta. Verifique el correo o intente con otro."
      );

      console.log(error);
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View
        style={[
          styles.card,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
          },
        ]}
      >
        <Text style={[styles.title, { color: colors.text }]}>
          Crear cuenta de taller
        </Text>

        <Text style={[styles.subtitle, { color: colors.subtitle }]}>
          Ingrese el correo y contraseña para registrar un nuevo usuario.
        </Text>

        <CustomInput
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={setEmail}
          error={emailError}
        />

        <CustomInput
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={setPassword}
          error={passwordError}
        />

        <CustomButton
          title="Crear cuenta"
          onPress={handleRegister}
          variant="primary"
        />

        <CustomButton
          title="Volver"
          onPress={() => navigation.goBack()}
          variant="secondary"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  card: {
    width: "100%",
    maxWidth: 420,
    alignSelf: "center",
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
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
  },
});