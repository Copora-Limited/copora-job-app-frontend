import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { FiLogOut } from "react-icons/fi";
import { useSession } from "next-auth/react";

export default function UserAvatar() {
  const { data: session } = useSession();
  const router = useRouter();
  const email = session?.user?.email;
  const firstName = session?.user?.firstName;
  const lastName = session?.user?.lastName;

  //   const [isOpen, setIsOpen] = useState(false);

  //   const handleOpen = () => {
  //     setIsOpen(true);
  //   };

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/auth/login");
  };

  const initials = `${firstName && firstName?.charAt(0)}${
    lastName && lastName?.charAt(0)
  }`;

  return (
    <div className="w-full h-[40px] grid md:grid-cols-[40px_1fr_30px] grid-cols-[30px_1fr_20px] items-center gap-3">
      <div className="w-[30px] md:w-[40px] h-[30px] md:h-[40px] rounded-full bg-[#FFECE5] grid place-content-center text-[14px] md:text-[16px] text-primary relative uppercase">
        {initials}
        <span className="absolute bottom-0 right-0 w-[13px] h-[13px] bg-[#04802E] border border-white rounded-full" />
      </div>
      <div>
        <p className="text-[12px] md:text-[14px] text-white">
          {firstName} {lastName}
        </p>
        <p className="text-[12px] md:text-[14px] text-white">{email}</p>
      </div>
      <FiLogOut
        onClick={handleLogout}
        className="cursor-pointer text-[17px] md:text-[20px] text-white flex item-center justify-self-end"
      />

      {/* <SignOutModal isModalOpen={isOpen} setIsModalOpen={setIsOpen} /> */}
    </div>
  );
}
