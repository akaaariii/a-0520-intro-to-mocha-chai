const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');

chai.should(); //assertation style

chai.use(chaiHttp); //enable to call our RESTful API

describe('GET ALL /api/tasks', function() {
    
    it('should GET all the tasks', function(done){
        chai.request(server)
            .get('/api/tasks')
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('array');
                response.body.length.should.be.eq(3);
            })
        done();
    });

    it('should NOT GET all the tasks', function (done) {
        chai.request(server)
            .get('/api/task')
            .end((err, response) => {
                response.should.have.status(404);
            })
        done();
    })
})

describe('GET task by ID', () => {
    it('should GET a task by ID', (done) => {
        const taskId = 1;
        chai.request(server)
            .get('/api/tasks/' + taskId)
            .end((err, response) => {
                response.should.have.status(200)
                response.body.should.be.a('object')
                response.body.should.have.property('id')
                response.body.should.have.property('name')
                response.body.should.have.property('completed')
                response.body.should.have.property('id').eq(1)
            })
        done();
    })

    it('should NOT GET a task by ID', (done) => {
        const taskId = 123
        chai.request(server)
            .get('/api/tasks/' + taskId)
            .end((err,response) => {
                response.should.have.status(404)
                response.text.should.be.eq('The task with the provided ID does not exist.')
            })
        done();
    })
})

describe('POST /api/tasks', () => {
    it('should POST a new task', (done) => {
        const task = {
            name: 'Task 4',
            completed: false
        }

        chai.request(server)
            .post('/api/tasks')
            .send(task)
            .end((err, response) => {
                response.should.have.status(201)
                response.body.should.be.a('object')
                response.body.should.have.property('id').eq(4)
                response.body.should.have.property('name').eq('Task 4')
                response.body.should.have.property('completed').eq(false)
            })
        done();
    })


    it('should NOT POST a new task without the name property', (done) => {
        const task = {
            completed: false
        }
        chai.request(server)
            .post('/api/tasks')
            .send(task)
            .end((err, response) => {
                response.should.have.status(400)
                response.text.should.be.eq('The name should be at least 3 characters long')
            })
        done();
    })
})


describe("PUT /api/tasks/:id", () => { 

})

describe("PATCH /api/tasks/:id", () => { 

})

describe("DELETE /api/tasks/:id", () => {

})