import React, { Component } from 'react';
import {connect} from 'react-redux';
import Header from '../common/Header';
import API from '../../utils/api';
import * as SiteActions from '../../store/actions/siteActions'; 
import {Link} from 'react-router-dom';
import CommentBuilder from '../common/CommentBuilder.js';

class SingleBlog extends Component {

    componentDidMount() {

        this.props.getSinglePost(this.props.match.params.slug, this.props.auth.token);

    }

    render() {
        return (
            <div>
                <Header 
                    title=""
                    subTitle={this.props.site.post.title}
                    showButton={false}
                    image={
                        this.props.site.post.PostImage ? 
                            this.props.site.post.PostImage.length > 0 ?
                                API.makeFileURL(this.props.site.post.PostImage[0].url, this.props.auth.token)
                            : ''
                        : '' }
                />
                <div className="container">
                    <div className="row">
                        <div className="col-md-9">
                            <div className="post-content" dangerouslySetInnerHTML={{__html: this.props.site.post.content}}></div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <h3>Comments</h3>
                            {this.props.auth.token ?
                                <CommentBuilder />
                            : 
                                <p>Need an account? <Link to="/signup">Signup here</Link></p>
                            }
                        </div>
                    </div>
                    <div className="row">
                        {this.props.site.post.Comments?
                            this.props.site.post.Comments.length > 0 ?
                                this.props.site.post.Comments.map((comment, i) => {
                                    console.log(comment);
                                    return (
                                        <div key={i} className="col-md-12">
                                            <h4>{comment.profile ? comment.profile.name : ''}</h4>
                                            <p>{comment.content}</p>
                                        </div>
                                    )
                                })
                            : null 
                        : null}
                        <div className="col-md-12">

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    site: state.site

})

const mapDispatchToProps = dispatch => ({
    getSinglePost: (slug, token) => {
        dispatch(SiteActions.getPostBySlug(slug, token));
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SingleBlog);