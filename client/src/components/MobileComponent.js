import React from "react";
import { Accordion, Button, Card } from "react-bootstrap";

function MobileComponent(props) {
        let today = new Date().toISOString().substr(0,10)
        let todayISO = new Date(today).toISOString()
        let items = props.listItems.map((item) => {
            let color = item.dueDate < todayISO ? 'danger': item.dueDate === todayISO? 'warning': 'info'
            if(item.completed) {
                return(
                    <div key={item._id} className='m-1 p-0 completed d-flex align-items-center' style={{justifyContent:'space-between'}} >
                        <h5>{item.title}</h5>
                        <Button title="Completed" active size='sm' variant='outline-success' 
                                style={{border: '0px',borderRadius:'1rem', marginRight:'5px'}}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    props.onDoneClick(item._id)
                            }}>
                            <i className="fas fa-check"></i>
                        </Button>
                    </div>
                )
            }
            return(
                    <Card key={item._id} border={color} style={{border:'solid 2px', borderRadius:'1rem', margin:'0.4rem'}}>
                        <Accordion.Toggle as={Card.Header} eventKey={item._id} onClick={() => props.onClick(item._id)} 
                            style={{position:'relative',padding:'0.5rem 0.75rem',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                            <div>
                                <h5>{item.title}</h5>
                                <Card.Subtitle className='text-muted font-weight-light'>Due: {new Date(Date.parse(item.dueDate)).toLocaleDateString('en-UK')}</Card.Subtitle>
                            </div>
                            <Button title="Completed" variant='outline-secondary' 
                                    style={{border: 'solid 2px',borderRadius:'1.8rem',width:'1.83rem',height:'1.8rem'}}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        props.onDoneClick(item._id)
                                }}>
                            </Button>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey={item._id}>
                            <Card.Body className='p-3'>
                                <p>{item.description || <em className='text-muted font-weight-light'>no description</em>}</p>
                                <Button size='sm' variant='outline-secondary' onClick={props.onEditClick}>
                                    <i className="far fa-edit"></i>{' '}Edit
                                </Button>{' '}
                                <Button size='sm' variant='outline-danger' onClick={() => props.onDeleteClick(item._id)}>
                                    <i className="far fa-trash-alt"></i>{' '}Delete
                                </Button>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
            )
        })
        return(
            <div style={{overflowY:'hidden',borderRadius:'1rem',boxShadow:'0 5px 25px 2px darkgray'}}>
                <div className='list-sm'>
                    {items.length ? 
                    <Accordion>
                        {items}
                    </Accordion> : 
                    <div style={{display:'flex',height:'100%',justifyContent:'center',alignItems:'center',textAlign:'center'}}>
                        <h4 className='font-weight-light text-muted'>add a new item</h4>
                    </div>}
                </div>
            </div>
            
        )
    }

export default MobileComponent;