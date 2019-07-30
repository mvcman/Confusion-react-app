import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';


function RenderDish({dish}){
  return (
  <div className="col-12 col-md-5 m-1">
    <Card>
        <CardImg width="100%" src={dish.image} alt={dish.name}/>
        <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
        </CardBody>
    </Card>
  </div>
  );
}

function RenderComments({dish}){
  const comments = dish.comments.map((mycomment) => {
    return (
      <ul key={mycomment.id}>
        <li class="list-unstyled mb-2">{mycomment.comment}</li>
        <li class="list-unstyled mb-3">-- {mycomment.author}, {new Intl.DateTimeFormat('en-us', { year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(mycomment.date)))}</li>
      </ul>
    )
  });
  return (<div className="col-12 col-md-5 m-1"><h3>Comments</h3>{comments}</div>);
}

const DishDetail = (props) => {
    const dish = props.mydish;
    console.log(dish);

    if(dish != null){
      return(
        <div class="container">
          <div className="row">
              <RenderDish dish={dish}/>
              <RenderComments dish={dish}/>
          </div>
        </div>
      );
    }else {
      return (
        <div></div>
      );
  }
}

export default DishDetail;
