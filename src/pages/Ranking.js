import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './css/ranking.css';

class Ranking extends Component {
  constructor() {
    super();
    this.state = {
      players: [],
    };
  }

  componentDidMount() {
    const players = JSON.parse(localStorage.getItem('ranking')) || [];
    players.sort((a, b) => (b.score - a.score));
    this.setState({ players });
  }

  render() {
    const { players } = this.state;
    return (
      <div className="ranking">
        <h1 data-testid="ranking-title" className="ranking-title">Ranking</h1>
        <ul className="ranking-list">
          { players.map(({ name, score, picture }, index) => (
            <li key={ index } className="ranking-item">
              <img src={ picture } alt="Imagem do usuário" className="player_image" />
              <p data-testid={ `player-name-${index}` }>{ name }</p>
              <p data-testid={ `player-score-${index}` }>{ score }</p>
            </li>
          )) }
        </ul>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-go-home"
            className="bg-blue-500 hover:bg-blue-6g00 text-gray-800
          font-semibold py-2 px-4 home rounded shadow"
          >
            Home

          </button>
        </Link>
      </div>
    );
  }
}

export default connect()(Ranking);
