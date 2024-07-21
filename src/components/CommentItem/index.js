import {Component} from 'react'
import './index.css'
import {formatDistanceToNow} from 'date-fns'

class CommentItem extends Component {
  render() {
    const {name, comment, color, deleteItem, likeItem, id} = this.props
    const deleteBtn = () => {
      deleteItem(id)
    }
    const likeBtn = () => {
      likeItem(id)
    }
    const getLikeImage = () => {
      const {IsLiked} = this.props
      return IsLiked
        ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'
    }
    const getLikeText = () => {
      const {IsLiked} = this.props
      return IsLiked ? 'Liked' : 'Like'
    }
    const getClass = () => {
      const {IsLiked} = this.props
      return IsLiked ? 'liked' : 'like'
    }
    return (
      <li className="comment-item-container">
        <div className="comment-details-container">
          <p className={`name-icon ${color}`}>{name[0].toUpperCase()}</p>
          <div className="name-time-comment-container">
            <div className="name-time-container">
              <p className="name">{name}</p>
              <p className="time">{formatDistanceToNow(new Date())}</p>
            </div>
            <p className="comment-content">{comment}</p>
          </div>
        </div>
        <div className="functionality-container">
          <div className="like-container">
            <button type="button" className="like-btn" onClick={likeBtn}>
              <img src={getLikeImage()} alt="like" className="like-img" />
            </button>
            <p className={getClass()}>{getLikeText()}</p>
          </div>
          <button
            type="button"
            data-testid="delete"
            className="delete-btn"
            onClick={deleteBtn}
          >
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
              alt="delete"
              className="delete-img"
            />
          </button>
        </div>
      </li>
    )
  }
}

export default CommentItem
