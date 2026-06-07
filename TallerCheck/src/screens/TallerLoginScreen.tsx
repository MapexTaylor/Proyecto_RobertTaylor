import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import { useState } from 'react';


export default function TallerLoginScreen({ navigation }: any) {

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [errorEmail,setEmailError] = useState("")
    const [errorPass,setErrorPass] = useState("")

    const handleLogin = () => {
      let isValid = true;

      setEmailError("");
      setErrorPass("");

      if(email.trim() === ""){
        setEmailError("El correo es obligatorio.");
        isValid=false;
      } else if(!email.endsWith("@taller.com")){
        setEmailError("El correo es invalido.");
        isValid=false;
      }

      if(password.trim() === ""){
        setErrorPass("La contraseña es obligatoria");
        isValid = false;
      } else if(password.length < 4){
        setErrorPass("La contraseña es muy debil");
        isValid = false;
      }

      if(!isValid){
        return;
      }

      navigation.reset({
      index: 0,
      routes: [{ name: "UserTabs" }],
      });
    }

    return (
    <View style={styles.container}>
        <View style={styles.mainArea}>
        
        <Text style = {styles.text}>Incia sesión</Text>
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