import Tuits from "../tuits";
import * as service from "../../services/likes-service";
import { useEffect, useState } from "react";

const MyLikes = () => {
  const [likedTuits, setLikedTuis] = useState([]);
  const findTuitsILike = () =>
    service.findAllTuitsLikedByUser("me").then((tuits) => setLikedTuis(tuits));
  useEffect(findTuitsILike, []);

  return (
    console.log(likedTuits),
  );
};
export default MyLikes;
