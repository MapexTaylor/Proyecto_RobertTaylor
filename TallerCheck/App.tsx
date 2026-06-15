import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigation';
import { navigationRef } from './src/navigation/NavigationService';
import { AuthProvider } from './src/contexts/AuthContext';
import { OrdersProvider } from './src/contexts/OrdersContext';

export default function App() {
  return (
    <AuthProvider>
      <OrdersProvider>
        <NavigationContainer ref={navigationRef}>
          <StackNavigator></StackNavigator>
        </NavigationContainer>
      </OrdersProvider>
    </AuthProvider>
  );
}
