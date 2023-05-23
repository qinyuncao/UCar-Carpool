import app from "../app.mjs";
import request from "supertest";

// Includes All test cases for backend, account.mjs, ride.mjs
// Contains in the same file, because requires to create user, and get JWT token
describe("Test the root path", () => {

    test('Create a user', done => {
        const user = {
            username: "test@umass.edu",
            password: "1234567",
            confirm_password: "1234567",
            name: "testing"
        };
        // Testing if user email is not umass email
        // Should get StatusCode 400
        request(app)
        .post('/account/signup').send({
            username: "test@gmail.com",
            password: "1234567",
            confirm_password: "1234567",
            name: "testing"
        })
        .then(response => {
            expect(response.statusCode).toBe(400);
        })
        // Testing if user email is not Complete
        // Should get StatusCode 400
        request(app)
        .post('/account/signup').send({
            username: "test@umass.edu",
            password: "1234567",
            confirm_password: "",
            name: "testing"
        })
        .then(response => {
            expect(response.statusCode).toBe(400);
        })
        // Testing if user passwords are not matching
        // Should get StatusCode 400
        request(app)
        .post('/account/signup').send({
            username: "test@umass.edu",
            password: "1234567",
            confirm_password: "1234444",
            name: "testing"
        })
        .then(response => {
            expect(response.statusCode).toBe(400);
        })
        // Testing if user can signup successfully
        // StatusCode 200
        request(app)
        .post('/account/signup').send(user)
        .then(response => {
            expect(response.statusCode).toBe(200);
            done();
        })
    });

    // Testing if same email already in use
    // Should get StatusCode 400
    test('Same email can not used to signup twice', done => {
        const user = {
            username: "test@umass.edu",
            password: "1234567",
            confirm_password: "1234567",
            name: "testing"
        };
        request(app)
        .post('/account/signup').send(user)
        .then(response => {
            expect(response.statusCode).toBe(400);
            done();
        })
    });
    
    let token;
    test('Login as a user', done => {
        const user = {
            username: "test@umass.edu",
            password: "1234567"
        };
        // Testing non-existing user
        request(app)
        .post('/account/login').send({
            username: "test@gmail.comm",
            password: "1234567"
        })
        .then(response => {
            expect(response.statusCode).toBe(400);
        })
        // Testing successful login
        request(app)
        .post('/account/login').send(user)
        .then(response => {
            token = "Bear " + response.text;
            expect(response.statusCode).toBe(200);
            done();
        })
    });

    test('Test if the JWT token works', done => {
        request(app)
        .get('/account/token').set("Authorization", token)
        .then(response => {
            expect(response.statusCode).toBe(200);
            done();
        })
    });

    test('Get name for the currentlogged in user', done => {
        // Test the incorrect token case
        request(app)
        .get('/account/getname').set("Authorization", "Bear 1232iidifdlj")
        .then(response => {
            expect(response.statusCode).toBe(401);
        })
        
        // Test the successful case
        request(app)
        .get('/account/getname').set("Authorization", token)
        .then(response => {
            expect(response.statusCode).toBe(200);
            done();
        })
    });

    // ===================================================
    // Test ride.mjs, requires the token after loggin
    test('Test get all rides', done => {
        request(app)
        .get('/ride/get-all-rides').set("Authorization", token)
        .then(response => {
            expect(response.statusCode).toBe(200);
            done();
        })
    });

    test('Test get avaliable rides', done => {
        request(app)
        .get('/ride/avaliable-rides').set("Authorization", token)
        .then(response => {
            expect(response.statusCode).toBe(200);
            done();
        })
    });
    
    test('Test get current user posted rides', done => {
        request(app)
        .get('/ride/user-posted-rides').set("Authorization", token)
        .then(response => {
            expect(response.statusCode).toBe(200);
            done();
        })
    });

    let newRide = {
        date: 111,
        time: 111,
        title: "new ride",
        departure: "amherst",
        destination: "boston",
        slot: 2,
        brand: "Audi",
        model: "a1",
        phone: "1234567890",
        details: "no details"
    };

    test('Create a new ride', done => {
        // Testing when required information are missing
        // Should get StatusCode 400
        request(app)
        .post('/ride/post-newride').set("Authorization", token)
        .send({
            date: null,
            time: 111,
            title: "new ride",
            departure: "amherst",
            destination: "boston",
            slot: 2,
            brand: "Audi",
            model: "a1",
            phone: "1234567890",
            details: "no details"
        })
        .then(response => {
            expect(response.statusCode).toBe(400);
        })
        
        // Testing if user can signup successfully
        // StatusCode 200
        request(app)
        .post('/ride/post-newride').set("Authorization", token)
        .send(newRide)
        .then(response => {
            expect(response.statusCode).toBe(200);
            done();
        })
    });

    test('Same ride can not create twice', done => {
        request(app)
        .post('/ride/post-newride').set("Authorization", token)
        .send(newRide)
        .then(response => {
            expect(response.statusCode).toBe(400);
            done();
        })
    })

    test('Delete a existing ride', done => {
        // Testing when required information are missing
        // Should get StatusCode 400
        request(app)
        .post('/ride/remove-ride').set("Authorization", token)
        .send({
            date: null,
            time: 111,
            username: "test@umass.edu"
        })
        .then(response => {
            expect(response.statusCode).toBe(400);
        })

        // Testing when the ride doesn't exist
        // Should get StatusCode 200, and 
        request(app)
        .post('/ride/remove-ride').set("Authorization", token)
        .send({
            date: 112,
            time: 111,
            username: "test@umass.edu"
        })
        .then(response => {
            expect(response.statusCode).toBe(200);
            expect(response.text).toBe("false");
        })
        
        // Testing if ride is delete successfully
        // StatusCode 200
        request(app)
        .post('/ride/remove-ride').set("Authorization", token)
        .send({
            date: 111,
            time: 111,
            username: "test@umass.edu"
        })
        .then(response => {
            expect(response.statusCode).toBe(200);
            expect(response.text).toBe("true");
            done();
        })
    });

    // ===================================================
    // Delete the user for testing
    test('Delete a user', done => {
        const user = {
            username: "test@umass.edu"
        };
        // Testing the case where user doesn't exit
        request(app)
        .post('/account/delete').send({
            username: "test@gmail.com"
        })
        .then(response => {
            expect(response.statusCode).toBe(400);
        })
        // Testing the successful case
        request(app)
        .post('/account/delete').send(user)
        .then(response => {
            expect(response.statusCode).toBe(200);
            done();
        })
    });
  });