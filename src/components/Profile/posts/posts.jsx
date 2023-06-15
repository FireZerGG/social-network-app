import React from 'react';
import c from './Posts.module.css';
import Post from './post/item';
import { Field, reduxForm } from 'redux-form'
import { required, maxLength } from '../../../utils/validators';
import { Input } from '../../common/FormsControls';

const maxLength10 = maxLength(30)

const addPostForm = (props) => {
    return (
        <form className={c.posts__form} onSubmit={props.handleSubmit}>
            <Field
                component={Input}
                name={'addPostText'} 
                className={c.form__input}
                validate={[required, maxLength10]}
                placeholder='News...' />
            <button className={c.form__btnSubmit}
                    name={'addPostButton'}>
                Send
            </button>
        </form>
    )
}

const AddPostReduxForm = reduxForm({
    form: 'dialogAddMessageForm'
}) (addPostForm)


const Posts = React.memo((props) => {
    let postsElement = props.profilePage.posts.map
        (post => <Post message={post.message} key={post.id} likes={post.likes} />)

    let addPost = (formData) => {
        props.addPost(formData.addPostText);
    }
    
    return (
        <div>
            <AddPostReduxForm onSubmit={addPost} />
            <ul>
                {postsElement}
            </ul>
        </div>
    )
});

export default Posts;