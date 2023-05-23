import jwt from "jsonwebtoken";

// Middleware to check if the user is logged in with jwt token
// In token is expired, send status code 401
export function checkUser(req, res, next) {
    let authHeader = req.headers['authorization'];
    let token = authHeader && authHeader.split(' ')[1];

    // Verity if the token is still avaliable
    jwt.verify(token, process.env.TOKEN_SECRET,
        function (err, decoded) {
            if (err) return res.status(401).send({ error: "You need a new token!" });
            req.user = decoded;
            next();
        });
}