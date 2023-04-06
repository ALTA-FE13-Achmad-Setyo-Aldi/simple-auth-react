import { FC, ReactNode } from "react";

import Navbar from "./Navbar";

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = (props) => {
  return (
    <div className="w-full h-screen overflow-auto flex flex-col bg-slate-600">
      <Navbar />
      <div className="w-full h-full p-3 flex flex-col items-center">
        {props.children}
      </div>
    </div>
  );
};

export default Layout;
