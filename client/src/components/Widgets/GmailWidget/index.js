import React, { Component } from 'react';
import { connect } from 'react-redux';
import './index.scss';

// TODO move to a selector / lib
const toSentence = (text) => {
  const result = text.replace(/([A-Z])/g, " $1")
  return result.charAt(0).toUpperCase() + result.slice(1);
}

class GmailWidget extends Component {

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
      {/* TODO these css classes can probably be at the App/index.scss level as they are the same throughout */}
      <span className='widget-key'>{title}</span>
      <input className='widget-value' value={value} onChange={onChange} id={id} />
    </div>
  )

  renderGmail = (gmail, index) => {
    // TODO this is used everywhere, make a selector
    const arr = []
    Object.keys(gmail).forEach((key) => { if (key !== '_id') { arr.push({ key, value: gmail[key] }) } });

    const { gmailAddress } = gmail;
    return (
      <div key={index}>
        <h4>{gmailAddress}</h4>
        {arr.map(({ key, value }) => (
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

export default connect()(GmailWidget);