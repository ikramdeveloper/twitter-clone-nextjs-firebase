import { HomeIcon } from "@heroicons/react/24/solid";
import {
  HashtagIcon,
  BellIcon,
  InboxIcon,
  BookmarkIcon,
  ClipboardIcon,
  UserIcon,
  EllipsisHorizontalCircleIcon,
} from "@heroicons/react/24/outline";

export const links = [
  {
    text: "Home",
    icon: HomeIcon,
    active: true,
  },
  {
    text: "Explore",
    icon: HashtagIcon,
  },
  {
    text: "Notifications",
    icon: BellIcon,
  },
  {
    text: "Messages",
    icon: InboxIcon,
  },
  {
    text: "Bookmarks",
    icon: BookmarkIcon,
  },
  {
    text: "Lists",
    icon: ClipboardIcon,
  },
  {
    text: "Profile",
    icon: UserIcon,
  },
  {
    text: "More",
    icon: EllipsisHorizontalCircleIcon,
  },
];
