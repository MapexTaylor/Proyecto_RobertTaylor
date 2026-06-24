import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigation';
import { navigationRef } from './src/navigation/NavigationService';
import { AuthProvider } from './src/contexts/AuthContext';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { ThemeProvider } from "./src/contexts/ThemeContext";

export default function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <ThemeProvider>
          <NavigationContainer ref={navigationRef}>
            <StackNavigator></StackNavigator>
          </NavigationContainer>
        </ThemeProvider>
      </AuthProvider>
    </Provider>
    
  );
}
