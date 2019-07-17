import Axios from "axios";
import { API, API_PORT, USERNAME_CHECK_ROUTE, PLAYERS_ROUTE } from "./../config";

const validateFields = (type, data) => {
    const strongRegex = new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    let errorMissingField = "Missing field";
    let errorToShortField = "Requires more characters";
    let errorInvalidChars = "Password is not stronge enough";
    let errorToYoung = "You must be 18+ to submit";
    let errorUsernameAlreadyExists = "User name already exists";
    let errorReason = "";
    let valid = true;

    if (!data) {
        valid = false;
        errorReason = errorMissingField;
        return [valid, errorReason];
    }

    switch (type) {
        case "name":
            if (data.length < 2) {
                valid = false;
                errorReason = errorToShortField;
            }

            usernameExists(data)
                .then(response => {
                    if (response) {

                    }
                })
            break;

        case "age":
            if (parseInt(data) < 18) {
                valid = false;
                errorReason = errorToYoung;
            }
            break;

        case "password":
            if (!strongRegex.test(data)) {
                valid = false;
                errorReason = errorInvalidChars;
            }
            break;

        default:
            break;
    }

    return [valid, errorReason];
};

const usernameExists = async (username) => {
    try {
        const res = await Axios.get(
            `${API}:${API_PORT}${PLAYERS_ROUTE}${USERNAME_CHECK_ROUTE}/${username}`,
        )
        const data = await res.data
        return data
    } catch (error) {
        return error
    }
    // Axios.get(`${API}:${API_PORT}${PLAYERS_ROUTE}${USERNAME_CHECK_ROUTE}/${username}`)
    //     .then(result => {
    //         return result.data
    //     })
    //     .catch(error => console.log(error))
}

export {
    validateFields,
    usernameExists
}