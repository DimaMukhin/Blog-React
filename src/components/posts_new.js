import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { createPost } from '../actions/index';

class PostsNew extends Component {
  renderField(field) {
    var formGroup = "gorm-group";
    if (field.meta.touched && field.meta.error)
      formGroup += " has-error";

    return (
      <div className={formGroup}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
        />
        <p className="text-danger">{field.meta.touched ? field.meta.error : ''}</p>
      </div>
    );
  }

  onSubmit(values) {
    this.props.createPost(values, () => {
      this.props.history.push('/');
    });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Title"
          name="title"
          component={this.renderField}
        />
        <Field
          label="Categories"
          name="categories"
          component={this.renderField}
        />
        <Field
          label="Post Content"
          name="content"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">
          Cancel
        </Link>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  if (values.title && values.title.length < 3) {
    errors.title = "Title must be at least 3 characters long";
  }
  if (!values.title) {
    errors.title = "Title cannot be empty, please enter a valid title";
  }
  if (!values.categories) {
    errors.categories = 'Categories cannot be empty, please enter at least 1 category';
  }
  if (!values.content) {
    errors.content = 'Content cannot be empty';
  }

  return errors;
}

export default reduxForm({
  validate,
  form: 'PostsNewForm'
})(
  connect(null, { createPost })(PostsNew)
);
