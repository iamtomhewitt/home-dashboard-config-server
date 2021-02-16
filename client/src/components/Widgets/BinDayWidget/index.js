import React, { Component } from 'react';
import { connect } from 'react-redux';

const toSentence = (text) => {
  const result = text.replace(/([A-Z])/g, " $1")
  return result.charAt(0).toUpperCase() + result.slice(1);
}

class BinDayWidget extends Component {

  state = {
    data: {},
    bins: []
  }

  componentDidMount() {
    const { data } = this.props;
    this.setState({ data, bins: data.bins })
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
    let newBins = [...this.state.data.bins];
    let bin = { ...newBins[index] };
    bin[id] = value;
    newBins[index] = bin;

    this.setState(prevState => ({
      bins: newBins
    }), () => {
      this.props.dispatch({
        type: this.props.action,
        data: this.state.data,
        bins: this.state.bins
      })
    })
  }

  renderItem = ({ key, value }) => (
    <div key={key}>
      <span className='widget-key'><strong>{toSentence(key)}</strong></span>
      <input className='widget-value' value={value} onChange={this.onChange} id={key} />
    </div>
  )

  renderBin = ({ bin: { binColour, firstDate, name, repeatRateInDays }, index }) => {
    return (
      <div key={index}>
        <h5>Bin ({name})</h5>
        <span>
          <span className='widget-key'><strong>Bin Colour</strong></span>
          <input className='widget-value' value={binColour} onChange={(e) => this.onChangeBin(e, index)} id='binColour' />
        </span>
        <span>
          <span className='widget-key'><strong>First Date</strong></span>
          <input className='widget-value' value={firstDate} onChange={(e) => this.onChangeBin(e, index)} id='firstDate' />
        </span>
        <span>
          <span className='widget-key'><strong>Name</strong></span>
          <input className='widget-value' value={name} onChange={(e) => this.onChangeBin(e, index)} id='name' />
        </span>
        <span>
          <span className='widget-key'><strong>Repeat Rate In Days</strong></span>
          <input className='widget-value' value={repeatRateInDays} onChange={(e) => this.onChangeBin(e, index)} id='repeatRateInDays' />
        </span>
      </div>
    )
  }

  render() {
    const { data, bins } = this.state;
    const pairs = [];
    Object.keys(data).forEach((key) => { if (key !== 'bins') { pairs.push({ key, value: data[key] }) } })

    return (
      <div>
        <h4>Bin Day</h4>
        {pairs.map((pair) => this.renderItem(pair))}
        {bins.map((bin, index) => this.renderBin({ bin, index }))}

        {/* TODO add remove button */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  bins: state.config.widgets.binDay.bins,
  data: state.config.widgets.binDay
})

export default connect(mapStateToProps)(BinDayWidget);