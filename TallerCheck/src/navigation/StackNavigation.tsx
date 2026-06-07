import { createNativeStackNavigator } from "@react-navigation/native-stack"
import LoginScreen from "../screens/LoginScreen";
import TabsNavigation from "./TabsNavigation";
import ClientSearchScreen from "../screens/ClientSearchScreen";
import TallerLoginScreen from "../screens/TallerLoginScreen";
import TallerHomeScreen from "../screens/TallerHomeScreen";



export type RootStackParamList = {
    Login: undefined;
    UserTabs: undefined;
    ClientSearch: undefined;
    TallerLogin: undefined;
}

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigator(){
    return(
        <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
            <Stack.Screen name="Login" component={LoginScreen}/>
            <Stack.Screen name="UserTabs" component={TabsNavigation}/>
            <Stack.Screen name="ClientSearch" component={ClientSearchScreen}/>
            <Stack.Screen name="TallerLogin" component={TallerLoginScreen}/>
        </Stack.Navigator>
    )
}

