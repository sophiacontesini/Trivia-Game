import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateConfigAction } from '../redux/actions';
import './css/ranking.css';
import './css/config.css';

class Config extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      difficulties: [],
      types: [],
      configs: {
        category: false,
        difficulty: false,
        type: false,
      },
    };
  }

  componentDidMount = async () => {
    const response = await fetch('https://opentdb.com/api_category.php');
    const { trivia_categories: categories } = await response.json();
    this.setState({
      categories: [
        { id: false, name: 'Any Category' },
        ...categories,
      ],
      difficulties: [
        { id: false, name: 'Any Difficulty' },
        { id: 'easy', name: 'Easy' },
        { id: 'medium', name: 'Medium' },
        { id: 'hard', name: 'Hard' },
      ],
      types: [
        { id: false, name: 'Any Type' },
        { id: 'multiple', name: 'Multiple Choice' },
        { id: 'boolean', name: 'True/False' },
      ],
    });
  }

  mountOptions = (options) => (
    options.map(({ id, name }) => (
      <option key={ id } value={ id }>{name}</option>
    ))
  )

  mountConfig = (legend, id, options) => (
    <fieldset>
      <legend>{ legend }</legend>
      <select id={ id } onChange={ this.handleChange }>
        { this.mountOptions(options) }
      </select>
    </fieldset>
  )

  handleChange = () => {
    const getValue = (id) => {
      const { value } = document.querySelector(`#${id}`);
      return value !== 'false' ? value : false;
    };

    const category = getValue('category-select');
    const difficulty = getValue('difficulty-select');
    const type = getValue('type-select');
    this.setState({
      configs: {
        category,
        difficulty,
        type,
      },
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { updateConfig, history } = this.props;
    const { configs } = this.state;
    updateConfig(configs);
    history.push('/');
  }

  render() {
    const { categories, difficulties, types } = this.state;
    return (
      <div className="config">
        <h1 className="title-config" data-testid="settings-title">
          Configurações
        </h1>
        <form className="form-container" onSubmit={ this.handleSubmit }>
          <div className="configs-container">
            { this.mountConfig('Categoria', 'category-select', categories) }
            { this.mountConfig('Dificuldade', 'difficulty-select', difficulties) }
            { this.mountConfig('Tipo', 'type-select', types) }
          </div>
          <button type="submit">Salvar</button>
        </form>
        <Link to="/">
          <button
            className="login-page"
            type="button"
            data-testid="btn-settings"
          >
            {' '}
            Login
          </button>
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateConfig: (config) => dispatch(updateConfigAction(config)),
});

Config.propTypes = {
  updateConfig: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

export default connect(null, mapDispatchToProps)(Config);
