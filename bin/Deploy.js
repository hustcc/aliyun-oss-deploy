/**
 * Created by hustcc on 18/5/10.
 * Contract: i@hust.cc
 */

const { h, render, Component, Color } = require('ink');

module.exports = class Deploy extends Component {
  constructor(props) {
    super(props);

    this.state = {
      i: 0,
      results: [],
    };
  }

  render() {
    const { results } = this.state;
    const success = results.filter(r => r && r.res && (r.res.status === 200)).length;
    const error = results.length - success;

    // 显示成功个数
    return h(
      'div',
      {},
      [
        h(
          Color,
          { green: true },
          `${success} success.`,
        ),
        ' ',
        h(
          Color,
          { red: true },
          `${error} fail.`,
        )
      ]
    );
  }

  async process() {
    const { dg, onExit } = this.props;

    for (const r of dg) {
      const result = await r;
      const results = this.state.results;

      this.setState({
        results: [...results, result],
      });
    }
    setTimeout(() => {
      onExit();
    }, 10);
  }

  componentDidMount() {
    this.process();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }
};
