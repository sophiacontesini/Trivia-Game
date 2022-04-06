import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { savePlayerInfos } from '../redux/actions';

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

   handleClick = (event) => {
     event.preventDefault();
     const { name, email } = this.state;
     const { history, playerInfos } = this.props;
     playerInfos(name, email);
     history.push('/game');
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
           onClick={ this.handleClick }
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
  playerInfos: (name, email) => dispatch(savePlayerInfos(name, email)),
});

Login.propTypes = {
  playerInfos: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
