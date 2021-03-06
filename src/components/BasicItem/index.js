import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ColourInput from '../ColourInput';
import { toKeysAndValues, toSentence } from '../../lib';

class BasicItem extends Component {
  state = {
    data: {},
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
    return (
      <div key={key}>
        <span className="widget-key">{toSentence(key)}</span>
        {!isColourItem && <input className="widget-value" value={value} onChange={this.onChange} id={key} type={typeof (value)} />}
        {isColourItem && <ColourInput value={value} onChange={(e) => this.onChangeColour(e, key)} />}
      </div>
    );
  }

  render() {
    const { data } = this.state;
    const { title } = data;
    const pairs = toKeysAndValues(data);

    return (
      <div className="basic">
        <h3>{title || 'Enter Name'}</h3>
        {pairs.map((pair) => this.renderItem(pair))}
      </div>
    );
  }
}

BasicItem.propTypes = {
  data: PropTypes.object,
  dispatch: PropTypes.func,
  action: PropTypes.string,
};

export default connect()(BasicItem);
