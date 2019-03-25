
import React from 'react';
import PropTypes from 'prop-types';

/* eslint-disable react/no-danger */

class Html extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    styles: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        cssText: PropTypes.string.isRequired,
      }).isRequired,
    ),
    scripts: PropTypes.arrayOf(PropTypes.string.isRequired),
    app: PropTypes.object, // eslint-disable-line
    children: PropTypes.string.isRequired,
  };

  static defaultProps = {
    styles: [],
    scripts: [],
  };

  render() {
    const { title, description, styles, scripts, app, children } = this.props;
    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta name="description" content={description} />
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
          <meta name="robots" content="INDEX,FOLLOW" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
         <title>{title}</title>
        </head>
        <body>
          <div id="app" dangerouslySetInnerHTML={{ __html: children }} />
        </body>
        {scripts.map(script => (
          <script key={script} src={script} />
        ))}
      </html>
    );
  }
}

export default Html;