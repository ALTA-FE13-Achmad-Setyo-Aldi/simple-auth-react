import { FC } from "react";

import Layout from "../components/Layout";

const NotFound: FC = () => {
  return (
    <Layout>
      <div id="error-page" className="text-white">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>Page not found</i>
        </p>
      </div>
    </Layout>
  );
};

export default NotFound;
