/**
 * HTML
 * @flow
 */
import React, { Component, PropTypes } from 'react';
import ReactDOMServer from 'react-dom/server';

export default class HTML extends Component {
  static propTypes = {
    lang: PropTypes.string,
    dir: PropTypes.string,
    head: PropTypes.object,
    styles: PropTypes.array,
    scripts: PropTypes.array,
    children: PropTypes.node
  };

  static defaultProps = {
    lang: 'en',
    dir: undefined,
    head: {
      httpEquiv: <meta key="httpEquiv" httpEquiv="X-UA-Compatible" content="IE=edge" />,
      charset: <meta key="charset" charSet="utf-8" />,
      viewport: <meta key="viewport"
        name="viewport"
        content={[
          'width=device-width',
          'height=device-height',
          'initial-scale=1.0',
          'user-scalable=no',
          'minimum-scale=1.0',
          'maximum-scale=1.0'
        ].join(',')}
      />
    },
    styles: [],
    scripts: []
  };

  render() {
    const {
      lang,
      dir,
      head,
      children,
      styles,
      scripts
    } = this.props;
    const meta = { ...HTML.defaultProps.head, ...head };

    return (
      <html lang={lang} dir={dir}>
        <head>
          {Object.keys(meta).map(k => meta[k])}
          {styles}
        </head>
        <body>
          <article id="app"
            dangerouslySetInnerHTML={{ __html:
              ReactDOMServer.renderToString(children)
            }}
          />
          {scripts}
        </body>
      </html>
    );
  }
}
