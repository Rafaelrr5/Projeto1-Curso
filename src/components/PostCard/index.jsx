/* export const PostCard = (props) => {

    const { post } = props; */

import './styles.css'
import P from 'prop-types';

export const PostCard = ({ post }) => //{
  //return
    (
    <div className="post">
      <img src={post.cover} alt={post.title} />
      <div className="post-content">
        <h1>{post.title}</h1>
        <p>{post.body}</p>
      </div>
    </div>
)
//};

PostCard.propTypes = {
  title: P.string.isRequired,
  cover: P.string.isRequired,
  body: P.string.isRequired,
  id: P.number.isRequired,
}
