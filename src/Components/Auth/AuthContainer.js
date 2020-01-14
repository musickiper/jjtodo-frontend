import React, {useState} from "react";
import AuthPresenter from "./AuthPresenter";
import useInput from "../../Hooks/useInput";
import {useMutation} from "react-apollo-hooks";
import {
    CONFIRM_SECRET,
    CREATE_USER,
    LOCAL_LOG_IN,
    REQUEST_SECRET
} from "./AuthQueries";
import {toast} from "react-toastify";

export default ({history}) => {
    // States
    const [action, setAction] = useState("logIn");
    const email = useInput("");
    const username = useInput("");
    const secret = useInput("");

    // GraphQL Queries
    const requestSecretMutation = useMutation(REQUEST_SECRET, {
        variables: {email: email.value}
    })[0];

    const createUserMutation = useMutation(CREATE_USER, {
        variables: {
            email: email.value,
            username: username.value,
        }
    })[0];

    const confirmSecretMutation = useMutation(CONFIRM_SECRET, {
        variables: {
            secret: secret.value,
            email: email.value
        }
    })[0];

    const localLogInMutation = useMutation(LOCAL_LOG_IN)[0];

    // Callback Functions
    const onSubmit = async e => {
        e.preventDefault();
        if (action === "logIn") {
            if (email.value !== "") {
                try {
                    const {
                        data: {requestSecret}
                    } = await requestSecretMutation();
                    if (!requestSecret) {
                        toast.error("You don't have an account yet, create one");
                        setTimeout(() => setAction("signUp"), 3000);
                    } else {
                        toast.success("Check your inbox for your login secret");
                        setAction("confirm");
                    }
                } catch {
                    toast.error("Can't request secret, try again.");
                }
            } else {
                toast.error("Email is required");
            }
        } else if (action === "signUp") {
            if (
                email.value !== "" &&
                username.value !== ""
            ) {
                try {
                    const {
                        data: {createUser}
                    } = await createUserMutation();
                    if (!createUser) {
                        toast.error("Can't create account");
                    } else {
                        toast.success("Account created! Log In now");
                        setTimeout(() => setAction("logIn"), 3000);
                    }
                } catch (e) {
                    toast.error(e.message);
                }
            } else {
                toast.error("All fields are required");
            }
        } else if (action === "confirm") {
            if (secret.value !== "") {
                try {
                    const {
                        data: {confirmSecret: token}
                    } = await confirmSecretMutation();
                    if (token !== "" && token !== undefined) {
                        await localLogInMutation({variables: {token}});
                        history.push("/");
                    } else {
                        throw new Error();
                    }
                } catch {
                    toast.error("Can't confirm secret, check again");
                }
            }
        }
    };

    return (
        <AuthPresenter
            setAction={setAction}
            action={action}
            email={email}
            username={username}
            secret={secret}
            onSubmit={onSubmit}
        />
    );
};
