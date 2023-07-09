import React from "react";
import Feed from "@components/Feed";
const Home = () => {
  return (
    <section className="w-full flex flex-col flex-center">
      <h1 className="head_text text-center">
        Discover & share <br className="max-md:hidden" />
        <span className="blue_gradient text-center">IT experience</span>
      </h1>
      <p className="desc text-center">
        Vinh blog, where you can find the IT experience of programmers.
      </p>
      <Feed />
    </section>
  );
};

export default Home;
