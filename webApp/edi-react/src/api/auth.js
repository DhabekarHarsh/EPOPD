import axios from "axios";

export const createOrUpdateUser = async (authtoken,name) => {
    return await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/create-or-update-user`,
      {name},
      {
        headers: {
          authtoken,
        },
      }
    );
};
