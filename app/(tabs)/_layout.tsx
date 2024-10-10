import { Tabs } from "expo-router";
import { AntDesign, FontAwesome, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import colors from "@/components/myApp/colors";

export default function TabsLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: "rgba(131, 130, 132, 0.4)",
          tabBarStyle: { paddingTop: 8, paddingBottom: 8, height: 64},
          tabBarLabelStyle:{fontFamily: 'roboto-medium', fontSize: 14}
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, focused }) => (
              <MaterialIcons name="pentagon" color={color} size={24} />
            ),
          }}
        />
        <Tabs.Screen
          name="transaction"
          options={{
            title: "Transaction",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name="pie-chart"
                size={24}
                color={color}
              />
            ),
          }}
        />
         <Tabs.Screen
          name="services"
          options={{
            title: "Services",
            tabBarIcon: ({ color, focused }) => (
              <AntDesign name="appstore1" color={color} size={24} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, focused }) => (
              <FontAwesome name="user" color={color} size={24} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
