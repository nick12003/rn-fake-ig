import { Text, View, StyleSheet } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";

import {
  LogoTextIcon,
  NotifyIcon,
  DirectIcon,
  LogoutIcon,
  IconButton,
} from "@/components/Icon";

const Header = () => {
  return (
    <View style={styled.container}>
      <IconButton>
        <LogoTextIcon width={100} height={50} fill="#fff" />
      </IconButton>
      <View style={styled.iconContainer}>
        <IconButton
          onPress={async () => {
            signOut(auth);
          }}
        >
          <LogoutIcon style={styled.icon} />
        </IconButton>
        <IconButton>
          <NotifyIcon style={styled.icon} />
        </IconButton>
        <IconButton>
          <View style={styled.unreadBadge}>
            <Text style={styled.unreadBadgeText}>11</Text>
          </View>
          <DirectIcon style={styled.icon} />
        </IconButton>
      </View>
    </View>
  );
};

const styled = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: 20,
  },
  iconContainer: {
    flexDirection: "row",
  },
  icon: {
    color: "#fff",
    width: 30,
    height: 30,
    marginLeft: 10,
    resizeMode: "contain",
  },
  unreadBadge: {
    width: 20,
    height: 20,
    backgroundColor: "#FF3250",
    position: "absolute",
    right: -10,
    top: -10,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    padding: 2,
    zIndex: 100,
  },
  unreadBadgeText: {
    color: "#fff",
    fontWeight: "600",
  },
});

export default Header;
