import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../assets/css/login.css';
import { getTokenAction, makeLoginAction } from '../redux/actions';

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
       <div
         className="login flex justify-center items-center h-screen mt-42 text-white   "
       >
         <div className="flex   justify-between bg-teal-600 p-6">
           <form
             onSubmit={ this.login }
             className="bg-green-100 opacity-90 flex-row rounded"
           >
             <label
               htmlFor="name"
               className="ml-4 block text-gray-700 justify-center text-lg  mb-2"
             >
               Nome do Jogador:
               <input
                 className="shadow appearance-none border rounded
                 w-full py-2 px-3 mt-2 text-gray-700 leading-tight focus:outline-none
                  focus:shadow-outline"
                 type="text"
                 id="name"
                 name="name"
                 value={ name }
                 data-testid="input-player-name"
                 onChange={ this.handleChange }
               />
             </label>
             <label
               htmlFor="email"
               className="text-gray-700 ml-4 text-lg justify-center  "
             >
               Email:
               <input
                 className="shadow appearance-none border rounded w-full py-2
                 px-3 mt-2 text-gray-700 leading-tight focus:outline-none
                  focus:shadow-outline"
                 type="email"
                 id="email"
                 name="email"
                 value={ email }
                 data-testid="input-gravatar-email"
                 onChange={ this.handleChange }
               />
             </label>
             <div className="flex justify-center">
               <button
                 className='bg-green-500 hover:bg-green-700 my-4
                 text-white font-bold
                 py-2 px-4 rounded focus:outline-none focus:shadow-outline"'
                 type="submit"
                 data-testid="btn-play"
                 disabled={ buttonDisabled }
               >
                 Jogar!
               </button>

             </div>
             <Link to="/config">
               <button
                 className="text-blue-700"
                 type="button"
                 data-testid="btn-settings"
               >
                 {' '}
                 Configurações
               </button>
             </Link>
           </form>

         </div>
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
  history: PropTypes.shape({ push: PropTypes.func.isRequired }),
};

export default connect(null, mapDispatchToProps)(Login);
