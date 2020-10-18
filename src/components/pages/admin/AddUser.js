import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import * as AdminActions from '../../../store/actions/adminActions';
import Paper from '@material-ui/core/Paper';
import {withFormik, Form} from 'formik';
import * as Yup from 'yup';
import {FormikTextField, FormikSelectField} from 'formik-material-fields';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import ImageIcon from '@material-ui/icons/Image';
import API from '../../../utils/api';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import {withRouter} from 'react-router-dom';

/* global $ */

const styles = theme => ({
    container: {
        margin: theme.spacing(3),
        display: 'flex',
        flexDirection: 'row wrap',
        width: '100%'
    },
    save: {
        marginBottom: theme.spacing(2)

    },
    formControl: {
        margin: theme.spacing(1)
    },
    leftSide: {
        flex: 4,
        height: '100%',
        margin: theme.spacing(1),
        padding: theme.spacing(3)
    },
    rightSide: {
        flex: 1,
        height: '100%',
        margin: theme.spacing(1),
        padding: theme.spacing(3)
    },
    postImage: {
        width: '100%',
    }
});


class AddUser extends Component {
    componentDidUpdate(props, state) {
        if(this.props.match.params.view === 'add' && this.props.admin.posts.filter(p => p.title === this.props.values.title).length > 0) {
            const post = this.props.admin.posts.filter(p => p.title === this.props.values.title)[0];
            this.props.history.push('/admin/posts/edit' + post.id);
        }

        if(this.props.admin.post.id !== props.admin.post.id ) {
            this.props.setValues(this.props.admin.post);
        }
    }

    uploadImage = (e) => {
        const data = new FormData();
        data.append('file', e.target.files[0], new Date().getTime().toString() + e.target.files[0].name);
        this.props.uploadImage(data, this.props.auth.token, this.props.admin.post.id, this.props.auth.user.userId);
    }

    componentDidMount(props, state) {
        console.log('component mounted');
        if(this.props.match.params.view === 'edit' && this.props.match.params.id) {
            console.log('route', this.props.match.params.view);
            console.log('id', this.props.match.params.id);
            this.props.getSinglePost(this.props.match.params.id, this.props.auth.token);
        }
    }

    modules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike', 'blockquote', 'script'],
            [{'header': 1}, {'header': 2}],
            [{'list': 'ordered'}, {'list': 'bullet'}],
            [{'indent': '-1'}, {'indent': '+1'}],
            [{'size': ['small', 'medium', 'large', 'huge']}],
            [{'color': []}, {'background': []}],
            ['image'],
            ['clean']
        ]
    }

    formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote', 'script',
        'list', 'bullet', 'indent',
        'link', 'image', 'color', 'code-block',
    ]

    render() {
        const {classes} = this.props;
        return (
            <div>                
                <Form className={classes.container}>
                    <Paper className={classes.leftSide}>
                        <FormikTextField 
                            name="name"
                            label="Name"
                            margin="normal"
                            onChange={e => this.props.setFieldValue('name', e.target.value.toLowerCase().replace(/ /g, '_'))}
                            fullWidth
                        />
                        <FormikTextField 
                            name="email"
                            label="Email"
                            margin="normal"
                            fullWidth
                        />
                        <FormikTextField 
                            name="password"
                            label="Password"
                            margin="normal"
                            onChange={e => this.props.setFieldValue('password', e.target.value.toLowerCase().replace(/ /g, '_'))}
                            fullWidth
                        />
                    </Paper>
                    <Paper className={classes.rightSide}>
                        <FormikSelectField
                            name="status"
                            label="Status"
                            margin="normal"
                            options={[
                                {label: 'Unpublished', value: false},
                                {label: 'Published', value: true},
                            ]}
                        />
                        <div className={classes.save}>
                            <Button 
                                color="secondary" 
                                variant="contained"
                                onClick={e => {
                                    this.props.handleSubmit();
                                }}
                            >
                            <SaveIcon/> Save</Button>
                        </div>
                        {this.props.admin.post.PostImage ?
                            this.props.admin.post.PostImage.length > 0 ?
                                <img src={API.makeFileURL(this.props.admin.post.PostImage[0].url, this.props.auth.token)} className={classes.postImage}/>
                            : null
                        : null}
                        <div>
                            <Button
                                className="mt-2" 
                                variant="contained"
                                color="primary"
                                onClick={e => {
                                    $('.myFile').trigger('click');
                                }}
                            ><ImageIcon /> Upload Post Image</Button>
                            <input type="file" className="myFile d-none" onChange={this.uploadImage}/>
                        </div>
                    </Paper>
                </Form>
                
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    admin: state.admin,
});

const mapDispatchToProps = dispatch => ({
    AddUser: (post, token) => {
        dispatch(AdminActions.AddUser(post, token));
    },
    updatePost: (post, token) => {
        dispatch(AdminActions.updatePost(post, token));
    },
    getSinglePost: (id, token) => {
        dispatch(AdminActions.getSinglePost(id, token));
    },
    uploadImage: (data, token, postId, userId) => {
        dispatch(AdminActions.uploadImage(data, token, postId, userId));
    }
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps,
)(withFormik({
    mapPropsToValues: (props) => ({
        title: props.admin.post.title || '',
        slug: props.admin.post.slug || '',
        createdAt: props.admin.post.createdAt || '',
        status: props.admin.post.status || false,
        content: props.admin.post.content || ''
    }),
    validationSchema: Yup.object().shape({
        title: Yup.string().required('Title is required'),
        slug: Yup.string().required(),
        content: Yup.string().required(),
    }),
    handleSubmit: (values, {setSubmitting, props}) => {
        if(props.match.params.view === 'edit') {
            const post = {
                ...values,
                id: props.match.params.id
            }
            props.updatePost(post, props.auth.token);
        } else {
            props.AddUser(values, props.auth.token);
        }
    }
})(withStyles(styles)(AddUser))));