import React, { Component } from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'


import '../App.css';

class Landing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          posts: [],
        };
      }

  state = {
    heading: 'Share your memories!',
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


  submit = (event) => {
    event.preventDefault();

    const payload = {
      title: this.state.title,
      body: this.state.body
    };


    axios({
      url: '/api/save',
      method: 'POST',
      data: payload
    })
      .then(() => {
        console.log('Data has been sent to the server');
        this.resetUserInputs();
        this.getBlogPost();
      })
      .catch(() => {
        console.log('Internal server error');
      });;
      
  };



  fRemove = (id) => {
    axios.delete(`/api/${id}`).then((res) => {
      // alert("deleted successfully");
      this.getBlogPost();
    });
  };

  fEdit = (id) => {
    const { title, body } = this.state;
    
      const data = {
        title: title,
        body: body
      };
    axios.put(`/api/update/${id}`, data).then((res) => {
      if (res.data.success) {
        alert("Edited successfully");
        this.getBlogPost();
      }
    });

  };

  resetUserInputs = () => {
    this.setState({
      title: '',
      body: ''
    });
  };

 

// fEdit = (i) => {
  // let data = this.state.post[i];
  // this.refs.name.value = data.name;
  // this.refs.address.value = data.address;

//   this.setState({
//     act: 1,
//     index: i
//   });

//   this.refs.name.focus();
// }  

render() {
  let datas = this.state.posts;
  return (

    <div className="App">
      
      <h2>{this.state.heading}</h2>
      <form ref="myForm" className="myForm">
        <input type="text" name="title" placeholder="image url" className="formField" value={this.state.title}
              onChange={this.handleChange}/>
        <input type="text" name="body" placeholder="description" className="formField" value={this.state.body}
              onChange={this.handleChange}/>
        <button onClick={(e)=>this.submit(e)} className="myButton">submit </button>
      </form>
      
      <Container>
       <Row md={3} sm={6}>
        {datas.map((data, i) =>
       
       
       <Col>
          <li key={i} className="myList">
            
              
                <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src={data.title} fluid/> 
               <Card.Body>
                <Card.Text>
                {data.body}
                 </Card.Text>
              </Card.Body> 
            <button onClick={()=>this.fRemove(data._id)} className="myListButton">remove </button>
            {/* <button onClick={()=>this.fEdit(data._id)} className="myListButton">edit </button> */}
            <a className="btn btn-warning" href={`/edit/${data._id}`}>
                    <i className="fas fa-edit"></i>&nbsp;Edit
                  </a>
            </Card>
            
             
          </li>
          </Col>
          
              
        )}
      </Row>
            </Container>
    </div>
      
  );
}
}

export default Landing;

