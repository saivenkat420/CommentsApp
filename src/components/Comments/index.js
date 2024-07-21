import {Component} from 'react'
import {v4} from 'uuid'
import './index.css'
import CommentItem from '../CommentItem'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {
    commentsCount: 0,
    commentsList: [],
    name: '',
    comment: '',
  }

  increaseCommentCount = () => {
    const {commentsList, name, comment} = this.state
    this.setState(prevState => ({commentsCount: prevState.commentsCount + 1}))
    this.setState({
      commentsList: [
        ...commentsList,
        {name, comment, IsLiked: false, id: v4()},
      ],
    })
    this.setState({name: ''})
    this.setState({comment: ''})
  }

  deleteItem = id => {
    const {commentsList} = this.state
    const dummyList = commentsList.filter(eachItem => eachItem.id !== id)
    this.setState({commentsList: [...dummyList]})
    this.setState(prevState => ({commentsCount: prevState.commentsCount - 1}))
  }

  likeItem = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eacItem => {
        if (id === eacItem.id) {
          return {...eacItem, IsLiked: !eacItem.IsLiked}
        }
        return {eacItem}
      }),
    }))
  }

  submitForm = event => event.preventDefault()

  updateName = event => {
    this.setState({name: event.target.value})
  }

  updateComment = event => {
    this.setState({comment: event.target.value})
  }

  render() {
    const {commentsCount, commentsList, name, comment} = this.state
    return (
      <div className="container">
        <div className="main-container">
          <div className="sub-container">
            <form className="content-container">
              <h1 className="main-container-head">Comments</h1>
              <p className="content-container-info">
                Say something about 4.0 Technologies
              </p>
              <input
                placeholder="Your Name"
                type="text"
                value={name}
                className="content-container-input"
                onChange={this.updateName}
              />
              <textarea
                placeholder="Your Comment"
                className="content-comment-area"
                onChange={this.updateComment}
                value={comment}
                rows="10"
                cols="50"
              />
              <button
                type="button"
                onClick={this.increaseCommentCount}
                className="comment-add-button"
              >
                Add Comment
              </button>
            </form>
            <div className="comments-img-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
                alt="comments"
                className="comments-img"
              />
            </div>
          </div>
          <p className="comment-count-info">
            <span className="comment-count">{commentsCount}</span> Comments
          </p>
          <ul className="comment-container">
            {commentsList.map(eachItem => (
              <CommentItem
                key={eachItem.id}
                id={eachItem.id}
                name={eachItem.name}
                comment={eachItem.comment}
                color={
                  initialContainerBackgroundClassNames[
                    Math.ceil(
                      Math.random() *
                        initialContainerBackgroundClassNames.length -
                        1,
                    )
                  ]
                }
                IsLiked={eachItem.IsLiked}
                deleteItem={this.deleteItem}
                likeItem={this.likeItem}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Comments
