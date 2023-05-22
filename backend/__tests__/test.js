// Run test with NODE_OPTIONS=--experimental-vm-modules npx jest
import app from "../app.mjs";
import request from "supertest";

// describe('testing the main.mjs file', function(){
//     test('test if it works', function() {
//         expect(app(1,2)).toBe(3);
//     })
// })

describe("Test the root path", () => {
    test("It should response the GET method", done => {
      request(app)
        .get("/account/test")
        .then(response => {
          expect(response.statusCode).toBe(200);
          done();
        });
    });

    test('Create a user', done => {
        const user = {
            username: "test@umass.edu",
            password: "1234567",
            confirm_password: "1234567",
            name: "testing"
        };
        request(app)
        .post('/account/signup').send(user)
        .then(response => {
            expect(response.statusCode).toBe(200);
            done();
        })
    });
        
        

          

  });