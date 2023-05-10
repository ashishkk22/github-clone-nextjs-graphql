import { ChangeEvent, FC, useState } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GetUsersBySearchDocument } from "@/generated/graphql";
import UserDetailCard from "../UserDetailCard";
import Loader from "../loader/Loader";
import { useRouter } from "next/router";

type UserData = {
  id: string;
  login: string;
  name: string;
  email: string;
  avatarUrl: string;
};

type SearchModalProps = {
  handleClose: () => void;
};

const SearchModal: FC<SearchModalProps> = ({ handleClose }) => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [loadData, { data, error, loading, fetchMore }] = useLazyQuery(
    GetUsersBySearchDocument,
    {
      variables: { query: query, first: 10, after: null },
      notifyOnNetworkStatusChange: true,
    }
  );

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    loadData();
  };
  if (error) {
    return null;
  }
  return (
    <div className="fixed z-10 flex items-center justify-center w-screen h-screen text-white backdrop-blur-sm">
      <div className="relative rounded-lg shadow bg-slate-900 border-[1px] border-slate-800  sm:w-3/5 lg:w-3/5 xl:w-2/3 2xl:w-2/4 px-2 md:px-10 h-[75vh]">
        <button
          type="button"
          className="absolute top-3 right-2.5 text-white bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
          onClick={handleClose}
        >
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <div className="px-6 py-6 lg:px-8">
          <h3 className="mb-4 text-xl font-medium text-white">
            Search Users with Email or Username
          </h3>
          <form className="space-y-6" action="#">
            <div>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 rounded-lg block w-full p-2.5  text-black"
                placeholder="Enter Username or Email id"
                required
                value={query}
                onChange={inputHandler}
                autoFocus
              />
            </div>
          </form>
          <div className="h-[58vh] overflow-auto mt-4 scrollbar-thin scrollbar-tract-gray-900 scrollbar-thumb-gray-600">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <Loader />
              </div>
            ) : (
              <>
                {data?.search.edges?.map((data, idx) => {
                  const usersData = data?.node as UserData;
                  const name = usersData?.name ?? "";
                  const login = usersData?.login ?? "";
                  const image = usersData?.avatarUrl ?? "";
                  return (
                    <UserDetailCard
                      name={name}
                      login={login}
                      image={image}
                      key={usersData?.id + idx}
                      btnText="See Profile"
                      onClick={() => {
                        router.push(`/profile/${login}`);
                        handleClose();
                      }}
                    />
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
