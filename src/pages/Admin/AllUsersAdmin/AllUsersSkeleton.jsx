import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AllUsersSkeleton = () => {
  return (
    <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
      <Skeleton height={100} />
      <Skeleton height={100} />
      <Skeleton height={100} />
      <Skeleton height={100} />
      <Skeleton height={100} />
      <Skeleton height={100} />
      <Skeleton height={100} />
      <Skeleton height={100} />
      <Skeleton height={100} />
      <Skeleton height={100} />
      <Skeleton height={100} />
      <Skeleton height={100} />
      <Skeleton height={100} />
      <Skeleton height={100} />
      <Skeleton height={100} />
    </div>
  );
};

export default AllUsersSkeleton;
