import React, { Component } from 'react';
import { connect } from 'react-redux';

const toSentence = (text) => {
  const result = text.replace(/([A-Z])/g, " $1")
  return result.charAt(0).toUpperCase() + result.slice(1);
}

class BBCNews extends Component {

  state = {
    data: {}
  }

  componentDidMount() {
    this.setState({ data: this.props.data })
  }

  onChange = (event) => {
    this.setState(prevState => ({
      data: {
        ...prevState.data,
        [event.target.id]: event.target.value,
      }
    }), () => {
      this.props.dispatch({
        type: 'BBC_NEWS',
        data: this.state.data
      })
    })
  }

  render() {
    const { data } = this.state;
    const { title } = data;
    const pairs = [];
    Object.keys(data).forEach((key) => { pairs.push({ key, value: data[key] }) })

    return (
      <>
        <h4>{title || 'Enter Name'}</h4>
        {
          pairs.map((pair) => {
            const { key, value } = pair;
            return (
              <div key={key}>
                <span><strong>{toSentence(key)}</strong></span>
                <input value={value} onChange={this.onChange} id={key} />
              </div>
            )
          })
        }
      </>
    );
  }
}

export default connect()(BBCNews);