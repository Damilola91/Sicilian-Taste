import PopularCategories from "../PopularCategories/PopularCategories";
import SuperDelicious from "../SuperDelicious/SuperDelicious";
import Newsletter from "../NewsLetter/NewsLetter";

import "./Main.css";

const Main = () => {
  return (
    <main className="container my-5">
      <PopularCategories />
      <SuperDelicious />
      <Newsletter />
    </main>
  );
};

export default Main;
