import {
  createTuit,
  deleteTuit,
  findTuitById,
  findAllTuits,
} from "../services/tuits-service";

describe("can create tuit with REST API", () => {
  // TODO: implement this
  // A simple Tuit object to be deleted
  const sampleTuit = {
    tuit: "Hi this is Kunal speaking!",
    postedBy: "63425a966a11d19acda76bfd",
  };

  let createdTuitID = null;

  // perform cleaning up after test
  afterAll(() => {
    // delete test tuits
    return deleteTuit(createdTuitID);
  });

  test("can insert new tuits with REST API", async () => {
    // Perform insertions in the database
    const newTuit = await createTuit(sampleTuit.postedBy, sampleTuit);
    expect(newTuit.postedBy).toEqual(sampleTuit.postedBy);
    expect(newTuit.tuit).toEqual(sampleTuit.tuit);
    createdTuitID = newTuit._id;
  });
});

describe("can delete tuit wtih REST API", () => {
  // TODO: implement this
  // A simple Tuit object to be inserted
  const sampleTuit = {
    tuit: "Hello this is Kunal!",
    postedBy: "63425a966a11d19acda76bfd",
  };

  // to be deleted later
  let createdTuitID = null;

  beforeAll(async () => {
    // insertion of tuit in the database
    const createdTuit = await createTuit(sampleTuit.postedBy, sampleTuit);
    createdTuitID = createdTuit._id;
  });

  test("can insert new tuits with REST API", async () => {
    const status = await deleteTuit(createdTuitID);
    expect(status.deletedCount).toBeGreaterThanOrEqual(1);
  });
});

describe("can retrieve a tuit by their primary key with REST API", () => {
  // TODO: implement this
  const sampleTuit = {
    tuit: "Hello this is Kunal!",
    postedBy: "63425a966a11d19acda76bfd",
  };

  // to be deleted later
  let createdTuitID = null;

  beforeAll(async () => {
    // insertion of tuit in the database
    const createdTuit = await createTuit(sampleTuit.postedBy, sampleTuit);
    createdTuitID = createdTuit._id;
  });

  // perform cleaning up after test
  afterAll(() => {
    // delete test tuits
    return deleteTuit(createdTuitID);
  });

  test("can insert new tuits with REST API", async () => {
    const response = await findTuitById(createdTuitID);
    expect(response.tuit).toEqual(sampleTuit.tuit);
    expect(response.postedBy._id).toEqual(sampleTuit.postedBy);
  });
});

describe("can retrieve all tuits with REST API", () => {
  // TODO: implement this
  // Array object of Tuits to be inserted
  const tuitsToBeInserted = [
    {
      tuit: "Kunal's tuit number 1",
      postedBy: "63425a966a11d19acda76bfd",
    },
    {
      tuit: "Kunal's tuit number 2",
      postedBy: "63425a966a11d19acda76bfd",
    },
    {
      tuit: "Zeus's tuit number 1",
      postedBy: "63425abf6a11d19acda76bff",
    },
  ];

  // array to store the ids of the inserted tuits
  const createdTuitIDs = [];

  // setting up data
  beforeAll(() =>
    // insertion of tuit array in the database
    Promise.all(
      tuitsToBeInserted.map(async (tuit) => {
        const createdTuit = await createTuit(tuit.postedBy, tuit);
        createdTuitIDs.push(createdTuit._id);
      })
    )
  );

  // perform cleaning on created tuits
  afterAll(() =>
    // deletion of tuit array in the database
    Promise.all(createdTuitIDs.map(async (tid) => await deleteTuit(tid)))
  );

  test("can retrieve all tuits from REST API", async () => {
    // get all tuits
    const tuitsFetched = await findAllTuits();
    // check minimum length
    expect(tuitsFetched.length).toBeGreaterThanOrEqual(
      tuitsToBeInserted.length
    );
    // check if our inserted tuits are present
    const tuitsWeInserted = tuitsFetched.filter(
      (tuit) => createdTuitIDs.indexOf(tuit._id) >= 0
    );

    for (let i = 0; i < tuitsWeInserted.length; i++) {
      expect(
        tuitsWeInserted.find(
          (tuit) =>
            tuit.tuit === tuitsToBeInserted[i].tuit &&
            tuit.postedBy === tuitsToBeInserted[i].postedBy
        )
      ).toBeDefined();
    }
  });
});
