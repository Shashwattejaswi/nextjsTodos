import { ThreeDots } from "react-loader-spinner";

const Loader = ({loading}:{loading?:boolean}) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center fixed top-0 left-0 z-15 w-full h-full bg-[#00000066] p-4 rounded-lg shadow-lg">
        <ThreeDots color="#00000066" />
      </div>
    );
  }
};

export default Loader;
