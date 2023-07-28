import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProfileSkeleton = () => {
  return (
    <div className="h-screen">
      <Skeleton className="h-[50vh]" />
      <div className="flex items-center space-x-10">
        <Skeleton circle className="h-40 w-40" />
        <div className="w-56">
          <Skeleton count={3} />
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
