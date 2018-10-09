import React from 'react';

import './Upvotes.css';

class Upvotes extends React.Component {
  render () {
    const { potholeId } = this.props;

    const getUpvoteCount = () => {
      return 5;
    };

    let upvoteCount = getUpvoteCount();
    return (
      <div className="col-xs-12">
        <p>
          {upvoteCount}
          <span className="glyphicon glyphicon-arrow-up" aria-hidden="true"></span>
        </p>
      </div>
    );

  }
}

export default Upvotes;
