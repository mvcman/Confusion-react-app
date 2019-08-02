import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody,
Form, FormGroup, Input, Label, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);


function RenderDish({dish}){
  return (
    <Card>
        <CardImg width="100%" src={dish.image} alt={dish.name}/>
        <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
        </CardBody>
    </Card>
  );
}

function RenderComments({ comments, addComment, dishId }){
  const comment = comments.map((mycomment) => {
    return (
      <>
      <ul key={mycomment.id}>
        <li class="list-unstyled mb-2">{mycomment.comment}</li>
        <li class="list-unstyled mb-3">-- {mycomment.author}, {new Intl.DateTimeFormat('en-us', { year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(mycomment.date)))}</li>
      </ul>

      </>
    )
  });
  return (comment);
}


class CommentForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      isModalOpen: false
    }
  }

  toggleModal = () => {
    this.setState({isModalOpen: !this.state.isModalOpen});
  }

  handleCommentsForm = (values) => {
      this.toggleModal();
      this.props.addComment(this.props.dishId, values.rating, values.name, values.comment);
    alert('Current state is: ' + JSON.stringify(values));
  }

  render(){
    return(
      <>
      <Button outline className="m-5" onClick={this.toggleModal}>
          <span className="fa fa-pencil fa-lg"> Submit Comment</span>
      </Button>
      <Modal isOpen={this.state.isModalOpen} centered={true} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
              <LocalForm onSubmit={(values) => this.handleCommentsForm(values)}>
                   <Row className="form-group m-1">
                      <Label htmlFor="rating">Rating</Label>
                      <Control.select model=".rating" name="rating"
                          className="form-control">
                          <option>Select One</option>
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                      </Control.select>
                   </Row>
                   <Row className="form-group m-1">
                      <Label htmlFor="name">Your Name</Label>
                      <Control.text model=".name" name="className"
                          className="form-control"
                          placeholder="Your Name"
                          validators={{required, minLength: minLength(3), maxLength: maxLength(10)}}
                          />
                      <Errors className="text-danger" model=".name" show="touched"
                        messages={{required: 'Required', minLength: "Must be greater than 2 characters", maxLength: "Must be less than or equal 10 characters"}}/>
                   </Row>
                   <Row className="form-group m-1">
                      <Label htmlFor="comment">Comments</Label>
                      <Control.textarea model=".comment" name="comment"
                         className="form-control" rows={6}/>
                   </Row>
                  <Button type="submit" value="submit" className="bg-primary">Submit</Button>
              </LocalForm>
          </ModalBody>
      </Modal>
      </>
    );
  }
}


class DishDetail extends Component{

  render(){
    const dish = this.props.dish;
    console.log(dish, this.props.comments);

    if (this.props.isLoading) {
           return(
               <div className="container">
                   <div className="row">
                       <Loading />
                   </div>
               </div>
           );
       }
       else if (this.props.errMess) {
           return(
               <div className="container">
                   <div className="row">
                       <h4>{this.props.errMess}</h4>
                   </div>
               </div>
           );
       }
       else if (this.props.dish != null) {
      return(
        <div class="container">
          <div className="row mt-2">
               <Breadcrumb>
                   <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                   <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
               </Breadcrumb>
               <div className="col-12">
                   <h3>{dish.name}</h3>
                   <hr />
               </div>
           </div>
           <div className="row">
               <div className="col-12 col-md-5 m-1">
                   <RenderDish dish={dish} />
               </div>
               <div className="col-12 col-md-5 m-1">
                    <h3>Comments</h3>
                    <RenderComments comments={this.props.comments}
                    addComment={this.props.addComment}
                    dishId={this.props.dish.id}/>
                    <CommentForm dishId={this.props.dish.id} addComment={this.props.addComment}/>
               </div>
          </div>
        </div>
      );
    }else {
      return (
        <div></div>
      );
  }  }
}

export default DishDetail;
