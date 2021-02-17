import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toKeysAndValues, toSentence } from '../../../lib';
import './index.scss';

class BinDayWidget extends Component {

  state = {
    data: {},
    bins: []
  }

  componentDidMount() {
    const { data } = this.props;
    this.setState({ data, bins: data.bins })
  }

  setBinsAndDispatch = ({ bins }) => {
    this.setState(prevState => ({
      bins
    }), () => {
      const { dispatch, action } = this.props;
      const { data, bins } = this.state;
      dispatch({
        type: action,
        data: data,
        bins: bins
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
        bins: this.state.bins
      })
    })
  }

  onChangeBin = (event, index) => {
    const { id, value } = event.target;
    let bins = [...this.state.data.bins];
    let bin = { ...bins[index] };
    bin[id] = value;
    bins[index] = bin;

    this.setBinsAndDispatch({ bins });
  }

  addBin = () => {
    const today = new Date();
    const month = String(today.getMonth()).padStart(2, '0');

    const bins = [...this.state.bins];
    bins.push({
      binColour: '#FF0000',
      firstDate: `${today.getDate()}-${month}-${today.getFullYear()}`,
      name: 'New Bin',
      repeatRateInDays: 14
    });

    this.setBinsAndDispatch({ bins });
  }

  removeBin = (event, bin) => {
    const bins = this.state.bins.filter(b => b !== bin);
    this.setBinsAndDispatch({ bins });
  }

  renderItem = ({ key, value, title, onChange, id }) => (
    <div key={key}>
      <span className='widget-key'>{title}</span>
      <input className='widget-value' value={value} onChange={onChange} id={id} />
    </div>
  )

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
            id: key
          })
        ))}

        <button className='bin-day-remove-button' onClick={(e) => this.removeBin(e, bin)}>Remove '{name}'</button>
      </div>
    )
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
          id: key
        })
      }
    })

    return (
      <div className='bin-day'>
        <h3>Bin Day</h3>
        {items.map((item) => this.renderItem(item))}
        {bins.map((bin, index) => this.renderBin({ bin, index }))}
        <p><button className='bin-day-add-button' onClick={this.addBin}>Add New Bin</button></p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  bins: state.config.widgets.binDay.bins,
  data: state.config.widgets.binDay
})

export default connect(mapStateToProps)(BinDayWidget);