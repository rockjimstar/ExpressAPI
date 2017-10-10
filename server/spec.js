var app = require('./server');
var request = require('supertest');
var expect = require('chai').expect;

describe('[LIONS]', function(){

	it('should create a lion', function(done){
		var lion = {
				name: 'Mufasa',
				age: 100,
				pride: 'Evil lions',
				gender: 'male'
			};

		request(app)
			.post('/lions')
			.send(lion)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(201)
			.end(function(err, resp){
				expect(resp.body).to.be.an('object');
				//expect(resp.body).to.eql(lion);
				done();
			})
	});

	it('should get all lions', function(done){
		request(app)
			.get('/lions')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.end(function(err, resp){
				expect(resp.body).to.be.an('array');
				done();
			})
	});

	it('should delete a lion', function(done){
		var testLion = {
			name: 'Simba',
			age: 10,
			pride: 'Cool Cats',
			gender: 'male'
		}
		request(app)
			.post('/lions')
			.send(testLion)
			.set('Accept', 'application/json')
			.end(function(err, resp){
				var lion = resp.body;
				request(app)
					.delete('/lions/' + lion.id)
					.end(function(err, resp){
						expect(resp.body).to.eql(lion);
						done();
					});
			})
	});

	it('should update a lion', function(done){
		var testLion = {
			name: 'Simba',
			age: 10,
			pride: 'Cool Cats',
			gender: 'male'
		}
		request(app)
			.post('/lions')
			.send(testLion)
			.set('Accept', 'application/json')
			.end(function(err, resp){
				var lion = resp.body;
				request(app)
					.put('/lions/' + lion.id)
					.send({
						name: 'new name'
					})
					.end(function(err, resp){
						expect(resp.body.name).to.equal('new name');
						done();
					});
			})
	});

});