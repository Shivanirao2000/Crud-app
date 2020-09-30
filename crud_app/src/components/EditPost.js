import React, { Component } from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';


import '../App.css';

class EditPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          title: '',
          body: '',
          posts: []
        };
      }

  state = {
    title: '',
    body: '',
    posts: []
  };

  componentDidMount = () => {
    this.getBlogPost();
  };

  getBlogPost = () => {
    axios.get('/api')
      .then((response) => {
        const data = response.data;
        this.setState({ posts: data });
        console.log('Data has been received!!');
      })
      .catch(() => {  
        alert('Error retrieving data!!!');
      });
  }

  

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };


  fEdit = (event) => {
    // event.preventDefault();
    
    const id = this.props.match.params.id;
    // alert(id);
    // const { title, body } = this.state;
    
      const data = {
        title: this.state.title,
        body: this.state.body
      };
      // alert(data);
      axios.put(`/api/update/${id}`, data).then((res) => {
        if (res.data.success) {
          alert("Edited successfully");
          this.getBlogPost();
        }
      });
    
  };



  // fEdit = (id) => {
  //   const { title, body } = this.state;
    
  //     const data = {
  //       title: title,
  //       body: body
  //     };
  //   axios.put(`/api/update/${id}`, data).then((res) => {
  //     if (res.data.success) {
  //       alert("Edited successfully");
  //     }
  //   });

  // };

  resetUserInputs = () => {
    this.setState({
      title: '',
      body: ''
    });
  };

 


render() {
  let datas = this.state.posts;
  return (
    
    
    <div className="App">
      
      <h2>Edit post</h2>
      <form ref="myForm" className="myForm">
        <input type="text" name="title" placeholder="image url" className="formField" value={this.state.title}
              onChange={this.handleChange}/>
        <input type="text" name="body" placeholder="description" className="formField" value={this.state.body}
              onChange={this.handleChange}/>
        <button onClick={(e)=>this.fEdit(e)} className="myButton">submit </button>
      </form>
      
     
    </div>
     
  );
}
}

export default EditPost;

