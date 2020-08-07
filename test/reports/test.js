/* global describe it */

process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app.js');

chai.should();

chai.use(chaiHttp);

var assert = require("assert");



describe('Reports', () => {

      describe('GET /user', () => {
          it('200 GET /user', (done) => {
              chai.request(server)
                  .get("/user")
                  .end((err, res) => {
                      res.should.have.status(200);
                      res.body.should.be.an("object");
                      res.body.data.msg.should.be.an("string");
                      res.body.data.msg.length.should.be.above(0);
                      done();
                  });
          });
      });

      describe('POST /user', () => {
          it('201 POST /user', (done) => {
              chai.request(server)
                  .post("/user")
                  .end((err, res) => {
                      res.should.have.status(201);
                      res.body.should.be.an("object");
                      res.body.data.msg.should.be.an("string");
                      res.body.data.msg.length.should.be.above(0);
                      done();
                  });
          });
      });

      describe('PUT /user', () => {
          it('204 PUT /user', (done) => {
              chai.request(server)
                  .put("/user")
                  .end((err, res) => {
                      res.should.have.status(204);
                      // res.body.should.be.an("object");
                      // res.body.data.msg.should.be.an("string");
                      // res.body.data.msg.length.should.be.above(0);
                      done();
                  });
          });
      });

      describe('DELETE /user', () => {
          it('204 DELETE /user', (done) => {
              chai.request(server)
                  .delete("/user")
                  .end((err, res) => {
                      res.should.have.status(204);
                      // res.body.should.be.an("object");
                      // res.body.data.msg.should.be.an("string");
                      // res.body.data.msg.length.should.be.above(0);
                      done();
                  });
          });
      });

      // REGISTER ------------------------------------------


      describe('Register user: ',()=>{
       it('register user already exists', (done) => {
       chai.request(server)
       .post('/register')
       .send({name:"test12", email:"test@test.com12", password: "password12", year: 1983, month: 3, day: 3})
       .end((err, res) => {
           res.body.should.be.an("object");
           console.log(res.body);

           done();
       });
       });
      });


      describe('test: ',()=>{
       it('test', (done) => {
           try {
           chai.request(server)
           .post('/register')
           .send({name:"test12", email:"test@test.com12", password: "password12", year: 1983, month: 3, day: 3})
           .end((err, res) => {
               res.body.should.be.an("object");
               console.log(res.body);

               done();
           });
       } catch (error) {
         done(error);
       }
       });
      });







      // describe('GET /login/test_user', () => {
      //     it('200 GET /login/test_user', (done) => {
      //         chai.request(server)
      //             .get("/login/test_user")
      //             .end((err, res) => {
      //                 console.log(res.body.data.msg);
      //                 res.should.have.status(200);
      //                 res.body.should.be.an("object");
      //                 res.body.data.msg.should.be.an("string");
      //                 res.body.data.msg.length.should.be.above(0);
      //                 done();
      //             });
      //     });
      // });



      // req.body.name,req.body.email,req.body.password,req.body.year,req.body.month,req.body.day,


      // chai.request(app)
      //   .post('/user/me')
      //   .type('form')
      //   .send({
      //     '_method': 'put',
      //     'password': '123',
      //     'confirmPassword': '123'
      //   })



      // describe('GET /reports/week/1', () => {
      //     it('200 HAPPY PATH', (done) => {
      //         chai.request(server)
      //             .get("/reports/week/1")
      //             .end((err, res) => {
      //                 res.should.have.status(200);
      //                 res.body.should.be.an("object");
      //                 res.body.text.should.be.an("string");
      //                 res.body.text.length.should.be.above(0);
      //
      //                 done();
      //             });
      //     });
      // });
      //
      // describe('GET /reports/week/2', () => {
      //     it('200 HAPPY PATH', (done) => {
      //         chai.request(server)
      //             .get("/reports/week/2")
      //             .end((err, res) => {
      //                 res.should.have.status(200);
      //                 res.body.should.be.an("object");
      //                 res.body.text.should.be.an("string");
      //                 res.body.text.length.should.be.above(0);
      //
      //                 done();
      //             });
      //     });
      // });
      //
      // describe('GET /reports/week/3', () => {
      //     it('200 HAPPY PATH', (done) => {
      //         chai.request(server)
      //             .get("/reports/week/2")
      //             .end((err, res) => {
      //                 res.should.have.status(200);
      //                 res.body.should.be.an("object");
      //                 res.body.text.should.be.an("string");
      //                 res.body.text.length.should.be.above(0);
      //
      //                 done();
      //             });
      //     });
      // });
      //
      //
      // describe('GET /login/test_user', () => {
      //     it('Test', (done) => {
      //         chai.request(server)
      //             .get("/login/test_user")
      //             .end((err, res) => {
      //                 console.log(err);
      //                 console.log(res.body);
      //                 done();
      //             });
      //     });
      // });

});







// describe('Reports', () => {
//
//       describe('GET /', () => {
//           it('200 HAPPY PATH', (done) => {
//               chai.request(server)
//                   .get("/reports/week/1")
//                   .end((err, res) => {
//                       res.should.have.status(200);
//                       res.body.should.be.an("object");
//                       res.body.text.should.be.an("string");
//                       res.body.text.length.should.be.above(0);
//
//                       done();
//                   });
//           });
//       });
//
//       describe('GET /reports/week/1', () => {
//           it('200 HAPPY PATH', (done) => {
//               chai.request(server)
//                   .get("/reports/week/1")
//                   .end((err, res) => {
//                       res.should.have.status(200);
//                       res.body.should.be.an("object");
//                       res.body.text.should.be.an("string");
//                       res.body.text.length.should.be.above(0);
//
//                       done();
//                   });
//           });
//       });
//
//       describe('GET /reports/week/2', () => {
//           it('200 HAPPY PATH', (done) => {
//               chai.request(server)
//                   .get("/reports/week/2")
//                   .end((err, res) => {
//                       res.should.have.status(200);
//                       res.body.should.be.an("object");
//                       res.body.text.should.be.an("string");
//                       res.body.text.length.should.be.above(0);
//
//                       done();
//                   });
//           });
//       });
//
//       describe('GET /reports/week/3', () => {
//           it('200 HAPPY PATH', (done) => {
//               chai.request(server)
//                   .get("/reports/week/2")
//                   .end((err, res) => {
//                       res.should.have.status(200);
//                       res.body.should.be.an("object");
//                       res.body.text.should.be.an("string");
//                       res.body.text.length.should.be.above(0);
//
//                       done();
//                   });
//           });
//       });
//
//
//       describe('GET /login/test_user', () => {
//           it('Test', (done) => {
//               chai.request(server)
//                   .get("/login/test_user")
//                   .end((err, res) => {
//                       console.log(err);
//                       console.log(res.body);
//                       done();
//                   });
//           });
//       });
//
// });
