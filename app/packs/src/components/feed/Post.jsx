import React, { useState, useEffect } from 'react'
import { parseJSON, formatDistanceToNow } from 'date-fns'
import {
  faHeart
} from '@fortawesome/free-solid-svg-icons'
import {
  faHeart as faHeartBorder,
  faComment
} from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { post as postRequest, get, destroy } from "src/utils/requests"

import TalentProfilePicture from '../talent/TalentProfilePicture'
import Button from '../button'

const Comment = ({ text, username, ticker, profilePictureUrl, created_at}) => {
  const date = parseJSON(created_at)
  const timeSinceCreation = formatDistanceToNow(date)

  return (
    <div className="d-flex flex-row w-100 pt-3 pl-4 pr-2 border-top">
      <TalentProfilePicture src={profilePictureUrl} height={40}/>
      <div className="d-flex flex-column pl-3 w-100">
        <div className="d-flex flex-row justify-content-between">
          <p><strong>{username}</strong> <small className="text-muted">{'\u25CF'} {timeSinceCreation}</small></p>
          <p><small><span className="text-primary">{ticker}</span></small></p>
        </div>
        <p className="w-100">{text}</p>
      </div>
    </div>
  )
}

const CommentSection = ({ post_id, profilePictureUrl, incrementComments }) => {
  const [text, setText] = useState("")
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)

  const onSubmit = (e) => {
    e.preventDefault()

    postRequest(
      `/posts/${post_id}/comments`,
      { text }
    ).then((response) => {
      if(response.error) {
        console.log(response.error)
      } else {
        // response should be something like: {id: 3, username: "Elon Musk", ticker: "$ELON", text, created_at: new Date()}
        setComments([response, ...comments])
        incrementComments()
        setText("")
      }
    })
  }

  useEffect(() => {
    get(`posts/${post_id}/comments`)
      .then((response) => {
        if(response.error) {
          setLoading(false)
        } else {
          // response should be something like: [{ id: 1, text: "Well done mate!", username: "Jane Doe", ticker: "$JANE", created_at: "2021-07-21 10:25:15 UTC" }]
          setComments(response)
          setLoading(false)
        }
      })
  }, [post_id])

  return (
    <div className="d-flex flex-column align-items-center border-top mb-3">
      <form action={`/posts/${post_id}/comments`} method="post" onSubmit={onSubmit} className="w-100 py-3 pl-4 d-flex flex-row">
        <TalentProfilePicture src={profilePictureUrl} height={40}/>
        <div className="d-flex flex-column flex-md-row w-100 px-2">
          <textarea id="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Write a new comment.." className="form-control"/>
          <button type="submit" className="btn btn-primary btn-small ml-0 ml-md-2 mt-2 mt-md-0 md-w-100">
            Reply
          </button>
        </div>
      </form>
      {!loading && comments.length === 0 && <div className="w-100 px-4 pt-2 border-top text-center">No comments yet. Be the first!</div>}
      {!loading && comments.length > 0 && comments.map((comment) => <Comment key={comment.id} {...comment} />)}
    </div>
  )
}

const Post = ({ post, user }) => {
  const [like, setLike] = useState(post.i_liked)
  const [likeCount, setLikeCount] = useState(post.likes)
  const [commentCount, setCommentCount] = useState(post.comments)
  const [commentSectionActive, setCommentSectionActive] = useState(false)

  const date = parseJSON(post.created_at)
  const timeSinceCreation = formatDistanceToNow(date)
  const buyButtonText = user.active ? `Buy ${user.ticker}` : `${user.ticker} coming soon.`

  const toggleCommentSection = () => {
    setCommentSectionActive(!commentSectionActive)
  }

  const onLikeClick = () => {
    postRequest(
      `/posts/${post.id}/likes`
    ).then((response) => {
      if(response.error) {
        console.log(response.error)
      } else {
        setLike(true)
        setLikeCount(likeCount + 1)
      }
    })
  }

  const onUnlikeClick = () => {
    destroy(
      `/posts/${post.id}/likes`
    ).then((response) => {
      if(response.error) {
        console.log(response.error)
      } else {
        setLike(false)
        setLikeCount(likeCount - 1)
      }
    })
  }

  const incrementComments = () => setCommentCount(commentCount + 1)

  return (
    <div className="d-flex flex-column">
      <div className="d-flex flex-row w-100 py-3 px-2">
        <TalentProfilePicture src={user.profilePictureUrl} height={40}/>
        <div className="d-flex flex-column pl-3 w-100">
          <div className="d-flex flex-column flex-md-row justify-content-between">
            <p className="mb-0 mb-md-2"><strong>{user.username}</strong> <small className="text-muted">{'\u25CF'} {timeSinceCreation}</small></p>
            <p><small><span className="text-primary">{user.ticker}</span> <span className="text-muted">{'->'} {user.price}</span></small></p>
          </div>
          <p>{post.text}</p>
          <div className="d-flex flex-column-reverse flex-md-row justify-content-between">
            <div className="d-flex flex-row mt-2 mt-md-0">
              {like &&
                <button onClick={() => onUnlikeClick()} className="border-0 bg-transparent">
                  <FontAwesomeIcon icon={faHeart} className="text-danger"/> {likeCount}
                </button>}
              {!like &&
                <button onClick={() => onLikeClick()} className="border-0 bg-transparent">
                  <FontAwesomeIcon icon={faHeartBorder}/> {likeCount}
                </button>
              }
              <button onClick={() => toggleCommentSection()} className="ml-2 border-0 bg-transparent">
                <FontAwesomeIcon icon={faComment} flip="horizontal"/> {commentCount}
              </button>
            </div>
            <div className="d-flex flex-row">
              <Button type="outline-secondary" text="Message"/>
              <Button type="primary" href={`/swap?ticker=${user.ticker.substring(1)}`} text={buyButtonText} disabled={!user.active} className="talent-button ml-2"/>
            </div>
          </div>
        </div>
      </div>
      {commentSectionActive && <CommentSection incrementComments={() => incrementComments()} post_id={post.id}/>}
    </div>
  )
}

export default Post