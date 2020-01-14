export const defaults = {
    isLoggedIn: Boolean(localStorage.getItem("jjtodo-token")) || false
};

export const resolvers = {
    Mutation: {
        logUserIn: (_, {token}, {cache}) => {
            localStorage.setItem("jjtodo-token", token);
            cache.writeData({
                data: {
                    isLoggedIn: true
                }
            });
            window.location.reload();
            window.location = "/";
            return null;
        },
        logUserOut: (_, __, {cache}) => {
            localStorage.removeItem("jjtodo-token");
            window.location = "/";
            return null;
        }
    }
};
