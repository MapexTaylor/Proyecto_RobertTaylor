import { TouchableOpacity, Text, StyleSheet } from "react-native";


type CustomButtonProps = {
    title: string;
    onPress: () => void;
    variant?: "primary" | "secondary" | "tertiary";
}

export default function CustomButton({title, onPress, variant="primary"}: CustomButtonProps){
    const styles = getStyles(variant)
    return(
        <TouchableOpacity onPress={onPress} style ={styles.button}>
            <Text style = {styles.text}>{title}</Text>
        </TouchableOpacity>
    )
}

const getStyles = (variant: "primary" | "secondary" | "tertiary") =>
    StyleSheet.create({
    button: {
        backgroundColor: variant === "primary" ? '#1150af':
                            variant === "secondary" ? '#6baea9' : '#fbfbfb',
        padding: 14,
        borderRadius: 10,
        width: variant === "primary" ? 220:
                            variant === "secondary" ? 210 : 150,
        alignItems: "center",
        margin: 20,
    },
    text:{
        fontWeight:'bold',
        fontSize:15,
        color:variant === "primary" ? '#ffffff':
                            variant === "secondary" ? '#000000' : '#000000',
        textShadowColor: variant === "primary" ? '#000000':
                            variant === "secondary" ? '#737373' : '#fbfbfb',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 2,
    }
})