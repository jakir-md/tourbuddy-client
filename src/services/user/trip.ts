import { serverFetch } from "@/lib/server-fetch";

export const createNewTrip = async (data: any) => {
  try {
    const response = await serverFetch.post("/trip/create", {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    return result;
  } catch (error: any) {
    console.log("Error occured creating new tour subscirption", error);
    return {
      data: [],
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong while fetching subscriptions",
    };
  }
};

export const fetchAllUserTrips = async () => {
  try {
    const response = await serverFetch.get("/trip/user-trips");
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.log("Error occured fetching all user trips", error);
    return {
      data: [],
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong while fetching subscriptions",
    };
  }
};

export const getAllStartPoints = async () => {
  try {
    const response = await serverFetch.get("/trip/startPoints");
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.log("Error occured fetching all destinations", error);
    return {
      data: [],
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong while fetching destionations",
    };
  }
};

export const getProfileTrips = async (userid: string) => {
  try {
    const response = await serverFetch.get(`/trip/profile-trips/${userid}`);
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.log("Error occured while fetching all profile trips", error);
    return {
      data: [],
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong while fetching destionations",
    };
  }
};
