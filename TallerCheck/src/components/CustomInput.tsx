import { useState } from "react";
import {View, TextInput,TouchableOpacity,StyleSheet, KeyboardTypeOptions,Text} from "react-native";
import { AntDesign, Ionicons} from "@expo/vector-icons";

type Props = {
  type?: "text" | "email" | "number" | "password";
  placeholder: string;
  value: string;
  onChange: (text: string) => void;
  error?:string;
};

export default function CustomInput({type = "text",placeholder,value,onChange,error}: Props) {
  const isPasswordField = type === "password";
  const [isSecureText, setIsSecureText] = useState(type === "password");

  const keyboardType: KeyboardTypeOptions =
        type === "email" ? 'email-address' :
            type === "number" ? 'number-pad' :
                'default';

  const icon : typeof AntDesign["name"] | undefined =
        type === "email" ? 'user' :
            type === "password" ? 'lock' : undefined;

  return (
    <View style={styles.wrapper}>
        <View style = {styles.container}>
            {icon && (<AntDesign name={icon as any} size ={22} color={'black'} style={styles.icons}/>)}  
        <TextInput
            placeholder={placeholder}
            value={value}
            onChangeText={onChange}
            style={styles.input}
            secureTextEntry={isSecureText}
            keyboardType={keyboardType} 
        />

        {isPasswordField && (
            <TouchableOpacity onPress={() => setIsSecureText(!isSecureText)}>
            <Ionicons
                name={isSecureText ? "eye" : "eye-off"}
                size={30}
                color="black"
                style={styles.icons}
            />
            </TouchableOpacity>
        )}
        </View>
        {error && <Text style = {styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
   marginBottom: 10,
  },
  container:{
    width: 300,
    alignContent:'center',
    marginTop:10,
    flexDirection:'row',
  },
  input: {
    borderWidth:1,
    borderColor:'black',
    width:250,
    padding:10,
    backgroundColor: 'white',
    borderRadius: 10
  },

  icons:{
    padding:5,
    marginTop:5,
  },

  error:{
    textAlign:'left',
    color:'red',
    paddingLeft:35
  }
});