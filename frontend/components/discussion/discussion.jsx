import React from 'react';
import Comment from './comment';

class Discussion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {body: "", product_id: this.props.productId };
  }

  update(field){
    return e => { this.setState({[field]: e.currentTarget.value }); };
  }

  handleSubmit(e){
    e.preventDefault();
    const discussion = this.state;
    this.props.createComment({ discussion });
    document.getElementById("comment-form").value = "";
    this.setState({body: ""});
  }

  render() {
    let comments = [];

    Object.keys(this.props.comments).forEach(comment =>(
      comments.push( <div key={comment}><Comment
        closeModal={this.props.closeModal}
        requestProfile={this.props.requestProfile}
        requestProducts={this.props.requestProducts}
        location={this.props.location}
        comment={ this.props.comments[parseInt(comment)] } /></div>)
    ));

    let form;
    if (this.props.currentUser) {
      form = <form className="add-comment">
        <label className="comment-label">Comment: <textarea id="comment-form" onChange={this.update("body")}
          className="comment-input"></textarea></label>
        <button className='hover-submit comment-btn' onClick={this.handleSubmit.bind(this)}>Comment</button>
      </form>;
    } else {
      form = "You must be logged in to comment";
    }

    // debugger

    return (
      <div>
        <h3 className="discussion-title">DISCUSSION</h3>
        {comments}
        {form}
      </div>
    );
  }
}

export default Discussion;
