import { Text, View, Image, ScrollView, StyleSheet } from "react-native";

import USERS from "@/data/users";

const Stories = () => {
  return (
    <View style={{ marginBottom: 13 }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {USERS.map(({ name, image }, index) => {
          return (
            <View key={`${name}-${index}`} style={styled.story}>
              <Image source={{ url: image }} style={styled.storyImage} />
              <Text
                style={{ color: "#fff" }}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {name}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styled = StyleSheet.create({
  story: {
    width: 70,
    marginLeft: 7,
    alignItems: "center",
  },
  storyImage: {
    width: 70,
    height: 70,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#ff8501",
  },
});

export default Stories;
