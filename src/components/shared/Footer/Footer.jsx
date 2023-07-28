import React from "react";

const Footer = () => {
  return (
    <footer className="py-5 mx-[5%]">
      <div className="my-12 flex justify-between">
        <p className="text-6xl">
          Subscribe to <span className="font-bold capitalize">new posts</span>
        </p>

        <div className="bg-gray-200 w-[40rem] flex rounded-full">
          <input
            type="text"
            className="text-2xl py-4 px-7 rounded-lg w-full bg-transparent outline-none"
            placeholder="Newsletter..."
          />

          <button className="capitalize bg-black py-4 px-14 rounded-full text-white text-2xl font-medium">
            subscribe
          </button>
        </div>
      </div>

      <div className="border-t border-gray-300 flex lg:flex-row flex-col justify-between py-10">
        <div className="w-[30rem]">
          <p className="text-5xl font-bold italic underline">Blogz</p>
          <p className="text-xl my-4 italic">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Dignissimos libero blanditiis eos ex a consectetur voluptatum non
            maxime vitae voluptas.
          </p>
        </div>

        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="capitalize ">
            <h3 className="capitalize font-semibold text-2xl my-3 underline">features</h3>
            <p className="text-xl my-1 italic">latest blogs</p>
            <p className="text-xl my-1 italic">admin panel</p>
            <p className="text-xl my-1 italic"> CRUD functions</p>
            <p className="text-xl my-1 italic">comments</p>
            <p className="text-xl my-1 italic">full stack</p>
          </div>

          <div className="capitalize ">
            <h3 className="capitalize font-semibold text-2xl my-3 underline">about</h3>
            <p className="text-xl my-1 italic">staff</p>
            <p className="text-xl my-1 italic">contact us</p>
            <p className="text-xl my-1 italic">advertise</p>
            <p className="text-xl my-1 italic">careers</p>
            <p className="text-xl my-1 italic">sitemap</p>
          </div>

          <div className="capitalize ">
            <h3 className="capitalize font-semibold text-2xl my-3 underline">legal</h3>
            <p className="text-xl my-1 italic">terms of service</p>
            <p className="text-xl my-1 italic">privacy policy</p>
            <p className="text-xl my-1 italic">dashboard</p>
            <p className="text-xl my-1 italic">code of conduct</p>
            <p className="text-xl my-1 italic">about our ads</p>
          </div>

          <div className="capitalize ">
            <h3 className="capitalize font-semibold text-2xl my-3 underline">trending</h3>
            <p className="text-xl my-1 italic">layoffs</p>
            <p className="text-xl my-1 italic">chat GPT</p>
            <p className="text-xl my-1 italic">google</p>
            <p className="text-xl my-1 italic">amazon</p>
            <p className="text-xl my-1 italic">threda FAQ</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
