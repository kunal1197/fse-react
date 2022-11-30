import TuitStats from "../components/tuits/tuit-stats";
import { screen, render, fireEvent } from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import { findAllUsers } from "../services/users-service";

test("like functionality test", () => {
  const tuit = {
    _id: {
      $oid: "634253132477068959ee808f",
    },
    tuit: "In 2021, our @NASAPersevere Mars rover landed and our Ingenuity helicopter took flight. Two asteroid missions launched to the skies, and another began its journey home to Earth. A look back at highlights for our #NASAScience planetary missions: https://go.nasa.gov/32zX2fE",
    postedOn: {
      $date: {
        $numberLong: "1640390400000",
      },
    },
    postedBy: "nasa",
    __v: 0,
    stats: {
      replies: 0,
      retuits: 0,
      likes: 1,
      dislikes: 1,
    },
  };

  const likeTuit = jest.fn();
  const dislikeTuit = jest.fn();

  render(
    <TuitStats tuit={tuit} likeTuit={likeTuit} dislikeTuit={dislikeTuit} />
  );

  const likeButton = document.querySelector("[data=like-tuit-button]");
  fireEvent.click(likeButton);
  expect(likeTuit).toBeCalledWith(tuit);
});

test("dislike functionality test", () => {
  const tuit = {
    _id: {
      $oid: "634253132477068959ee808f",
    },
    tuit: "In 2021, our @NASAPersevere Mars rover landed and our Ingenuity helicopter took flight. Two asteroid missions launched to the skies, and another began its journey home to Earth. A look back at highlights for our #NASAScience planetary missions: https://go.nasa.gov/32zX2fE",
    postedOn: {
      $date: {
        $numberLong: "1640390400000",
      },
    },
    postedBy: "nasa",
    __v: 0,
    stats: {
      replies: 0,
      retuits: 0,
      likes: 1,
      dislikes: 1,
    },
  };

  const likeTuit = jest.fn();
  const dislikeTuit = jest.fn();

  render(
    <TuitStats tuit={tuit} likeTuit={likeTuit} dislikeTuit={dislikeTuit} />
  );

  const dislikeButton = document.querySelector("[data=dislike-tuit-button]");
  fireEvent.click(dislikeButton);
  expect(dislikeTuit).toBeCalledWith(tuit);
});
