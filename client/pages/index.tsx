import { useQuery } from "@apollo/client";
import Repository from "@/components/Repositories/Repository";
import HomeLayout from "@/components/home/HomeLayout";
import { GetServerSidePropsContext } from "next";
import { addApolloState, initializeApollo } from "@/lib/apolloClient";
import { GetUsernameDocument } from "@/generated/graphql";
import Head from "next/head";

const Home = () => {
  const { data, error } = useQuery(GetUsernameDocument);

  if (error) {
    return <h1>Seems your github token is not valid</h1>;
  }

  return (
    <>
      <Head>
        <title>Github | Repositories</title>
      </Head>
      <main className="pt-16">
        {data?.viewer.login && (
          <HomeLayout username={data?.viewer.login}>
            <Repository username={data?.viewer.login} />
          </HomeLayout>
        )}
      </main>
    </>
  );
};

export const getServerSideProps = async ({
  req,
}: GetServerSidePropsContext) => {
  try {
    const userToken = req.cookies?.TOKEN;
    const apolloClient = initializeApollo(null, userToken);
    await apolloClient.query({
      query: GetUsernameDocument,
    });
    return addApolloState(apolloClient, {
      props: {},
    });
  } catch (err) {
    return {
      props: {},
    };
  }
};

export default Home;
