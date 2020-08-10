/* global describe it */

process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app.js');

chai.should();

chai.use(chaiHttp);

var assert = require("assert");



describe('Reports', () => {



      describe('user', () => {
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

      describe('user', () => {
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

      describe('user', () => {
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

      describe('user', () => {
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

      // REPORT ------------------------------------------


      describe('Register user: ',()=>{
       it('register user already exists', (done) => {
       chai.request(server)
       .post('/register')
       .send({name:"test12", email:"test@test.com12", password: "password12", year: 1983, month: 3, day: 3})
       .end((err, res) => {
           res.body.should.be.an("object");
           res.body.data.msg.should.be.an("string");
           res.body.data.msg.length.should.be.above(0);
           done();
       });
       });
      });


      describe('login correct: ',()=>{
       it('login: correct username and pass', (done) => {
           try {
           chai.request(server)
           .post('/login')
           .send({name:"test12", email:"test@test.com12", password: "password12", year: 1983, month: 3, day: 3})
           .end((err, res) => {
               res.body.should.be.an("object");
               res.body.token.should.be.an("string");
               res.body.token.length.should.be.above(0);
               done();
           });
       } catch (error) {
         done(error);
       }
       });
      });

      describe('login wrong: ',()=>{
       it('login: Wrong username and pass', (done) => {
           try {
           chai.request(server)
           .post('/login')
           .send({name:"xxx", email:"xxx", password: "xxx", year: 1983, month: 3, day: 3})
           .end((err, res) => {
               res.body.should.be.an("object");
               res.body.msg.should.be.an("string");
               res.body.msg.length.should.be.above(0);
               done();
           });
       } catch (error) {
         done(error);
       }
       });
      });

    describe('reports/week/1', () => {
        it('200 GET /reports/week/1', (done) => {
            chai.request(server)
                .get("/reports/week/1")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.text.should.be.an("string");
                    res.body.text.length.should.be.above(0);

                    done();
                });
        });
    });

    describe('reports/week/2', () => {
        it('200 GET /reports/week/2', (done) => {
            chai.request(server)
                .get("/reports/week/2")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.text.should.be.an("string");
                    res.body.text.length.should.be.above(0);

                    done();
                });
        });
    });

    describe('reports/week/3', () => {
        it('200 GET /reports/week/3', (done) => {
            chai.request(server)
                .get("/reports/week/2")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.text.should.be.an("string");
                    res.body.text.length.should.be.above(0);

                    done();
                });
        });
    });




    describe('week report update: ',()=>{
     it('POST week with body', (done) => {
         try {
         chai.request(server)
         .post('/reports')
         .send({text:"test text", week:50})
         .end((err, res) => {
             res.body.should.be.an("object");
             res.body.data.msg.should.be.an("string");
             res.body.data.msg.length.should.be.above(0);
             done();
         });
     } catch (error) {
       done(error);
     }
     });
    });



      // HELLO ------------------------------------------





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
