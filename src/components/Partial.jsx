import { IoChevronForwardSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

const Partial = ({title , link}) => {
  return (
    <div>
      <div className="flex items-center gap-1">
        <h1 className="font-bold capitalize">{title}</h1>
        <IoChevronForwardSharp className="text-sm" />
        <Link to={`/${link}`}>
            <p className="capitalize">{link}</p>
        </Link>
      </div>
    </div>
  );
};

export default Partial;
