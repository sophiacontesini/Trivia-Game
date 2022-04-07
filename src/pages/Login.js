import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
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

   isButtonDisabled = () => {
     const { name, email } = this.state;
     this.setState({
       buttonDisabled: (name === '' || email === ''),
     });
   }

   login = async (e) => {
     e.preventDefault();
     const { name, email } = this.state;
     const { makeFetch, makeLogin, history } = this.props;

     await makeFetch();
     await makeLogin(name, email);
     history.push('/play');
   }

   render() {
     const { buttonDisabled, name, email } = this.state;
     return (
       <div>
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
         </form>
         <Link to="/config">
           <button
             type="button"
             data-testid="btn-settings"
           >
             {' '}
             Configurações
           </button>
         </Link>
       </div>
     );
   }
}

const mapDispatchToProps = (dispatch) => ({
  makeFetch: () => dispatch(getTokenAction()),
  makeLogin: (name, email) => dispatch(makeLoginAction(name, email)),
});

Login.defaultProps = {
  history: {},
};

Login.propTypes = {
  makeFetch: PropTypes.func.isRequired,
  makeLogin: PropTypes.func.isRequired,
  history: PropTypes.shape(PropTypes.any),
};

export default connect(null, mapDispatchToProps)(Login);
