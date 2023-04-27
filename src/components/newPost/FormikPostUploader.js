import { useState, useEffect } from "react";
import { View, Text, TextInput, Image, StyleSheet, Button } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { Divider } from "react-native-elements";
import validUrl from "valid-url";

import {
  collection,
  doc,
  getDoc,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "@/firebase";

const PLACEHOLDER_IMG =
  "https://www.peerager.com.tw/wp-content/uploads/woocommerce-placeholder.png";

const uploadPostSchema = Yup.object().shape({
  imgUrl: Yup.string().url().required("a url is require"),
  caption: Yup.string().max(2200, "Caption has reached the character"),
});

const FormikPostUploader = ({ navigation }) => {
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [currentUserInfo, setCurrentUserInfo] = useState({});

  const getUserName = () => {
    const user = auth.currentUser;
    getDoc(doc(db, "users", user.email)).then((r) => {
      const data = r.data();
      setCurrentUserInfo({
        username: data.username,
        profileImage: data.profile_picture,
      });
    });
  };

  useEffect(() => {
    getUserName();
  }, []);

  const onPost = async (imgUrl, caption) => {
    const user = auth.currentUser;
    addDoc(collection(db, `users/${user.email}/posts`), {
      imgUrl,
      user: currentUserInfo.username,
      profileImage: currentUserInfo.profileImage,
      owner_uid: user.uid,
      owner_email: user.email,
      caption,
      captionAt: serverTimestamp(),
      likes_by_users: [],
      comments: [],
    }).then(() => {
      navigation.goBack();
    });
  };

  return (
    <Formik
      initialValues={{
        caption: "",
        imgUrl: "",
      }}
      onSubmit={(values) => {
        onPost(values.imgUrl, values.caption);
      }}
      validationSchema={uploadPostSchema}
      validateOnMount={true}
    >
      {({
        handleBlur,
        handleChange,
        handleSubmit,
        values,
        errors,
        touched,
        isValid,
      }) => {
        return (
          <>
            <View
              style={{
                margin: 20,
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <Image
                source={{ uri: thumbnailUrl || PLACEHOLDER_IMG }}
                style={{ width: 100, height: 100 }}
              />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <TextInput
                  style={{ color: "#fff", fontSize: 20 }}
                  placeholder="Write a caption"
                  placeholderTextColor="gray"
                  multiline
                  onChangeText={handleChange("caption")}
                  onBlur={handleBlur("caption")}
                  value={values.caption}
                />
              </View>
            </View>
            <Divider width={0.2} orientation="vertical" />
            <View>
              <TextInput
                onChange={(e) => {
                  if (validUrl.isUri(e.nativeEvent.text)) {
                    setThumbnailUrl(e.nativeEvent.text);
                  }
                }}
                style={{ color: "#fff", fontSize: 18 }}
                placeholder="Enter image url"
                placeholderTextColor="gray"
                onChangeText={handleChange("imgUrl")}
                onBlur={handleBlur("imgUrl")}
                value={values.imgUrl}
              />
              {errors.imgUrl && touched.imgUrl && (
                <Text style={{ color: "red", fontSize: 10 }}>
                  {errors.imgUrl}
                </Text>
              )}
            </View>
            <Button onPress={handleSubmit} title="Share" disabled={!isValid} />
          </>
        );
      }}
    </Formik>
  );
};

const styled = StyleSheet.create({});

export default FormikPostUploader;
