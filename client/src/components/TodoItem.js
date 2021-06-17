import React, { Component } from "react";
import { Button, Card } from "react-bootstrap";

class TodoItem extends Component {
    DangerText() {
        let today = new Date().toISOString().substr(0,10)
        let remainingDays = (new Date(this.props.item.dueDate) - new Date(today))/(1000*60*60*24)
        if (remainingDays < 0) 
            return(
                <div className='text-danger ml-auto align-self-center'><i className='fas fa-exclamation-circle'></i>{'  '}Overdue</div>
            )
        if (remainingDays === 0)
            return(
                <div className='ml-auto align-self-center' style={{color:"#eaa200"}}><i className='fas fa-exclamation'></i>{'  '}Due today</div>
            )
        return (<div className='ml-auto align-self-center text-info'>In {remainingDays} day(s)</div>)
    }
    render() {
        const options = {day:'numeric', weekday:'short', month:'short'}
        if(this.props.item)
            return(
                <Card className='todo-item' style={{overflow: "hidden"}}>
                    <Card.Body style={{overflow: "auto"}}>
                        <Card.Title>{this.props.item.title}</Card.Title>
                        <hr />
                        <Card.Subtitle className="mb-2 text-muted">
                            {new Date(Date.parse(this.props.item.dueDate)).toLocaleDateString('en-UK',options)}
                        </Card.Subtitle>
                        <Card.Text>{this.props.item.description || <em className='text-muted font-weight-light'>no description</em>}</Card.Text>
                    </Card.Body>
                    <Card.Footer className='d-flex'>
                        <Button className='mr-2' onClick={() => this.props.onEditClick()} variant='outline-secondary'><i className="far fa-edit"></i>{' '}Edit</Button>{' '}
                        <Button onClick={() => this.props.onDeleteClick(this.props.item._id)} variant='outline-danger'><i className="far fa-trash-alt"></i>{' '}Delete</Button>
                        {this.DangerText()}
                    </Card.Footer>
                </Card>
            )
        else return(
            <div className='todo-item text-center' style={{display:'flex',height:'100%',justifyContent:'center',alignItems:'center'}}>
                <h3 className='font-weight-light'>click on an item or add a new one</h3>
            </div>

        )
    }
}

export default TodoItem;