import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import {Link} from "react-router-dom"
import { createPost } from "../../ducks/postReducer";
class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "Need A Room",
      post: "",
      title: "",
      posts: []
    };
  }
  componentDidMount() {
    axios.get("/api/posts").then(res => {
      console.log(res.data);
      this.setState({
        posts: res.data
      });
    });
  }
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    const { user } = this.props;
    const { title, type, post } = this.state;
    this.props.createPost(title, type, post, user.id);

  };
  render() {
    const { type, post, title } = this.state;
    const { user } = this.props;

    const showPosts = this.state.posts.map((post, i) => {
      return (
        <div key={post.id}>
            <h1>{post.username}</h1>
          <h2>
          <Link to={`/users/${user.id}`}>{post.title}</Link> ---{post.type}
          </h2>
          <h3>{post.post}</h3>
        </div>
      );
    });
    return (
      <div>
        <h1>Create A Post Here To Find Potential Roomates Nearby</h1>

        <label>
          Title of Post:
          <input
            placeholder="Post Title"
            name="title"
            onChange={this.handleChange}
            value={title}
            type="text"
          />
        </label>
        <label>
          Your Rooming Sitution:
          <select value={type} name="type" onChange={this.handleChange}>
            <option value="Need A Room">Need A Room</option>
            <option value="Have A Room">Have A Room</option>
          </select>
        </label>

        <textarea
          placeholder="What Are You Looking For"
          onChange={this.handleChange}
          value={post}
          name="post"
          id=""
          cols="20"
          rows="10"
        />
        <button onClick={() => this.handleSubmit(title, type, post, user.id)}>
          Post
        </button>
        {showPosts}
      </div>
    );
  }
}
const mapStateToProps = state => {
  const { user } = state.reducer;
  return { user };
};

export default connect(mapStateToProps)(CreatePost);
