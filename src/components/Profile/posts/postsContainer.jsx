import { addPostActionCreator } from '../../../redux/profileReducer.ts';
import Posts from './posts';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        profilePage: state.profilePage
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addPost: (text) => {
            dispatch(addPostActionCreator(text))
        },
    };
};

const PostsContainer = connect(mapStateToProps, mapDispatchToProps) (Posts);

export default PostsContainer;