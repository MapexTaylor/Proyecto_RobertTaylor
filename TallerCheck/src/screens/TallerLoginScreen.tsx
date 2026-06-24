import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from "../contexts/ThemeContext";
import { Alert } from "react-native";
import { loginWithEmail } from "../services/authService";
import { useAppDispatch } from "../redux/hooks";
import { setOrders } from "../redux/ordersSlice";
import { getOrdersFromSupabase } from "../services/ordersService";


export default function TallerLoginScreen({ navigation }: any) {

    const dispatch = useAppDispatch();

    const { colors } = useTheme();

    const {loginAsTaller} = useAuth();

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [errorEmail,setEmailError] = useState("")
    const [errorPass,setErrorPass] = useState("")

    const handleLogin = async () => {
      let isValid = true;

      setEmailError("");
      setErrorPass("");

      if (email.trim() === "") {
        setEmailError("El correo es obligatorio.");
        isValid = false;
      } else if (!email.includes("@")) {
        setEmailError("Ingrese un correo válido.");
        isValid = false;
      }

      if (password.trim() === "") {
        setErrorPass("La contraseña es obligatoria.");
        isValid = false;
      } else if (password.length < 6) {
        setErrorPass("La contraseña debe tener al menos 6 caracteres.");
        isValid = false;
      }

      if (!isValid) {
        return;
      }

      try {
        await loginWithEmail(email.trim(), password);

        const ordersFromSupabase = await getOrdersFromSupabase();
        dispatch(setOrders(ordersFromSupabase));

        loginAsTaller();
        
      } catch (error) {
        Alert.alert(
          "Error de inicio de sesión",
          "Correo o contraseña incorrectos."
        );

        console.log(error);
      }
    };

    return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={[styles.mainArea,{backgroundColor: colors.card,borderColor: colors.border,},]}>
        
        <Text style = {[styles.text, { color: colors.text }]}>Incia sesión</Text>
        <StatusBar style="auto" />

        <CustomInput 
        type="email"
        placeholder={'Ingresa tu correo de empleado'} 
        value={email} 
        onChange={setEmail}
        error={errorEmail}/>

        <CustomInput 
        type="password"
        placeholder={'Ingresa tu contraseña'} 
        value={password} 
        onChange={setPassword}
        error={errorPass}/>

        <CustomButton 
        title={'Ingresar'} 
        onPress={handleLogin}/>
        
      </View>
      <Image
        source={require("../../assets/M.png")}
        style={styles.image}
        />
    </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#868686',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainArea:{
    backgroundColor:'#eaeaea',
    alignItems: 'center',
    borderColor:'black',
    borderWidth:2,
    padding: 40,
    paddingBottom:50,
    borderRadius:20,
    marginTop:150
  },
  text:{
    paddingBottom:20,
    fontWeight:'bold',
    fontSize:30
  },
  image:{
    width: 200,
    height: 200,
    resizeMode:"contain",
    paddingTop:20
  }
});