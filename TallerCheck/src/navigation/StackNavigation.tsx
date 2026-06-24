import { createNativeStackNavigator } from "@react-navigation/native-stack"
import LoginScreen from "../screens/LoginScreen";
import TabsNavigation from "./TabsNavigation";
import ClientSearchScreen from "../screens/ClientSearchScreen";
import TallerLoginScreen from "../screens/TallerLoginScreen";
import { useAuth } from "../contexts/AuthContext";
import RegisterMechanicScreen from "../screens/RegisterMechanicScreen";



export type RootStackParamList = {
    Login: undefined;
    UserTabs: undefined;
    ClientSearch: undefined;
    TallerLogin: undefined;
    RegisterMechanic: undefined;
}

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigator(){
    const {role} = useAuth();
    return(
        <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
            {role === null && (
                <>
                <Stack.Screen name="Login" component={LoginScreen}/>
                <Stack.Screen name="TallerLogin" component={TallerLoginScreen}/>
                <Stack.Screen name="RegisterMechanic" component={RegisterMechanicScreen}/>
                </>
            )}

            {role === 'taller' && (
                <Stack.Screen name="UserTabs" component={TabsNavigation}/>
            )}
            
            {role === 'cliente' && (
                <Stack.Screen name="ClientSearch" component={ClientSearchScreen}/>
            )}
        </Stack.Navigator>
    )
}

