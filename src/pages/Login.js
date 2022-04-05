import React from 'react';
import { Link } from 'react-router-dom';

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

  isButtonDisabled = () => {
    const { name, email } = this.state;
    this.setState({
      buttonDisabled: (name === '' || email === ''),
    });
  }

  render() {
    const { buttonDisabled, name, email } = this.state;
    return (
      <form>
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

export default Login;
