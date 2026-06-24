import { View, Text, StyleSheet, Image, Switch, Alert } from "react-native";
import CustomButton from "../components/CustomButton";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import { logoutFromSupabase } from "../services/authService";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function TallerProfileScreen() {
  const [userEmail, setUserEmail] = useState("");
  const { theme, colors, toggleTheme } = useTheme();

  const {logout} = useAuth();

  useEffect(() => {
  const getUserEmail = async () => {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      console.log("Error obteniendo usuario:", error);
      return;
    }

    if (user?.email) {
      setUserEmail(user.email);
    }
  };

  getUserEmail();
}, []);

  const handleLogout = async () => {
    try {
      await logoutFromSupabase();
      logout();
    } catch (error) {
      Alert.alert("Error", "No se pudo cerrar sesión correctamente.");
      console.log(error);
    }
  };
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Image
        source={require("../../assets/Mec_Icon.png")}
        style={styles.image}
      />

      <Text style={[styles.title, { color: colors.text }]}>Perfil del Taller</Text>

      <View style={[styles.card,{backgroundColor: colors.card,borderColor: colors.border,},]}>
        <Text style={[[styles.label, { color: colors.text }], { color: colors.text }]}>Nombre del taller:</Text>
        <Text style={[[styles.value, { color: colors.subtitle }], { color: colors.subtitle }]}>TallerCheck Servicio Técnico</Text>

        <Text style={[styles.label, { color: colors.text }]}>Usuario:</Text>
        <Text style={[styles.value, { color: colors.subtitle }]}>{userEmail || "Correo no disponible"}</Text>

        <View style={styles.themeRow}>
          <Text style={[styles.label, { color: colors.text }]}>
            Modo oscuro
          </Text>

          <Switch
            value={theme === "dark"}
            onValueChange={toggleTheme}
            trackColor={{
              false: "#ccc",
              true: colors.primary,
            }}
            thumbColor={theme === "dark" ? colors.card : "#f4f3f4"}
          />
        </View>
      </View>

      <CustomButton 
      title={"Cerrar Sesión"} 
      onPress={handleLogout}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eaeaea",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  image: {
    width: 130,
    height: 130,
    resizeMode: "contain",
    marginBottom: 15,
  },
  title: {
    fontSize: 27,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    width: "100%",
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  label: {
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 10,
  },
  value: {
    fontSize: 15,
    color: "#333",
  },
  note: {
    marginTop: 15,
    fontSize: 13,
    textAlign: "center",
    color: "#555",
  },
  themeRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: 20,
  paddingTop: 15,
  borderTopWidth: 1,
  borderTopColor: "#ddd",
},
});