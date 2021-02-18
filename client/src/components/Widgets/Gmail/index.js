import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toKeysAndValues, toSentence } from '../../../lib';
import './index.scss';

class Gmail extends Component {

  state = {
    data: []
  }

  componentDidMount() {
    this.setState({ data: this.props.data })
  }

  setDataAndDispatch = ({ data }) => {
    this.setState(prevState => ({
      data
    }), () => {
      const { dispatch, action } = this.props;
      const { data } = this.state;
      dispatch({
        type: action,
        data
      })
    })
  }

  onChangeGmail = (event, index) => {
    const { id, value } = event.target;
    let data = [...this.state.data];
    let gmail = { ...data[index] };
    gmail[id] = value;
    data[index] = gmail;

    this.setDataAndDispatch({ data });
  }

  addGmail = () => {
    const data = [...this.state.data];
    data.push({
      apiKey: "<api key>",
      colour: "#4285F4",
      gmailAddress: "<your email>@gmail.com",
      numberOfEvents: 25,
      repeatRate: 3,
      repeatTime: "hours",
      sleepEnd: "07:00",
      sleepStart: "22:30",
      textColour: "#FFFFFF",
      title: "Your Calendar",
      titleColour: "#FFFFFF",
    });

    this.setDataAndDispatch({ data });
  }

  removeGmail = (event, gmail) => {
    const data = this.state.data.filter(x => x !== gmail);
    this.setDataAndDispatch({ data });
  }

  renderItem = ({ key, value, title, onChange, id }) => (
    <div key={key}>
      <span className='widget-key'>{title}</span>
      <input className='widget-value' value={value} onChange={onChange} id={id} />
    </div>
  )

  renderGmail = (gmail, index) => {
    const props = toKeysAndValues(gmail);

    const { gmailAddress } = gmail;
    return (
      <div key={index}>
        <h4>{gmailAddress}</h4>
        {props.map(({ key, value }) => (
          this.renderItem({
            key,
            value,
            title: toSentence(key),
            onChange: (e) => this.onChangeGmail(e, index),
            id: key
          })
        ))}

        <button className='gmail-remove-button' onClick={(e) => this.removeGmail(e, gmail)}>Remove '{gmailAddress}'</button>
      </div>
    )
  }

  render() {
    const { data } = this.state;

    return (
      <div className='gmail'>
        <h3>Gmail</h3>
        {data.map((item, index) => this.renderGmail(item, index))}
        <p><button className='gmail-add-button' onClick={this.addGmail}>Add Gmail</button></p>
      </div>
    );
  }
}

export default connect()(Gmail);