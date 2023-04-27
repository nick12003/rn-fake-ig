import { useEffect, useState } from "react";

import { SafeAreaView, StyleSheet, ScrollView } from "react-native";
import Header from "@/components/home/Header";
import Stories from "@/components/home/Stories";
import Post from "@/components/home/Post";
import BottomTabs from "@/components/home/BottomTab";

import {
  onSnapshot,
  collectionGroup,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "@/firebase";

export default function HomeScreen({ navigation }) {
  const [posts, setPost] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collectionGroup(db, "posts"), (snapshot) => {
      setPost(snapshot.docs.map((doc) => ({ ...doc.data(), postId: doc.id })));
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <SafeAreaView style={styled.container}>
      <Header />
      <Stories />
      <ScrollView style={{ marginBottom: 20 }}>
        {posts.map((post, index) => {
          return <Post post={post} key={index} />;
        })}
      </ScrollView>
      <BottomTabs navigation={navigation} />
    </SafeAreaView>
  );
}

const styled = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
  },
});
