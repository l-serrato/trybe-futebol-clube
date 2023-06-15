import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import * as jwt from 'jsonwebtoken';

import { app } from '../app';
import Team from '../database/models/teams';
import { teams, team1 } from './mocks/Teams.mock'
import User from '../database/models/users';
import { user, token, validLogin, invalidLogin} from './mocks/Users.mock'; 
import Match from '../database/models/matches';
import { match } from 'assert';

// import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Seu teste', () => {
  afterEach(sinon.restore);
  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });

  it('should return all teams', async function() {
    sinon.stub(Team, 'findAll').resolves(teams as any);

    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(teams);
  });

  it('should return a team by id', async function() {
    sinon.stub(Team, 'findOne').resolves(teams as any);

    const { status, body } = await chai.request(app).get('/teams/1');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(team1);
  });

  it('should return not found if the team doesn\'t exists', async function() {
    sinon.stub(Team, 'findOne').resolves(null);

    const { status, body } = await chai.request(app).get('/teams/102');

    expect(status).to.equal(404);
    expect(body.message).to.equal('Team 102 not found');
  });

  it('valid login post /login', async () => {
    sinon.stub(User, 'findOne').resolves(user as any);
    sinon.stub(jwt, 'sign').resolves(token);
    const response = await chai.request(app).post('/login').send(validLogin);
    expect(response.status).to.be.eq(200);
    expect(response.body.token).to.be.deep.eq(token);
  });


  it('invalid login post /login', async () => {
    sinon.stub(User, 'findOne').resolves(validLogin as any);
    const response = await chai.request(app).post('/login').send(invalidLogin);
    expect(response.status).to.be.eq(401);
    expect(response.body.message).to.be.deep.eq('Invalid email or password');
  });

  it('should change a match score', async function() {
    sinon.stub(Match, 'update').resolves([1] as any);
    sinon.stub(Match, 'findByPk').resolves(match as any);
    sinon.stub(jwt, 'verify').resolves();

    const { status, body } = await chai
      .request(app)
      .patch('/matches/1/')
      .set('authorization', 'validToken')
      .send({ homeTeamGoals: '3', awayTeamGoals: '1' });

    expect(status).to.equal(200);
    expect(body.message).to.equal('Updated');
  });

  it('should return not found when the book to discount does not exists', async function() {
    sinon.stub(SequelizeBook, 'findByPk').resolves(null);
    sinon.stub(JWT, 'verify').resolves();

    const { status, body } = await chai
      .request(app)
      .patch('/books/1/discount')
      .set('authorization', 'validToken')
      .send({ discount: '5' });

    expect(status).to.equal(404);
    expect(body.message).to.equal('Book 1 not found');
  });

  it('should return a book by author', async function() {
    sinon.stub(SequelizeBook, 'findAll').resolves(books as any);

    const { status, body } = await chai
      .request(app)
      .get('/books/author/search?q=Author');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(books);
  });

  it('should return not found when there is no books by author', async function() {
    sinon.stub(SequelizeBook, 'findAll').resolves([] as any);

    const { status, body } = await chai
      .request(app)
      .get('/books/author/search?q=Jon');

    expect(status).to.equal(404);
    expect(body.message).to.equal('Author Jon not found');
  });

  afterEach(sinon.restore);

 /*  it('Seu sub-teste', () => {
    expect(false).to.be.eq(true);
  }); */
});
