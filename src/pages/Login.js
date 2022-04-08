import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
       <div className=" flex h-screen ">
         <div className=" m-auto">
           <form
             onSubmit={ this.login }
             className=" shadow-md bg-green-100  rounded px-8 pt-6 pb-8 mb-4"
           >
             <label htmlFor="name" className="block text-gray-700 text-md  mb-2">
               Nome do Jogador:
               <input
                 className='class="shadow appearance-none border rounded w-full py-2 px-3 mt-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" '
                 type="text"
                 id="name"
                 name="name"
                 value={ name }
                 data-testid="input-player-name"
                 onChange={ this.handleChange }
               />
             </label>
             <label htmlFor="email" className="">
               Email do Gravatar:
               <input
                 className="shadow appearance-none border rounded w-full py-2 px-3 mt-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                 className='bg-green-500 hover:bg-green-700 my-4  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"'
                 type="submit"
                 data-testid="btn-play"
                 disabled={ buttonDisabled }
               >
                 Jogar!
               </button>
             </div>
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
