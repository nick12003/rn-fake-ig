import { TouchableOpacity } from "react-native";
import LogoTextIcon from "@/assets/svg/LogoText.svg";
import LogoIcon from "@/assets/svg/Logo.svg";

import DirectIcon from "@/assets/svg/Direct.svg";
import HamburgerIcon from "@/assets/svg/Hamburger.svg";
import HomeIcon from "@/assets/svg/Home.svg";
import HomeActiveIcon from "@/assets/svg/HomeActive.svg";

import NotifyIcon from "@/assets/svg/Notify.svg";
import NotifyActiveIcon from "@/assets/svg/NotifyActive.svg";

import PostIcon from "@/assets/svg/Post.svg";
import PostActiveIcon from "@/assets/svg/PostActive.svg";

import ProfileIcon from "@/assets/svg/Profile.svg";
import ProfileActiveIcon from "@/assets/svg/ProfileActive.svg";

import SearchIcon from "@/assets/svg/Search.svg";
import SearchActiveIcon from "@/assets/svg/SearchActive.svg";

import ShortIcon from "@/assets/svg/Short.svg";
import ShortActiveIcon from "@/assets/svg/ShortActive.svg";

import CommentIcon from "@/assets/svg/Comment.svg";
import KeepIcon from "@/assets/svg/Keep.svg";
import DotsHorizontalIcon from "@/assets/svg/DotsHorizontal.svg";

import ArrowIcon from "@/assets/svg/Arrow.svg";

import LogoutIcon from "@/assets/svg/Logout.svg";

export {
  LogoTextIcon,
  LogoIcon,
  DirectIcon,
  HamburgerIcon,
  NotifyIcon,
  NotifyActiveIcon,
  PostIcon,
  PostActiveIcon,
  ProfileIcon,
  ProfileActiveIcon,
  SearchIcon,
  SearchActiveIcon,
  ShortIcon,
  ShortActiveIcon,
  CommentIcon,
  KeepIcon,
  DotsHorizontalIcon,
  HomeIcon,
  HomeActiveIcon,
  ArrowIcon,
  LogoutIcon,
};

export const IconButton = ({ children, style, ...rest }) => (
  <TouchableOpacity style={[{ color: "#fff" }, style]} {...rest}>
    {children}
  </TouchableOpacity>
);
