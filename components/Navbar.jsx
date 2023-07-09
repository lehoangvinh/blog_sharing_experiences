"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
// import styles from "./navbar.module.css";
// import useSWR from "swr";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
// import DarkModeToggle from "./DarkModeToggle/DarkModeToggle";

const Navbar = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <nav className="flex flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex flex-center align-center gap-2 ">
        <Image
          src="/assets/images/logo_rm.png"
          alt="logo"
          // fill={true}
          width={60}
          height={60}
          className="w-[60px] h-[60px] object-contain"
        />
        <p className=" blue_gradient text-[20px] font-medium">LeHoangVinh</p>
      </Link>
      <div className="sm:flex hidden gap-2">
        {session?.user ? (
          <div className="flex gap-3 md:gap-2">
            <Link href="/create-prompt" className="black_btn">
              Create Posts
            </Link>
            <button className="outline_btn" type="button" onClick={signOut}>
              SignOut
            </button>
            {/* <button
              className="outline_btn"
              type="button"
              onClick={() => {
                console.log(session);
              }}
            >
              {session?.user.name}
            </button> */}
            <Link href="/profile">
              <Image
                className="rounded-full border-[1px] border-black h-[100%] w-[100%]"
                src={
                  session?.user.image
                    ? session.user.image
                    : "/assets/images/logo_rm.png"
                }
                alt="profile"
                width={30}
                height={30}
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map(
                (provider) =>
                  provider.name === "Google" && (
                    <button
                      type="button"
                      className="black_btn"
                      key={provider.name}
                      onClick={() => {
                        signIn(provider.id);
                      }}
                    >
                      Sign In
                    </button>
                  )
              )}
          </>
        )}
      </div>

      {/* mobile navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex cursor-pointer">
            <Image
              className="border-[1px] border-black rounded-full h-[100%] w-[100%]"
              src={
                session?.user.image
                  ? session.user.image
                  : "/assets/images/logo_rm.png"
              }
              alt="profile"
              width={30}
              height={30}
              onClick={() => setToggleDropdown((pre) => !pre)}
            />
            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  className="dropdown_link"
                  href="/profile"
                  onClick={() => {
                    setToggleDropdown(false);
                  }}
                >
                  My Profile
                </Link>
                <Link
                  className="dropdown_link"
                  href="/create-prompt"
                  onClick={() => {
                    setToggleDropdown(false);
                  }}
                >
                  Create Prompts
                </Link>
                <button
                  type="button"
                  className="black_btn w-full mt-5"
                  onClick={() => {
                    signOut();
                    setToggleDropdown(false);
                  }}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map(
                (provider) =>
                  provider.name === "Google" && (
                    <button
                      type="button"
                      className="black_btn"
                      key={provider.name}
                      onClick={() => {
                        signIn(provider.id);
                      }}
                    >
                      Sign In
                      {/* {provider.name} */}
                    </button>
                  )
              )}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
