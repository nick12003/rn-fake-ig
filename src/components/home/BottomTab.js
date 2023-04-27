import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Divider } from "react-native-elements";

import {
  HomeIcon,
  HomeActiveIcon,
  SearchIcon,
  SearchActiveIcon,
  PostIcon,
  PostActiveIcon,
  ShortIcon,
  ShortActiveIcon,
  ProfileIcon,
  ProfileActiveIcon,
  IconButton,
} from "@/components/Icon";

const tabs = [
  {
    name: "Home",
    Active: HomeActiveIcon,
    UnActivate: HomeIcon,
  },
  {
    name: "Search",
    Active: SearchActiveIcon,
    UnActivate: SearchIcon,
  },
  {
    name: "Post",
    Active: PostActiveIcon,
    UnActivate: PostIcon,
    redirect: "NewPostScreen",
  },
  {
    name: "Short",
    Active: ShortActiveIcon,
    UnActivate: ShortIcon,
  },
  {
    name: "Profile",
    Active: ProfileActiveIcon,
    UnActivate: ProfileIcon,
  },
];

const BottomTabs = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("Home");

  const handlePress = (name) => {
    setActiveTab(name);
  };

  return (
    <View style={styled.wrapper}>
      <Divider width={1} orientation="vertical" />
      <View style={styled.container}>
        {tabs.map(({ name, Active, UnActivate, redirect }, index) => (
          <IconButton
            key={index}
            onPress={() => {
              if (redirect) {
                navigation.push(redirect);
              } else {
                handlePress(name);
              }
            }}
          >
            {activeTab === name ? (
              <Active style={styled.icon} />
            ) : (
              <UnActivate style={styled.icon} />
            )}
          </IconButton>
        ))}
      </View>
    </View>
  );
};

const styled = StyleSheet.create({
  wrapper: {
    position: "absolute",
    width: "100%",
    bottom: 20,
    zIndex: 999,
    backgroundColor: "#000",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  icon: {
    color: "#fff",
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
});

export default BottomTabs;
