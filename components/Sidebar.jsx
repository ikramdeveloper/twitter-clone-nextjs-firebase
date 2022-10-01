import Image from "next/image";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";

import { SidebarLink } from "../components";
import TwitterIcon from "../assets/twitter-icon.jpg";
import { links } from "../utils";

const Sidebar = () => {
  return (
    <aside className="hidden sm:flex flex-col items-center xl:items-start xl:w-80 p-2 fixed h-full">
      <figure className="flex items-center justify-center w-14 h-14 p-0 xl:ml-24 hover-animation">
        <Image src={TwitterIcon} width={30} height={30} />
      </figure>

      <article className="space-y-2 mt-4 mb-2.5 xl:ml-24">
        {links.map((link) => (
          <SidebarLink
            key={link.text}
            text={link.text}
            Icon={link.icon}
            active={link.active}
          />
        ))}
      </article>

      <button className="hidden xl:inline ml-auto bg-[#1d9df0] text-white rounded-full w-56 h-12 text-lg font-bold shadow-md hover:bg-[#1a8cd8]">
        Tweet
      </button>

      <figure className="text-gray-200 flex items-center justify-center hover-animation xl:ml-auto mt-auto">
        <img
          src="https://yt3.ggpht.com/yti/AJo0G0n-X5tRn9gt9sAgZ9iIU1yly6GrEA5DXgTfEJSsqA=s88-c-k-c0x00ffffff-no-rj-mo"
          alt="user"
          className="h-10 w-10 rounded-full xl:mr-2.5"
        />
        <div className="hidden xl:inline leading-5">
          <h4 className="font-bold">firebase</h4>
          <p className="text-[#6e767d]">@firebase</p>
        </div>

        <EllipsisHorizontalIcon className="h-5 hidden xl:inline ml-10" />
      </figure>
    </aside>
  );
};
export default Sidebar;
