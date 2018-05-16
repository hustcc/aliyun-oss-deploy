/**
 * Created by hustcc on 18/5/10.
 * Contract: i@hust.cc
 */

const { h, render, Component, Color } = require('ink');
const Link = require('ink-link');

module.exports = class Deploy extends Component {
  constructor(props) {
    super(props);

    this.state = {
      i: 0,
      results: [],
    };
  }

  fileList() {
    const { results } = this.state;

    return results.map(r => {
      const props = (r.res && r.res.status === 200) ? { green: true } : { red: true };
      return h(
        'div',
        {},
        h(
          Color,
          props,
          r.url,
        )
      );
    })
  }

  poweredBy() {
    return h(
      'div',
      {},
      [
        'Powered by ',
        h(Link, {
          url: 'https://github.com/hustcc/aliyun-oss-deploy'
        }, 'aliyun-oss-deploy'),
        '.'
      ]
    );
  }

  count() {
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
        ),
      ]
    );
  }

  render() {
    // 显示成功个数
    return h(
      'div',
      {},
      [
        this.fileList(),
        '\n',
        this.count(),
        this.poweredBy(),
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
    }, 100);
  }

  componentDidMount() {
    this.process();
  }

  componentWillUnmount() {
  }
};
