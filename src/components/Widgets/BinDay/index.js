import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ColourInput from '../../ColourInput';
import { toKeysAndValues, toSentence } from '../../../lib';

class BinDay extends Component {
  state = {
    data: {},
    bins: [],
  }

  componentDidMount() {
    const { data } = this.props;
    this.setState({ data, bins: data.bins });
  }

  setBinsAndDispatch = ({ bins }) => {
    this.setState(() => ({
      bins,
    }), () => {
      const { dispatch, action } = this.props;
      const { data, bins } = this.state;
      dispatch({
        type: action,
        data,
        bins,
      });
    });
  }

  onChange = (event) => {
    this.setState((prevState) => ({
      data: {
        ...prevState.data,
        [event.target.id]: event.target.value,
      },
    }), () => {
      this.props.dispatch({
        type: this.props.action,
        data: this.state.data,
        bins: this.state.bins,
      });
    });
  }

  onChangeBin = (event, index) => {
    const { id, value } = event.target;
    const bins = [...this.state.data.bins];
    const bin = { ...bins[index] };
    bin[id] = value;
    bins[index] = bin;

    this.setBinsAndDispatch({ bins });
  }

  onChangeColour = ({ hex }, key) => {
    if (key.includes('-')) {
      const keyParts = key.split('-');
      const event = {
        target: {
          id: keyParts[0],
          value: hex.substring(0, 7),
        },
      };
      const index = keyParts[1];
      this.onChangeBin(event, index);
    }
    else {
      this.setState((prevState) => ({
        data: {
          ...prevState.data,
          [key]: hex.substring(0, 7),
        },
      }), () => {
        this.props.dispatch({
          type: this.props.action,
          data: this.state.data,
          bins: this.state.bins,
        });
      });
    }
  }

  addBin = () => {
    const today = new Date();
    const month = String(today.getMonth()).padStart(2, '0');

    const bins = [...this.state.bins];
    bins.push({
      binColour: '#FF0000',
      firstDate: `${today.getDate()}-${month}-${today.getFullYear()}`,
      name: 'New Bin',
      repeatRateInDays: 14,
    });

    this.setBinsAndDispatch({ bins });
  }

  removeBin = (event, bin) => {
    const bins = this.state.bins.filter((b) => b !== bin);
    this.setBinsAndDispatch({ bins });
  }

  renderItem = ({ key, value, title, onChange, id }) => {
    const isColourItem = title.toLowerCase().includes('colour');
    return (
      <div key={key}>
        <span className="widget-key">{title}</span>
        {!isColourItem && <input className="widget-value" value={value} onChange={onChange} id={id} />}
        {isColourItem && <ColourInput value={value} onChange={(e) => this.onChangeColour(e, key)} />}
      </div>
    );
  }

  renderBin = ({ bin, index }) => {
    const props = toKeysAndValues(bin);
    const { name } = bin;
    return (
      <div key={index}>
        <h4>Bin ({name})</h4>

        {props.map(({ key, value }) => (
          this.renderItem({
            key: `${key}-${index}`,
            value,
            title: toSentence(key),
            onChange: (e) => this.onChangeBin(e, index),
            id: key,
          })
        ))}

        <button className="remove-button" onClick={(e) => this.removeBin(e, bin)}>Remove '{name}'</button>
      </div>
    );
  }

  render() {
    const { data, bins } = this.state;
    const items = [];
    Object.keys(data).forEach((key) => {
      if (key !== 'bins') {
        items.push({
          key,
          value: data[key],
          title: toSentence(key),
          onChange: this.onChange,
          id: key,
        });
      }
    });

    return (
      <div className="bin-day">
        <h3>{data.title}</h3>
        {items.map((item) => this.renderItem(item))}
        {bins.map((bin, index) => this.renderBin({ bin, index }))}
        <p><button className="add-button" onClick={this.addBin}>Add New Bin</button></p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  bins: state.config.widgets.binDay.bins,
  data: state.config.widgets.binDay,
});

BinDay.propTypes = {
  data: PropTypes.object,
  dispatch: PropTypes.func,
  action: PropTypes.string,
};

export default connect(mapStateToProps)(BinDay);
