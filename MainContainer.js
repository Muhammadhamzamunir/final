
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";

import Main from "./Screens/Home";
import Account from "./Screens/Account";
const homeName = "Home";
// const loginName = "Login";
// const signupName = "Signup";
const acountName = "Account";
// const cartName = "Cart";
// const mystoreName = "MyStore";
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainTabNavigator = () => {
 

  return (
    <Tab.Navigator
      initialRouteName={homeName}
      screenOptions={({ route }) => ({
        tabBarActiveTintColor:"black",
        tabBarInactiveTintColor: "grey",
        tabBarStyle: [{ padding: 10, height: 55 }],
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === homeName) {
            iconName = focused ? "home" : "home-outline";}
        //   } else if (rn === cartName) {
        //     iconName = focused ? "cart" : "cart-outline";
        //   } else if (rn === mystoreName) {
        //     iconName = focused ? "heart" : "heart-outline";
        //   }
           else if (rn === acountName) {
            iconName = focused ? "settings" : "settings-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name={homeName}
        component={Main}
        options={{ headerShown: false }}
      />
       <Tab.Screen
        name={acountName}
        component={Account}
        options={{ headerShown: false }}
      />
   

      {/* <Tab.Screen
        name={acountName}
        component={Account}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle: "Account",
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 15 }}
              onPress={() => {
                navigation.navigate("Settings");
              }}
            >
              <Ionicons name="settings" size={24} color="black" />
            </TouchableOpacity>
          ),
        })}
      /> */}
    </Tab.Navigator>
  );
};

function MainContainer() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={homeName}>
        <Stack.Screen
          name="Main"
          component={MainTabNavigator}
          options={{ title: "Home", headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainContainer;
