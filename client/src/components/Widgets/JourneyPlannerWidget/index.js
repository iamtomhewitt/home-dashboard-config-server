import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toKeysAndValues, toSentence } from '../../../lib';
import './index.scss';

class JourneyPlannerWidget extends Component {

  state = {
    data: {},
    journeys: []
  }

  componentDidMount() {
    this.setState({ data: this.props.data, journeys: this.props.data.journeys })
  }

  setJourneysAndDispatch = ({ journeys }) => {
    this.setState(prevState => ({
      journeys
    }), () => {
      const { dispatch, action } = this.props;
      const { data, journeys } = this.state;
      dispatch({
        type: action,
        data,
        journeys
      })
    })
  }

  onChange = (event) => {
    this.setState(prevState => ({
      data: {
        ...prevState.data,
        [event.target.id]: event.target.value,
      },
    }), () => {
      this.props.dispatch({
        type: this.props.action,
        data: this.state.data,
        journeys: this.state.journeys
      })
    })
  }

  onChangeJourney = (event, index) => {
    const { id, value } = event.target;
    let journeys = [...this.state.journeys];
    let journey = { ...journeys[index] };
    journey[id] = value;
    journeys[index] = journey;

    this.setJourneysAndDispatch({ journeys });
  }

  addJourney = () => {
    const journeys = [...this.state.journeys];
    journeys.push({
      name: "Journey Name",
      startPoint: "lat,long",
      endPoint: "lat,long",
    });

    this.setJourneysAndDispatch({ journeys });
  }

  removeJourney = (event, journey) => {
    const journeys = this.state.journeys.filter(x => x !== journey);
    this.setJourneysAndDispatch({ journeys });
  }

  renderItem = ({ key, value, title, onChange, id }) => (
    <div key={key}>
      <span className='widget-key'>{title}</span>
      <input className='widget-value' value={value} onChange={onChange} id={id} />
    </div>
  )

  renderJourney = (journey, index) => {
    const props = toKeysAndValues(journey);

    const { name } = journey;
    return (
      <div key={index}>
        <h4>{name}</h4>
        {props.map(({ key, value }) => (
          this.renderItem({
            key,
            value,
            title: toSentence(key),
            onChange: (e) => this.onChangeJourney(e, index),
            id: key
          })
        ))}

        <button className='journey-remove-button' onClick={(e) => this.removeJourney(e, journey)}>Remove '{name}'</button>
      </div>
    )
  }

  render() {
    const { data, journeys } = this.state;
    const items = [];
    Object.keys(data).forEach((key) => {
      if (key !== 'journeys') {
        items.push({
          key,
          value: data[key],
          title: toSentence(key),
          onChange: this.onChange,
          id: key
        })
      }
    })

    return (
      <div className='journey'>
        <h3>{data.title}</h3>
        {items.map((item) => this.renderItem(item))}
        {journeys.map((journey, index) => this.renderJourney(journey, index))}
        <p><button className='journey-add-button' onClick={this.addJourney}>Add Journey</button></p>
      </div>
    );
  }
}

export default connect()(JourneyPlannerWidget);