import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ColourInput from '../../ColourInput';
import { toKeysAndValues, toSentence } from '../../../lib';

import './index.scss';

class JourneyPlanner extends Component {
  constructor() {
    super();
    this.state = {
      data: {},
      journeys: [],
    };
  }

  componentDidMount() {
    const { data, data: { journeys } } = this.props;
    this.setState({ data, journeys });
  }

  setJourneysAndDispatch = ({ journeys }) => {
    this.setState(() => ({ journeys }), () => {
      const { dispatch, action } = this.props;
      const { data, journeys: stateJourneys } = this.state;
      dispatch({
        type: action,
        data,
        journeys: stateJourneys,
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
        journeys: this.state.journeys,
      });
    });
  }

  onChangeJourney = (event, index) => {
    const { id, value } = event.target;
    const journeys = [...this.state.journeys];
    const journey = { ...journeys[index] };
    journey[id] = value;
    journeys[index] = journey;

    this.setJourneysAndDispatch({ journeys });
  }

  onChangeColour = ({ hex }, key, index) => {
    const event = {
      target: {
        id: key,
        value: hex.substring(0, 7),
      },
    };
    this.onChange(event, index);
  }

  addJourney = () => {
    const journeys = [...this.state.journeys];
    journeys.push({
      name: 'Journey Name',
      startPoint: 'lat,long',
      endPoint: 'lat,long',
    });

    this.setJourneysAndDispatch({ journeys });
  }

  removeJourney = (event, journey) => {
    const journeys = this.state.journeys.filter((x) => x !== journey);
    this.setJourneysAndDispatch({ journeys });
  }

  renderItem = ({ key, value, title, onChange, id, index }) => {
    const isColourItem = title.toLowerCase().includes('colour');
    return (
      <div key={key} className='journeys-journey'>
        <span className='journeys-journey-key'>{title}</span>
        {isColourItem
          ? <ColourInput value={value} onChange={(e) => this.onChangeColour(e, key, index)} />
          : <input value={value} onChange={onChange} id={id} />}
      </div>
    );
  }

  renderJourney = (journey, index) => {
    const props = toKeysAndValues(journey);
    const { name } = journey;

    return (
      <div key={index} data-test-id='journey-item'>
        <h4>{name}</h4>
        {props.map(({ key, value }) => (
          this.renderItem({
            key,
            value,
            title: toSentence(key),
            onChange: (e) => this.onChangeJourney(e, index),
            id: key,
            index,
          })
        ))}

        <button className='journeys-journey-remove' onClick={(e) => this.removeJourney(e, journey)} data-test-id='journey-remove-journey'>Remove '{name}'</button>
      </div>
    );
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
          id: key,
        });
      }
    });

    return (
      <div className='journeys' data-test-id='journeys'>
        <h3>{data.title}</h3>
        {items.map((item) => this.renderItem(item))}
        {journeys.map((journey, index) => this.renderJourney(journey, index))}
        <button className='journeys-add' onClick={this.addJourney} data-test-id='journey-add-journey'>Add Journey</button>
      </div>
    );
  }
}

JourneyPlanner.propTypes = {
  action: PropTypes.string,
  data: PropTypes.object,
  dispatch: PropTypes.func,
  journeys: PropTypes.array,
};

export default connect()(JourneyPlanner);
