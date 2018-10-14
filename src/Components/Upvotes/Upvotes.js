import React from 'react';

import upvoteRequests from '../../firebaseRequests/upvoteRequests';
import auth from '../../firebaseRequests/auth';

import './Upvotes.css';

class Upvotes extends React.Component {
  state = {
    singlePothole: {},
  }

  componentWillMount () {
    const { details } = this.props;
    upvoteRequests
      .upvoteGET(details.id)
      .then(singlePotholeResponse => {
        this.setState({
          singlePothole: singlePotholeResponse,
          loggedInUser: auth.fbGetUid(),
        });
      })
      .catch(err => console.error('Error with upvote get request: ', err));
  };

  // users cannot up/downvote more than once
  // users who created pothole cannot up/downvote more than once

  getUpvoteCount = () => {
    if (this.state !== null) {
      return this.state.singlePothole.upvoteCount;
    }
    else {
      return "N/A";
    }
  };

  // const modifyUpDownVotes = e => {
  //   // modifier should be a 1 or -1 only
  //   let canUpvote = false;
  //   console.log(e);
  // if (details !== null &&
  //   (modifier === -1 || modifier === 1)) {
  //   canUpvote = verifyUpvoteCapability();
  // }
  // if (canUpvote) {
  //   let existingUpvotes = upvoteRequests.upvoteGET(details.upvoteCount);
  //   existingUpvotes += modifier;
  //   details.upvoteCount = existingUpvotes;
  //   upvoteRequests.upvotePUT(details.id, existingUpvotes);
  // }
  // };

  render () {
    const upvoteCount = this.state.singlePothole.upvoteCount;

    const verifyVoteCapability = voteType => {
      const upvoters = Object.values(this.state.singlePothole.upvoteUserIds);
      const downvoters = Object.values(this.state.singlePothole.downvoteUserIds);
      const loggedInUser = this.state.loggedInUser;
      let canVote = true;

      if (voteType === "span-dn-vote") {
        for (let d in downvoters) {
          if (d === loggedInUser) {
            canVote = false;
          }
        }
      } else if (voteType === "span-up-vote") {
        for (let u in upvoters) {
          if (u === loggedInUser) {
            canVote = false;
          }
        }
      } else {
        canVote = false;
      };
      return canVote;
    };

    //TODO
    // check if user can upvote/downvote
    // let upvoteObject = upvoteRequests.upvoteGET(details);
    // if user exists in upvoteUserIds, can only downvote
    // if user exists in downvoteuserIds, can only upvote
    // if user does not exist in either, they can
    //    upvote or downvote
    // special considerations for the creator of the pothole?

    // const updateState = () => {

    // };

    const modifyUpDownVotes = e => {
      console.log(e.target);
      const voteCapability = verifyVoteCapability(e.target.id);
      if (voteCapability && e.target.id === "span-dn-vote") {
        // make a downvote
        const temp = this.state.singlePothole;
        temp.upvoteCount = temp.upvoteCount - 1;
        // add to downvote object
        console.log('this.state.singlepothole',this.state.singlePothole);
        console.log('temp', temp);
        return new Promise((resolve, reject) => {
          upvoteRequests
            .upvotePUT(temp.firebaseId, temp)
            .then(res => {
              this.setState({
                singlePothole: res.data,
              });
              return upvoteRequests.upvoteGET(this.state.firebaseId);
            })
            .then(updatedState => {
              console.log('updatedstate', updatedState);
              this.setState({
                singlePothole: updatedState,
              });
              resolve (updatedState);
            })
            .catch(err => {
              reject (err);
            });
        });
      } else if (voteCapability && e.target.id === "span-up-vote") {
        // make an upvote
        const temp = this.state.singlePothole;
        temp.upvoteCount = temp.upvoteCount + 1;
        // add to downvote object
        upvoteRequests.upvotePUT(this.state.firebaseId, temp);
      }

      // TO DO check if user can up or down vote
    };

    return (
      <div className="">
        <div className="col-xs-3 align-vertical-center">
          <h3>
            <button
              type="button"
              className="btn"
              onClick={modifyUpDownVotes}
            >
              <span id ="span-up-vote" className="glyphicon glyphicon-arrow-up remove-padding" aria-hidden="true"></span>
            </button>
          </h3>
        </div>
        <div className="col-xs-6 text-center center align-vertical-center">
          <h2>
            {upvoteCount}
          </h2>
        </div>
        <div className="col-xs-3">
          <h3>
            <button
              type="button"
              className="btn"
              onClick={modifyUpDownVotes}
            >
              <span id="span-dn-vote" className="glyphicon glyphicon-arrow-down remove-padding" aria-hidden="true"></span>
            </button>
          </h3>
        </div>
      </div>
    );
  }
};

export default Upvotes;
