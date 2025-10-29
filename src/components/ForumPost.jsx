import "../assets/styles/components.css";

const formatTags = (tags) => tags.map((tag) => `#${tag}`).join(" ");

export function ForumPost({ post }) {
  const {
    title,
    author,
    username,
    postedAt,
    category,
    content,
    tags,
    replies,
  } = post;

  const hasReplies = replies.length > 0;

  return (
    <article className="forum-post-card fade-in">
      <header className="forum-post-header">
        <div className="forum-post-meta">
          <span className="forum-post-category">{category}</span>
          <span className="forum-post-time">{postedAt}</span>
        </div>
        <h3>{title}</h3>
      </header>

      <div className="forum-post-body">
        <p className="forum-post-content">{content}</p>
        <p className="forum-post-tags" aria-label="Etiquetas del post">
          {formatTags(tags)}
        </p>
      </div>

      <footer className="forum-post-footer">
        <div className="forum-post-author">
          <div className="forum-author-avatar" aria-hidden="true">
            {author
              .split(" ")
              .map((part) => part.charAt(0))
              .join("")
              .slice(0, 2)
              .toUpperCase()}
          </div>
          <div>
            <p className="forum-author-name">{author}</p>
            <p className="forum-author-username">@{username}</p>
          </div>
        </div>
        <div className="forum-post-actions">
          <button type="button" className="forum-action-button">
            Responder
          </button>
          <button type="button" className="forum-action-button">
            Guardar
          </button>
        </div>
      </footer>

      {hasReplies && (
        <section className="forum-replies" aria-label="Respuestas">
          {replies.map((reply) => (
            <article key={reply.id} className="forum-reply-card">
              <header className="forum-reply-header">
                <div className="forum-reply-author">
                  <div className="forum-author-avatar small" aria-hidden="true">
                    {reply.author
                      .split(" ")
                      .map((part) => part.charAt(0))
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </div>
                  <div>
                    <p className="forum-author-name">{reply.author}</p>
                    <p className="forum-author-username">@{reply.username}</p>
                  </div>
                </div>
                <span className="forum-post-time">{reply.postedAt}</span>
              </header>
              <p className="forum-reply-content">{reply.content}</p>
            </article>
          ))}
        </section>
      )}
    </article>
  );
}
