import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { loggedIn, logUserOut } from "../apollo";

const CURRENT_USER_QUERY = gql`
  query myProfile {
    myProfile {
      id
      username
      avatar
    }
  }
`;

const useCurrentUser = () => {
  const loggedInLocally = loggedIn();
  const { data } = useQuery(CURRENT_USER_QUERY, {
    skip: !loggedInLocally,
  });
  useEffect(() => {
    if (data?.myProfile === null) {
      logUserOut();
    }
  }, [data]);
  return { user: data?.myProfile };
};

export default useCurrentUser;
