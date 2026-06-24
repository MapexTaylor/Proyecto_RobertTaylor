import { useState } from "react";
import {View, TextInput,TouchableOpacity,StyleSheet, KeyboardTypeOptions,Text, StyleProp, TextStyle} from "react-native";
import { AntDesign, Ionicons} from "@expo/vector-icons";
import { useTheme } from "../contexts/ThemeContext";

type Props = {
  type?: "text" | "email" | "number" | "password";
  placeholder: string;
  value: string;
  onChange: (text: string) => void;
  error?:string;
  errorStyle?: StyleProp<TextStyle>;
};

export default function CustomInput({type = "text",placeholder,value,onChange,error, errorStyle}: Props) {

  const { colors } = useTheme();

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
          <View style={styles.leftIconContainer}>
            {icon && (
              <AntDesign
                name={icon as any}
                size={22}
                color={colors.text}
                style={styles.icons}
              />
            )}
          </View>
        <TextInput
            placeholder={placeholder}
            placeholderTextColor={colors.subtitle}
            value={value}
            onChangeText={onChange}
            style={[styles.input,{backgroundColor: colors.inputBackground,color: colors.text,borderColor: colors.border,},]}
            secureTextEntry={isSecureText}
            keyboardType={keyboardType} 
        />

        <View style={styles.rightIconContainer}>
          {isPasswordField && (
            <TouchableOpacity onPress={() => setIsSecureText(!isSecureText)}>
              <Ionicons
                name={isSecureText ? "eye" : "eye-off"}
                size={30}
                color={colors.text}
                style={styles.icons}
              />
            </TouchableOpacity>
          )}
        </View>
        </View>
        <Text style={[styles.error, errorStyle]}>
          {error ? error : " "}
        </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: 300,
    marginBottom: 6,
  },

  container: {
    width: "100%",
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  input: {
    borderWidth: 1,
    borderColor: "black",
    flex: 1,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
  },

  icons: {
    width: 35,
    textAlign: "center",
  },

  error: {
    color: "red",
    fontSize: 13,
    marginTop: 4,
    marginLeft: 35,
    minHeight: 18,
  },

  rightIconContainer: {
  width: 40,
  alignItems: "center",
  justifyContent: "center",
  },
  leftIconContainer: {
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});