import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ColourInput from '../ColourInput';
import { toKeysAndValues, toSentence } from '../../lib';

import './index.scss';

class BasicItem extends Component {
  constructor() {
    super();
    this.state = {
      data: {},
    };
  }

  componentDidMount() {
    this.setState({ data: this.props.data });
  }

  onChange = (event) => {
    this.setState((prevState) => ({
      data: {
        ...prevState.data,
        [event.target.id]: event.target.value,
      },
    }), () => this.dispatchData());
  }

  onChangeColour = ({ hex }, key) => {
    this.setState((prevState) => ({
      data: {
        ...prevState.data,
        [key]: hex.substring(0, 7),
      },
    }), () => this.dispatchData());
  }

  dispatchData = () => {
    this.props.dispatch({
      type: this.props.action,
      data: this.state.data,
    });
  }

  renderItem = ({ key, value }) => {
    const isColourItem = key.toLowerCase().includes('colour');
    const dataTestId = `basic-item-${key}`;
    return (
      <div key={key} className='basic-item-item'>
        <div className='basic-item-item-key'>{toSentence(key)}</div>
        {isColourItem
          ? <ColourInput value={value} onChange={(e) => this.onChangeColour(e, key)} data-test-id={dataTestId} />
          : <input value={value} onChange={this.onChange} id={key} type={typeof (value)} data-test-id={dataTestId} />}
      </div>
    );
  }

  render() {
    const { data } = this.state;
    const { title } = data;
    const pairs = toKeysAndValues(data);

    return (
      <div className='basic-item' data-test-id='basic-item'>
        <h3>{title || 'Enter Name'}</h3>
        {pairs.map(this.renderItem)}
      </div>
    );
  }
}

BasicItem.propTypes = {
  action: PropTypes.string,
  data: PropTypes.object,
  dispatch: PropTypes.func,
};

export default connect()(BasicItem);
