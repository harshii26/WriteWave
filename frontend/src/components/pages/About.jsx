import React, { useContext } from "react";
import { Context } from "../../main";

const About = () => {
  const { mode } = useContext(Context);
  return (
    <article className={mode === "dark" ? "dark-bg about" : "light-bg about"}>
      <div className="container">
        <h2>About</h2>
        <p>
        WriteWave is more than just a blogging platform—it's a community for creators, thinkers, and storytellers to share their voices and inspire others. Whether you're a seasoned writer or someone exploring their passion for words, WriteWave offers a space to craft, publish, and connect with like-minded individuals. Our mission is to empower everyone to share their unique stories, spark meaningful conversations, and build a wave of creativity that resonates across the globe. Dive into WriteWave and let your ideas flow!
        </p>
      </div>
    </article>
  );
};

export default About;
