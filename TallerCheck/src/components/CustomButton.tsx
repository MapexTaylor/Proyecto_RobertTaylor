import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useTheme } from "../contexts/ThemeContext";

type CustomButtonProps = {
    title: string;
    onPress: () => void;
    variant?: "primary" | "secondary" | "tertiary";
}

export default function CustomButton({title, onPress, variant="primary"}: CustomButtonProps){

    const { colors } = useTheme();
    const styles = getStyles(variant, colors);

    return(
        <TouchableOpacity onPress={onPress} style ={styles.button}>
            <Text style = {styles.text}>{title}</Text>
        </TouchableOpacity>
    )
}

const getStyles = (variant: "primary" | "secondary" | "tertiary", colors:any) =>
    StyleSheet.create({
    button: {
        backgroundColor: variant === "primary" ? colors.primary:
                            variant === "secondary" ? colors.secondary : colors.card,
        padding: 14,
        borderRadius: 10,
        width: variant === "primary" ? 220:
                            variant === "secondary" ? 210 : 150,
        alignItems: "center",
        margin: 20,
        borderWidth: variant === "tertiary" ? 1 : 0,
        borderColor: colors.border,
    },
    text:{
        fontWeight:'bold',
        fontSize:15,
        color:variant === "primary" ? colors.primaryText:
                            variant === "secondary" ? colors.secondaryText : colors.text,
        textShadowColor: variant === "primary" ? '#000000':
                            variant === "secondary" ? '#737373' : '#fbfbfb',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 2,
    }
})