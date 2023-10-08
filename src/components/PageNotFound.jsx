import { connect } from "react-redux";

const PageNotFound = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mt-9">404 Error</h1>
      <h2 className="text-2xl font-bold mt-9">Page not found</h2>
    </div>
  );
};

export default connect()(PageNotFound);
