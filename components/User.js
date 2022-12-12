import dayjs from "dayjs";
import Image from "next/image";
import { useState } from "react";
import { useSession } from "next-auth/react";
import ResetPassword from "./ResetPassword";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const User = ({ userData }) => {
  const [isLoading, setIsLoading] = useState(true); // A loading state for images for a blur effect before displaying image
  const { data: session } = useSession(); // Session management
  return (
    <section>
      <div className="my-4 rounded-lg bg-white p-4 shadow-md">
        <div className="flex items-center space-x-5">
          <div className="flex-shrink-0">
            <div className="relative">
              <div className="flex">
                <div className="relative z-10 flex h-20 w-20 overflow-hidden rounded-full md:h-32 md:w-32">
                  <Image
                    src={session?.user?.image}
                    width={500}
                    height={500}
                    quality="100"
                    alt={session?.user?.name}
                    priority
                    className={classNames(
                      " h-20 w-20 flex-shrink-0 rounded-full bg-white p-1 duration-700 ease-in-out md:h-32 md:w-32",
                      isLoading
                        ? "scale-110 blur-2xl grayscale"
                        : "scale-100 blur-0 grayscale-0"
                    )}
                    onLoadingComplete={() => setIsLoading(false)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <h1 className="truncate font-Merriweather text-2xl capitalize text-gray-900">
              {session?.user?.name}
            </h1>
            <div className="mt-2 min-w-0 flex-1 font-Poppin">
              <p className="mt-1 text-sm font-bold text-gray-600">
                Joined {`${dayjs(userData?.created_at).format("D MMMM, YYYY")}`}
              </p>
            </div>
          </div>
        </div>
        <div className="mx-4 mt-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <dt className="font-Merriweather text-sm font-medium capitalize text-gray-500">
                Other Names
              </dt>
              <dd className="mt-1 font-Poppin text-base text-gray-900">
                {userData?.otherNames || "N/A"}
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="font-Merriweather text-sm font-medium capitalize text-gray-500">
                Country
              </dt>
              <dd className="mt-1 truncate font-Poppin text-base text-gray-900">
                {userData?.country}
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="font-Merriweather text-sm font-medium capitalize text-gray-500">
                Phone Number
              </dt>
              <dd className="mt-1 truncate font-Poppin text-base text-gray-900">
                {userData?.phone}
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <ResetPassword />
    </section>
  );
};

export default User;
