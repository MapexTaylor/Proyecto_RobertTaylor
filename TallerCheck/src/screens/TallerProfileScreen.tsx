import { View, Text, StyleSheet, Image, Switch } from "react-native";
import { navigationRef } from "../navigation/NavigationService";
import CustomButton from "../components/CustomButton";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import { Alert } from "react-native";
import { logoutFromSupabase } from "../services/authService";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TallerProfileScreen() {

  const { theme, colors, toggleTheme } = useTheme();

  const {logout} = useAuth();

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
        <Text style={[styles.value, { color: colors.subtitle }]}>Mecánico / Taller</Text>

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