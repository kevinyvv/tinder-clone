import axios from "axios";
import { useEffect, useState, useCallback} from "react";
import { useCookies } from "react-cookie";

const MatchesDisplay = ({ matches, setClickedUser}) => {
  const [matchedProfiles, setMatchedProfiles] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(null);

  const matchedUserIds = matches?.map(({ user_id }) => user_id);
  const userId = cookies.UserId;

  const getMatches = useCallback(async () => { // Wrap getMatches with useCallback
    try {
      const response = await axios.get("http://localhost:8000/users", {
        params: { userIds: JSON.stringify(matchedUserIds) },
      });
      setMatchedProfiles(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [matchedUserIds]); // Add matchedUserIds as a dependency

  useEffect(() => {
    getMatches();
  }, [getMatches, matches]);

  const filteredMatchedProfiles = matchedProfiles?.filter(
    (matchedProfile) =>
      Array.isArray(matchedProfile?.matches) && 
      matchedProfile.matches.some((profile) => profile.user_id === userId)
  );

  return (
    <div className="h-[60%] p-4 overflow-y-auto">
      {filteredMatchedProfiles?.map((match, _index) => (
        <div
          key={_index}
          className="max-w-[400px] w-[400px] height-[650px]"
          onClick={() => setClickedUser(match)}
        >
          <div className="h-[30px] w-[30px] rounded-lg overflow-hidden m-2">
            <img src={match?.url} alt={match?.first_name + " profile"} />
          </div>
          <h3>{match?.first_name}</h3>
        </div>
      ))}
    </div>
  );
};

export default MatchesDisplay;