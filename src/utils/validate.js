const validate = (type, data) => {
    const strongRegex = new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    let errorMissingField = "Missing field";
    let errorToShortField = "Requires more characters";
    let errorInvalidChars = "Password is not stronge enough";
    let errorToYoung = "You must be 18+ to submit";
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

module.exports = validate