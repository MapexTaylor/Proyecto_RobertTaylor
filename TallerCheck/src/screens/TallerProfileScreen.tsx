import { View, Text, StyleSheet, Image } from "react-native";
import { navigationRef } from "../navigation/NavigationService";
import CustomButton from "../components/CustomButton";
import { useAuth } from "../contexts/AuthContext";

export default function TallerProfileScreen() {

  const {logout} = useAuth();

  const handleLogout = () =>{
        logout();
    }
  
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/Mec_Icon.png")}
        style={styles.image}
      />

      <Text style={styles.title}>Perfil del Taller</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Nombre del taller:</Text>
        <Text style={styles.value}>TallerCheck Servicio Técnico</Text>

        <Text style={styles.label}>Encargado:</Text>
        <Text style={styles.value}>Robert Taylor</Text>

        <Text style={styles.label}>Correo:</Text>
        <Text style={styles.value}>robert.taylor@tallercheck.com</Text>

        <Text style={styles.label}>Teléfono:</Text>
        <Text style={styles.value}>9999-9999</Text>

        <Text style={styles.label}>Horario:</Text>
        <Text style={styles.value}>Lunes a sábado, 8:00 a.m. - 5:00 p.m.</Text>
      </View>

      <CustomButton 
      title={"Cerrar Sesión"} 
      onPress={handleLogout}/>
    </View>
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
});