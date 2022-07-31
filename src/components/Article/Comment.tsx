import NavLink from '~/components/NavBar/NavLink'

export default (props) => {
  const show = () =>
    props.currentUser &&
    props.currentUser.username === props.comment.author.username

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
          href={`/@${author().username}`}
          route='/profile'
          class='comment-author'
        >
          <img
            src={author().image}
            class='comment-author-img'
            alt=''
          />
        </NavLink>
        &nbsp;
        <NavLink
          href={`/@${author().username}`}
          route='/profile'
          class='comment-author'
        >
          {author().username}
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
