let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');

//Assertion Style
chai.should();

chai.use(chaiHttp);

describe('Departments API', () => {
	/**
	 * Test the GET route
	 */
	describe('GET /api/departments', () => {
		it('It should GET all the departments', done => {
			chai
				.request(server)
				.get('/api/departments')
				.end((err, response) => {
					response.should.have.status(200);
					response.body.should.be.a('object');
					response.body.should.have
						.property('message')
						.eq('Departments fetched successfully');
					done();
				});
		});

		it('It should NOT GET all the departments', done => {
			chai
				.request(server)
				.get('/api/department')
				.end((err, response) => {
					response.should.have.status(404);
					done();
				});
		});
	});

	/**
	 * Test the GET (by id) route
	 */
	describe('GET /api/departments/:id', () => {
		it('It should GET a particular department by ID', done => {
			const departmentId = '611461cf2ca5277c5467cbea';
			chai
				.request(server)
				.get(`/api/departments/${departmentId}`)
				.end((err, response) => {
					response.should.have.status(200);
					response.body.should.be.a('object');
					response.body.should.have.property('data');
					response.body.should.have.property('message').eq('Department found');
					done();
				});
		});

		it('It should NOT GET a department by ID', done => {
			const departmentId = '6114425a07f7115a8f2cfac1';
			chai
				.request(server)
				.get(`/api/departments/${departmentId}`)
				.end((err, response) => {
					response.should.have.status(404);
					response.body.should.have
						.property('message')
						.eq('Department not found');
					done();
				});
		});
	});

	/**
	 * Test the POST route
	 */
	describe('POST /api/departments', () => {
		it('It should create a new department', done => {
			const department = {
				departmentInfo: {
					departmentName: 'Pathology',
					apiKey: 'hhdh3h43438822snnrx37nrhasjgdh',
				},
				departmentContactPerson: {
					contactName: 'Nkemjika Obi',
					email: 'nkemjikaobi@gmail.com',
					telephone: '08062910656',
				},
			};
			chai
				.request(server)
				.post('/api/departments')
				.send(department)
				.end((err, response) => {
					response.should.have.status(200);
					response.body.should.be.a('object');
					response.body.should.have
						.property('message')
						.eq('Department Created');
					response.body.should.have.property('data');
					done();
				});
		});

		it('It should NOT CREATE a new department without the departmentName property', done => {
			const department = {
				departmentInfo: {
					apiKey: 'hhdh3h43438822snnrx37nrhasjgdh',
				},
				departmentContactPerson: {
					contactName: 'Nkemjika Obi',
					email: 'nkemjikaobi@gmail.com',
					telephone: '08062910656',
				},
			};
			chai
				.request(server)
				.post('/api/departments')
				.send(department)
				.end((err, response) => {
					response.should.have.status(500);
					response.body.should.have.property('error').eq('Server Error');
					done();
				});
		});
	});

	/**
	 * Test the PUT route
	 */
	describe('PUT /api/departments/:id', () => {
		it('It should UPDATE an existing department', done => {
			const departmentId = '611461cf2ca5277c5467cbea';
			const department = {
				departmentInfo: {
					departmentName: 'Pathology',
					apiKey: 'hhdh3h43438822snnrx37nrhasjgdh',
				},
				departmentContactPerson: {
					contactName: 'Nkemjika Obi',
					email: 'nkemjikaobi@gmail.com',
					telephone: '08062910656',
				},
			};
			chai
				.request(server)
				.put(`/api/departments/${departmentId}`)
				.send(department)
				.end((err, response) => {
					response.should.have.status(200);
					response.body.should.be.a('object');
					response.body.should.have
						.property('message')
						.eq('Department updated successfully');
					done();
				});
		});

		it('It should NOT UPDATE an existing department without an invalid ID', done => {
			const departmentId = '61144766d74b775d571a8fd1';
			const department = {
				departmentInfo: {
					departmentName: 'Pathology',
					apiKey: 'hhdh3h43438822snnrx37nrhasjgdh',
				},
				departmentContactPerson: {
					contactName: 'Nkemjika Obi',
					telephone: '08062910656',
				},
			};
			chai
				.request(server)
				.put(`/api/departments/${departmentId}`)
				.send(department)
				.end((err, response) => {
					response.should.have.status(404);
					response.body.should.have
						.property('message')
						.eq('Department not found');
					response.body.should.have.property('data').to.deep.equal([]);
					done();
				});
		});
	});

		/**
		 * Test the DELETE route
		 */
		describe('DELETE /api/departments/:id', () => {
			it('It should DELETE an existing department', done => {
				const departmentId = '611461cf2ca5277c5467cbea';
				chai
					.request(server)
					.delete(`/api/departments/${departmentId}`)
					.end((err, response) => {
						response.should.have.status(200);
						response.body.should.have
							.property('message')
							.eq('Department removed successfully');
						done();
					});
			});

			it('It should NOT DELETE an existing department that is not in the database', done => {
				const departmentId = '61144766d74b775d571a8fd1';
				chai
					.request(server)
					.delete(`/api/departments/${departmentId}`)
					.end((err, response) => {
						response.should.have.status(404);
						response.body.should.have
							.property('message')
							.eq('Department not found');
						done();
					});
			});
		});
});
