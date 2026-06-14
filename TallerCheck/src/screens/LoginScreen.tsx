import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import CustomButton from '../components/CustomButton';
import { useAuth } from '../contexts/AuthContext';

export default function LoginScreen({navigation}:any){

    const {loginAsCliente} = useAuth();

    const handleLoginTaller = () => {
        navigation.navigate("TallerLogin");
    }

    const handleLoginClient = () => {
      loginAsCliente();
    }

    return (
    <View style={styles.container}>
        <View style={styles.mainArea}>
        
        <Text style = {styles.text}>TallerCheck</Text>
        <StatusBar style="auto" />

    
        <CustomButton 
        title={'Ingresar como Taller'} 
        onPress={handleLoginTaller}
        variant='primary'/>

        <CustomButton 
        title={'Consultar como cliente'} 
        onPress={handleLoginClient}
        variant='primary'/>
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