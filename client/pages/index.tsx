import { useQuery } from "@apollo/client";
import { NextPageWithLayout } from "./_app";
import Repository from "@/components/Repositories/Repository";
import HomeLayout from "@/components/home/HomeLayout";
import { GetServerSidePropsContext } from "next";
import { addApolloState, initializeApollo } from "@/lib/apolloClient";
import {   GetReposDocument, GetUserDetailDocument } from "@/generated/graphql";

const Home: NextPageWithLayout = () => {
  const { error, loading, data } = useQuery(GetUserDetailDocument);
  console.log(data);

  if(error){
    return <h1>Error is there !</h1>
  }
  return (
    <main className="bg-slate-900">
    <HomeLayout>
      <Repository />
    </HomeLayout>
    </main>
  );
};



export const getServerSideProps = async ({
  req,
}: GetServerSidePropsContext) => {
  try {
    const userToken = req.cookies?.TOKEN;
    const apolloClient = initializeApollo(null, userToken);
    await apolloClient.query({
      query: GetUserDetailDocument,
    });
    return addApolloState(apolloClient, {
      props: {},
    });
  } catch (err) {
    return {
      props :{
        
      }
    }
  }
};


export default Home;
