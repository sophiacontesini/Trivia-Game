import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { name, score, email } = this.props;
    const hash = md5(email).toString();
    return (
      <header
        className="bg-green-100 w-full flex justify-between  mx-auto px-2 h-20 text-md"
      >
        <img src={ `https://www.gravatar.com/avatar/${hash}` } alt="Imagem do usuário" className="rounded-full " data-testid="header-profile-picture" />
        <p data-testid="header-player-name" className="text-xl">

          {' '}
          { name }
        </p>
        <p data-testid="header-score" className="text-lg">
          Pontuação:
          {' '}
          { score }
        </p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
  email: state.player.gravatarEmail,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
