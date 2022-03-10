const root = document.getElementById('comments');
class CommentList {
    constructor(root) {
        this.root = root;
        this.count = 0;
        console.log(root);
        this.form = root.querySelector('form');
        this.commentList = {}; // id -> comment element
        this.commentStrList = {};
        this.input = this.form.querySelector('input');
        this.ul = root.querySelector('ul');
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            const comment = this.input.value;
            this.input.value = '';
            this.addComment(comment);
        });
        this.ul.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            if (!id) {
                return;
            }
            this.removeComment(id);
        });
        this.updateCommentNum();
    }

    addComment(comment) {
        // <div className="comment">
        //     <a className="avatar">
        //         <img src="/images/avatar/small/matt.jpg">
        //     </a>
        //     <div className="content">
        //         <a className="author">Matt</a>
        //         <div className="metadata">
        //             <span className="date">Today at 5:42PM</span>
        //         </div>
        //         <div className="text">
        //             How artistic!
        //         </div>
        //         <div className="actions">
        //             <a className="reply">Reply</a>
        //         </div>
        //     </div>
        // </div>
this.count += 1;
const id = String(Date.now());
        const authorName = "Anonymous";
        const commentTime = new Date().toLocaleString();

        const contain = document.createElement('div');
        contain.className= 'comment';
        const content = document.createElement('div');
        content.className = 'content';
        // const avatar = document.createElement('a');
        const user = document.createElement('a');
        user.className = 'author';
        user.innerText = authorName;
        console.log(user)
        const metadata = document.createElement('div');
        metadata.className =  'metadata';
        const time = document.createElement('span');
        time.className = "date";
        time.innerText = commentTime;
        const text = document.createElement('div');
        text.className = 'text';
        text.innerText = comment;
        const action = document.createElement('div');
        action.className = 'actions';
        const reply = document.createElement('a');
        reply.className = 'reply';
        reply.innerText = "Reply";
        const remove = document.createElement('a');
        remove.className = 'remove';
        remove.innerText = 'Remove';
        this.ul.appendChild(contain);
        contain.appendChild(content);
        content.appendChild(user);

        content.appendChild(metadata);
        content.appendChild(text);
        content.appendChild(action);
        content.appendChild(reply);
        metadata.appendChild(time);

        this.commentList[id] = contain;
        this.commentStrList[id] = {authorName,comment,commentTime};

        $.ajax({
            method: "post",
            url: "/comments",
            data: JSON.stringify({ comments: this.commentStrList }),
            contentType: "application/json",
            success: function (data) {
                console.log(data);
            },
        });

    }

    removeComment(id) {
        this.count -=1;
        this.updateCommentNum();
        const block = this.commentList[id];
        this.ul.removeChild(block);

        delete this.commentList[id];
        delete this.commentStrList[id];
    }

}

let c = new CommentList(root);
