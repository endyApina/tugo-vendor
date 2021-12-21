import * as React from 'react'; 
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; 
import HomeScreen from './src/views/home/home';
import AddVendorForm from './src/views/vendorform/vendorform';
import { appRoutes } from './config';
import VendorList from './src/views/vendorlist/vendorlist';
import VendorDetail from './src/views/vendordetail/vendordetails';

const Stack = createStackNavigator();

const Routes = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={appRoutes.homeScreen}
            > 
                <Stack.Screen
                    component={HomeScreen}
                    name={appRoutes.homeScreen}
                    options={{
                        headerTitle: "Vendors", 
                        headerTitleAlign: "center"
                    }}
                />
                <Stack.Screen 
                    component={AddVendorForm}
                    name={appRoutes.addVendorScreen}
                    options={{
                        headerTitle: "Add Gas Station",
                        headerTitleAlign: "center"
                    }}
                />
                <Stack.Screen 
                    component={VendorList}
                    name={appRoutes.vendorList}
                    options={{
                        headerTitle: "Gas Stations",
                        headerTitleAlign: "center"
                    }}
                />
                <Stack.Screen
                    component={VendorDetail}
                    name={appRoutes.vendorDetails}
                    options={{
                        headerTitle: "",
                        // headerShown: false, 
                        // header: null,
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routes