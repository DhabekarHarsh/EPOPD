import axios from "axios";

export const findUserByEmail = async (email) => {
    return await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/check-user-email`,
      {email}
    );
};