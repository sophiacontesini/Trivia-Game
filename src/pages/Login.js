import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { makeLoginAction, getTokenAction } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      buttonDisabled: true,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.isButtonDisabled);
  }

   login = async (e) => {
     e.preventDefault();
     const { name, email } = this.state;
     const { makeFetch, makeLogin, history } = this.props;
     const player = {
       name,
       gravatarEmail: email,
     };

     await makeFetch();
     await makeLogin(player);
     history.push('/play');
   }

  isButtonDisabled = () => {
    const { name, email } = this.state;
    this.setState({
      buttonDisabled: (name === '' || email === ''),
    });
  }

  render() {
    const { buttonDisabled, name, email } = this.state;
    return (
      <form onSubmit={ this.login }>
        <label htmlFor="name">
          Nome do Jogador:
          <input
            type="text"
            id="name"
            name="name"
            value={ name }
            data-testid="input-player-name"
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="email">
          Email do Gravatar:
          <input
            type="email"
            id="email"
            name="email"
            value={ email }
            data-testid="input-gravatar-email"
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="submit"
          data-testid="btn-play"
          disabled={ buttonDisabled }
        >
          Play

        </button>
        <Link to="/Config">
          <button
            type="button"
            data-testid="btn-settings"
          >
            {' '}
            Configurações
          </button>
        </Link>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  makeFetch: () => dispatch(getTokenAction()),
  makeLogin: (player) => dispatch(makeLoginAction(player)),
});

Login.propTypes = {
  makeFetch: PropTypes.func.isRequired,
  makeLogin: PropTypes.func.isRequired,
  history: PropTypes.shape(PropTypes.any).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
