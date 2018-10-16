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
        console.log('this state',this.state.singlePothole);
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

  render () {
    const upvoteCount = this.state.singlePothole.upvoteCount;

    const removeLoggedInUserFromVoting = () => {
      const currentState = this.state.singlePothole;
      const loggedInUser = this.state.loggedInUser;
      const indexUp = currentState.upvoteUserIds.indexOf(loggedInUser);
      const indexDn = currentState.downvoteUserIds.indexOf(loggedInUser);
      const tempUsersUp = currentState.upvoteUserIds;
      const tempUsersDn = currentState.downvoteUserIds;
      console.log('users UP, ', indexUp, "  ", tempUsersUp);
      console.log('users DOWN, ', indexDn, "   ", tempUsersDn);
      if (indexUp >= 0) {
        tempUsersUp.splice(indexUp, 1);
        console.log('immediate post splice', tempUsersUp);
        debugger;
        if (!tempUsersUp) {
          this.setState({
            singlePothole: {upvoteUserIds: [""] },
          });
        } else {
          this.setState({
            singlePothole: {upvoteUserIds: tempUsersUp },
          });
        }

        console.log('this state post Index UP splice', this.state.singlePothole);
      }
      if (indexDn >= 0) {
        tempUsersDn.splice(indexDn, 1);
        console.log('immediate post splice', tempUsersDn);
        debugger
        if (!tempUsersDn) {
          this.setState({
            singlePothole: {downvoteUserIds: [""] },
          });
        } else {
          this.setState({
            singlePothole: {downvoteUserIds: tempUsersDn },
          });
        }
        console.log('this state post Index down splice', this.state.singlePothole);
      }
    };

    const verifyVoteCapability = voteType => {
      const upvoters = this.state.singlePothole.upvoteUserIds;
      const downvoters = this.state.singlePothole.downvoteUserIds;
      const loggedInUser = this.state.loggedInUser;
      let canVote = true;

      console.log('verify UPvoters', upvoters);
      console.log('verify DOWN voters', downvoters);
      console.log('loggedinuser: ', loggedInUser);

      if (voteType === "span-dn-vote" && downvoters) {
        for (let d = 0; d < downvoters.length; d++) {
          if (downvoters[d] === loggedInUser) {
            canVote = false;
          }
        }
        if (canVote) {
          removeLoggedInUserFromVoting();
        }

      } else if (voteType === "span-up-vote" && upvoters) {
        for (let u = 0; u < upvoters.length; u++) {
          if (upvoters[u] === loggedInUser) {
            canVote = false;
          }
        }
        if (canVote) {
          removeLoggedInUserFromVoting();
        }
      } else {
        canVote = false;
      };
      return canVote;
    };

    // TODO
    // check if user can upvote/downvote
    // let upvoteObject = upvoteRequests.upvoteGET(details);
    // if user exists in upvoteUserIds, can only downvote
    // if user exists in downvoteuserIds, can only upvote
    // if user does not exist in either, they can
    //    upvote or downvote
    // special considerations for the creator of the pothole?

    // This updates state needed after a valid up/downvote
    const updateState = temp => {
      return new Promise((resolve, reject) => {
        upvoteRequests
          .upvotePUT(temp.thisFirebaseId, temp)
          .then(res => {
            this.setState({
              singlePothole: res.data,
            });
            return upvoteRequests.upvoteGET(res.data.firebaseId);
          })
          .then(updatedState => {
            this.setState({
              singlePothole: updatedState,
            });
            resolve (updatedState);
          })
          .catch(err => {
            reject (err);
          });
      });
    };

    // Starts the up/down vote process and checking
    const modifyUpDownVotes = e => {
      const voteCapability = verifyVoteCapability(e.target.id);
      const theCurrentUser = this.state.loggedInUser;
      console.log('vote capablity', voteCapability);
      console.log('e.target.id', e.target.id);

      // problem with these if else if (voteCapability && e.target.id ===...)
      // i think the check of 119 should be done earlier in the cod
      if (voteCapability && e.target.id === "span-dn-vote") {
        // make a downvote
        const temp = this.state.singlePothole;

        temp.upvoteCount = temp.upvoteCount - 1;
        temp.downvoteUserIds.push(theCurrentUser);

        // add to downvote object and update state
        updateState(temp);
      } else if (voteCapability && e.target.id === "span-up-vote") {
        // make an upvote
        const temp = this.state.singlePothole;

        temp.upvoteCount = temp.upvoteCount + 1;
        temp.upvoteUserIds.push(theCurrentUser);

        // add to upvote object and update state
        updateState(temp);
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
