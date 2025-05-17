import { IoAdd, IoCreate, IoPulse } from "react-icons/io5";
import { NavLink } from "react-router-dom";

const Organizations = () => {
  return (
    <div>
      <NavLink to={`add-new`} className='flex flex-row justify-left'>
        <span className="text-2xl border-1 border-green-400">
          <IoAdd className="text-green-400" />
        </span>
        <span className="ml-3">Add New</span>
      </NavLink>
    </div>
  );
};

export default Organizations;
