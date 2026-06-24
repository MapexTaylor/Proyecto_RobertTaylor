import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./StackNavigation";
import HistorialScreen from "../screens/HistorialScreen";
import TallerHomeScreen from "../screens/TallerHomeScreen";
import OrdersScreen from "../screens/OrdersScreen";
import RegisterOrderScreen from "../screens/RegisterOrderScreen";
import TallerProfileScreen from "../screens/TallerProfileScreen";
import { useTheme } from "../contexts/ThemeContext";


type TabsParamList={
    Profile: undefined;
    Ordenes: undefined;
    Home: undefined;
    Historial: undefined;
    NuevaOrden: undefined;
    Taller:undefined;
}

type Props = NativeStackScreenProps<RootStackParamList,"UserTabs">;

const Tab = createBottomTabNavigator<TabsParamList>();

export default function TabsNavigation(){

    const { colors } = useTheme();

    return(
        <Tab.Navigator 
        screenOptions={{
            headerShown: false,
            tabBarStyle: {
            backgroundColor: colors.tabBar,
            borderTopColor: colors.border,
            },
            tabBarActiveTintColor: colors.tabActive,
            tabBarInactiveTintColor: colors.tabInactive,
        }}>
            
            <Tab.Screen
            name="Home"
            component={TallerHomeScreen}
            options={{
                title: "Inicio",
                tabBarIcon:({color, size}) => (
                    <Ionicons name="home" size={size} color={color}/>
                ),    
            }}
            />

            <Tab.Screen
            name="Ordenes"
            component={OrdersScreen}
            options={{
                title: "Ordenes",
                tabBarIcon:({color, size}) => (
                    <Ionicons name="document-text" size={size} color={color}/>
                ),
            }}
            />

            <Tab.Screen
            name="NuevaOrden"
            component={RegisterOrderScreen}
            options={{
                title: "Nueva",
                tabBarIcon:({color, size}) => (
                    <Ionicons name="add-circle" size={size} color={color}/>
                ),
            }}
            />    


            <Tab.Screen
            name = "Historial"
            component={HistorialScreen}
            options={{
                title: "Historial",
                tabBarIcon:({color, size}) => (
                    <Ionicons name="time" size = {size} color = {color}/>
                ),
            }}
            />

            <Tab.Screen
            name="Taller"
            component={TallerProfileScreen}
            options={{
                title: "Taller",
                tabBarIcon:({color, size}) => (
                    <Ionicons name="construct" size={size} color={color}/>
                ),
            }}
            />

            
        </Tab.Navigator>

    )
}