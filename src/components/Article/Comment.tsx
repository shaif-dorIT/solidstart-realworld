import NavLink from '~/components/NavBar/NavLink'

export default (props) => {
  const show = () =>
    props.currentUser &&
    props.currentUser.username === props.comment.author.username

<<<<<<< HEAD
  const author = () => {
    return {
      username: props.comment.author.username,
      image: props.comment.author.image
    }
  }

  const comment = () => {
    return {
      id: props.comment.id,
      body: props.comment.body,
      createdAt: props.comment.createdAt
=======
  const comment = () => {
    const {
      id,
      body,
      author: { username, image },
      createdAt
    } = props.comment
    return {
      id,
      body,
      username,
      image,
      createdAt
>>>>>>> master
    }
  }

  return (
    <div class='card'>
      <div class='card-block'>
        <p
          class='card-text'
          textContent={comment().body}
        />
      </div>
      <div class='card-footer'>
        <NavLink
<<<<<<< HEAD
          href={`/@${author().username}`}
=======
          href={`/@${comment().username}`}
>>>>>>> master
          route='/profile'
          class='comment-author'
        >
          <img
<<<<<<< HEAD
            src={author().image}
=======
            src={comment().image}
>>>>>>> master
            class='comment-author-img'
            alt=''
          />
        </NavLink>
        &nbsp;
        <NavLink
<<<<<<< HEAD
          href={`/@${author().username}`}
          route='/profile'
          class='comment-author'
        >
          {author().username}
=======
          href={`/@${comment().username}`}
          route='/profile'
          class='comment-author'
        >
          {comment().username}
>>>>>>> master
        </NavLink>
        <span class='date-posted'>
          {new Date(comment().createdAt).toDateString()}
        </span>
        {show && (
          <span class='mod-options'>
            <i
              class='ion-trash-a'
              onClick={() => props.onDelete(comment().id)}
            />
          </span>
        )}
      </div>
    </div>
  )
}
