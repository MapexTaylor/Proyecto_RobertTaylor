import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigation';
import { navigationRef } from './src/navigation/NavigationService';

export default function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      <StackNavigator></StackNavigator>
    </NavigationContainer>
  );
}
