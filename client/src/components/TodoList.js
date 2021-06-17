import React from 'react';
import { Component } from "react";
import { Button, Card } from 'react-bootstrap';

class TodoList extends Component {
    
    render() {
        let today = new Date().toISOString().substr(0,10)
        let todayISO = new Date(today).toISOString()
        var items = this.props.listItems.map((item) => {
            let color = item.dueDate < todayISO ? 'danger': item.dueDate === todayISO? 'warning': 'info'
            let shadowColor = color === 'danger' ? 'red' : color ==='warning'? 'orange': 'teal'
            if(item.completed) {
                return(
                    <li key={item._id} className='list-item'>
                        <Card className='m-1 completed d-flex align-items-center flex-row' >
                            <Card.Body className='p-0'>
                                <h5>{item.title}</h5>
                            </Card.Body>
                            <Button active size='sm' variant='outline-success' 
                            onClick={(e) => {
                                e.stopPropagation();
                                this.props.onBtnClick(item._id)
                            }}
                            style={{border: '0px', borderRadius:'1rem', margin:'0.4rem'}}>
                                <i className="fas fa-check" />
                            </Button>
                        </Card>
                    </li>
                )
            }

            return(
                <li key={item._id} className='list-item' style={{cursor:'pointer'}} >
                    <Card className='m-2 d-flex align-items-center flex-row' onClick={() => this.props.onClick(item._id)} border={color} style={this.props.selectedItem === item ? {boxShadow:`3px 3px 0px 0px ${shadowColor}`} : {}}>
                        <Card.Body className='p-3'>
                            <h5>{item.title}</h5>
                            <Card.Subtitle className='date-subtitle'>
                                <p className='mb-0'>Due: {new Date(Date.parse(item.dueDate)).toLocaleDateString('en-UK')}</p>
                            </Card.Subtitle>
                        </Card.Body>
                        <Button title="Completed" checked={item.completed} variant='outline-secondary' 
                            style={{border:"1px solid", borderRadius:'2rem',height:'2.65rem',width:'2.7rem',marginRight:'0.7rem'}}
                            onClick={(e) => {
                                e.stopPropagation();
                                this.props.onBtnClick(item._id)
                        }}>
                            <i className="fas fa-check"></i>{' '}
                        </Button>
                    </Card>
                </li>
            ) 
        })
        return(
            <div className='list-lg'>
                {/* inner div hides scrollbar */}
                <div style={{height:'100%', overflow:'auto'}}> 
                    <ul>
                        {items}
                    </ul>
                </div>
            </div>
        );
    }
}

export default TodoList