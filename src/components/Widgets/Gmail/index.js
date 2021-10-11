import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ColourInput from '../../ColourInput';
import { toKeysAndValues, toSentence } from '../../../lib';

import './index.scss';

class Gmail extends Component {
  state = {
    data: [],
  }

  componentDidMount() {
    this.setState({ data: this.props.data });
  }

  setDataAndDispatch = ({ data }) => {
    this.setState(() => ({
      data,
    }), () => {
      const { dispatch, action } = this.props;
      const { data } = this.state;
      dispatch({
        type: action,
        data,
      });
    });
  }

  onChangeGmail = (event, index) => {
    const { id, value } = event.target;
    const data = [...this.state.data];
    const gmail = { ...data[index] };
    gmail[id] = value;
    data[index] = gmail;

    this.setDataAndDispatch({ data });
  }

  onChangeColour = ({ hex }, key, index) => {
    const event = {
      target: {
        id: key,
        value: hex.substring(0, 7),
      },
    };
    this.onChangeGmail(event, index);
  }

  addGmail = () => {
    const data = [...this.state.data];
    data.push({
      apiKey: '<api key>',
      colour: '#4285F4',
      gmailAddress: '<your email>@gmail.com',
      numberOfEvents: 25,
      repeatRate: 3,
      repeatTime: 'hours',
      sleepEnd: '07:00',
      sleepStart: '22:30',
      textColour: '#FFFFFF',
      title: 'Your Calendar',
      titleColour: '#FFFFFF',
    });

    this.setDataAndDispatch({ data });
  }

  removeGmail = (event, gmail) => {
    const data = this.state.data.filter((x) => x !== gmail);
    this.setDataAndDispatch({ data });
  }

  renderItem = ({ key, value, title, onChange, id, index }) => {
    const isColourItem = title.toLowerCase().includes('colour');
    return (
      <div key={key}>
        <span className="gmail-item-key">{title}</span>
        {isColourItem
          ? <ColourInput value={value} onChange={(e) => this.onChangeColour(e, key, index)} />
          : <input className="widget-value" value={value} onChange={onChange} id={id} />}
      </div>
    );
  }

  renderGmail = (gmail, index) => {
    const props = toKeysAndValues(gmail);
    const { gmailAddress } = gmail;

    return (
      <div key={index} className="gmail-item">
        <h4>{gmailAddress}</h4>
        {props.map(({ key, value }) => (
          this.renderItem({
            key,
            value,
            title: toSentence(key),
            onChange: (e) => this.onChangeGmail(e, index),
            id: key,
            index,
          })
        ))}

        <button className="gmail-item-remove" onClick={(e) => this.removeGmail(e, gmail)}>Remove '{gmailAddress}'</button>
      </div>
    );
  }

  render() {
    const { data } = this.state;

    return (
      <div className="gmail">
        <h3>Gmail</h3>
        {data.map((item, index) => this.renderGmail(item, index))}
        <button className="gmail-add" onClick={this.addGmail}>Add Gmail</button>
      </div>
    );
  }
}

Gmail.propTypes = {
  data: PropTypes.array,
  dispatch: PropTypes.func,
  action: PropTypes.string,
};

export default connect()(Gmail);
