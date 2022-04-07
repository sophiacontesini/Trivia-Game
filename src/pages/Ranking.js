import React, { Component } from 'react';
import { connect } from 'react-redux';

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
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <ul>
          { players.map(({ name, score, picture }, index) => (
            <li key={ index }>
              <img src={ picture } alt="Imagem do usuário" />
              <p data-testid={ `player-name-${index}` }>{ name }</p>
              <p data-testid={ `player-score-${index}` }>{ score }</p>
            </li>
          )) }
        </ul>
      </div>
    );
  }
}

// const mapStateToProps = (state) => ({});

// const mapDispatchToProps = {};

export default connect()(Ranking);
