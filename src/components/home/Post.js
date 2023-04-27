import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Divider } from "react-native-elements";
import {
  DotsHorizontalIcon,
  NotifyIcon,
  NotifyActiveIcon,
  CommentIcon,
  DirectIcon,
  KeepIcon,
  IconButton,
} from "@/components/Icon";

import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

import { auth, db } from "@/firebase";

const Post = ({ post }) => {
  const handleLike = (post) => {
    const user = auth.currentUser;
    const likeStatus = !post.likes_by_users.includes(user.email);

    updateDoc(doc(db, `users/${post.owner_email}/posts/${post.postId}`), {
      likes_by_users: likeStatus
        ? arrayUnion(user.email)
        : arrayRemove(user.email),
    }).catch((err) => {
      console.error(err);
    });
  };

  return (
    <View style={{ marginBottom: 30 }}>
      <Divider width={1} orientation="vertical" />
      <PostHeader post={post} />
      <PostImage post={post} />
      <View style={{ marginHorizontal: 15, marginTop: 10 }}>
        <PostFooter post={post} handleLike={handleLike} />
        <Like post={post} />
        <Caption post={post} />
        <CommentSection post={post} />
        <Comments post={post} />
      </View>
    </View>
  );
};

const PostHeader = ({ post }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        margin: 5,
      }}
    >
      <View style={styled.story}>
        <Image source={{ uri: post.profileImage }} style={styled.storyImage} />
        <Text style={{ color: "#fff" }}>{post.user}</Text>
      </View>
      <DotsHorizontalIcon width={30} height={30} style={{ color: "#fff" }} />
    </View>
  );
};

const PostImage = ({ post }) => (
  <View
    style={{
      width: "100%",
      height: 450,
    }}
  >
    <Image
      source={{ uri: post.imgUrl }}
      style={{ height: "100%", resizeMode: "cover" }}
    />
  </View>
);

const PostFooter = ({ post, handleLike }) => {
  const user = auth.currentUser;
  const likeStatus = post.likes_by_users.includes(user.email);

  return (
    <View style={{ flexDirection: "row" }}>
      <View style={styled.leftFooterIconsContainers}>
        <IconButton onPress={() => handleLike(post)}>
          {likeStatus ? (
            <NotifyActiveIcon style={[styled.icon, { color: "red" }]} />
          ) : (
            <NotifyIcon style={styled.icon} />
          )}
        </IconButton>
        <IconButton>
          <CommentIcon style={styled.icon} />
        </IconButton>
        <IconButton>
          <DirectIcon style={styled.icon} />
        </IconButton>
      </View>
      <View style={{ flex: 1, alignItems: "flex-end" }}>
        <IconButton>
          <KeepIcon style={[styled.icon, { marginRight: 0 }]} />
        </IconButton>
      </View>
    </View>
  );
};

const Like = ({ post }) => (
  <View style={{ flexDirection: "row", marginTop: 4 }}>
    <Text style={{ color: "#fff" }}>
      {post.likes_by_users.length.toLocaleString("en")} likes
    </Text>
  </View>
);

const Caption = ({ post }) => (
  <View style={{ marginTop: 5 }}>
    <Text style={{ color: "#fff" }}>
      <Text style={{ fontWeight: "600" }}>{post.user}</Text>
      <Text> {post.caption}</Text>
    </Text>
  </View>
);

const CommentSection = ({ post }) => {
  return (
    <View style={{ marginTop: 5 }}>
      {!!post.comments.length && (
        <Text style={{ color: "#999" }}>
          View
          {post.comments.length > 1
            ? `all ${post.comments.length} comments`
            : "comment"}
        </Text>
      )}
    </View>
  );
};

const Comments = ({ post }) => (
  <>
    {post.comments.map((comment, index) => (
      <View key={index} style={{ marginTop: 5 }}>
        <Text style={{ color: "#fff" }}>
          <Text style={{ fontWeight: "600" }}>{comment.user}</Text>
          <Text> {comment.comment}</Text>
        </Text>
      </View>
    ))}
  </>
);

const styled = StyleSheet.create({
  story: {
    width: 70,
    marginLeft: 6,
    flexDirection: "row",
    alignItems: "center",
  },
  storyImage: {
    width: 35,
    height: 35,
    borderRadius: 50,
    borderWidth: 1.6,
    borderColor: "#ff8501",
    marginRight: 5,
  },
  leftFooterIconsContainers: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "35%",
  },
  icon: {
    color: "#fff",
    width: 30,
    height: 30,
    resizeMode: "contain",
    marginRight: 10,
  },
});

export default Post;
