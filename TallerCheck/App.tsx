import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigation';
import { navigationRef } from './src/navigation/NavigationService';
import { AuthProvider } from './src/contexts/AuthContext';
import { OrdersProvider } from './src/contexts/OrdersContext';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <OrdersProvider>
          <NavigationContainer ref={navigationRef}>
            <StackNavigator></StackNavigator>
          </NavigationContainer>
        </OrdersProvider>
      </AuthProvider>
    </Provider>
    
  );
}
