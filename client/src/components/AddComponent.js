import React, { Component } from "react"
import { Button, Form, Modal} from "react-bootstrap"

class AddModal extends Component {
    constructor(props) {
        super(props)
        this.handleSubmit= this.handleSubmit.bind(this)
    }

    handleSubmit(event) {
        event.preventDefault()
        var newitem = {
            title: this.title.value,
            description: this.description.value,
            dueDate: this.dueDate.value,
            id: 5,
            completed: false
        }
        if(this.props.action === 'Edit') {
            newitem._id = this.props.item._id
        }
        this.props.submit(newitem);
        this.props.onHide();
    }

    render() {
        var defaultTitle, defaultDesc = '';
        var defaultDate = new Date().toISOString().substr(0,10)
        if(this.props.action === 'Edit' && this.props.item) {
            defaultTitle = this.props.item.title
            defaultDesc = this.props.item.description
            defaultDate = this.props.item.dueDate.substr(0,10)
        }
        return(
            <Modal className='add-modal' action={this.props.action} onHide={this.props.onHide} show={this.props.show} centered backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {this.props.action} to-do
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group>
                            <Form.Label className='text-strong'>Title</Form.Label>
                            <Form.Control defaultValue={defaultTitle} required type='text' ref={(input) => this.title = input}></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control as='textarea' defaultValue={defaultDesc} rows='4' ref={(input) => this.description = input} placeholder='(optional)'></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Complete by</Form.Label>
                            <Form.Control required defaultValue={defaultDate} type='date' ref={(input) => this.dueDate = input} ></Form.Control>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Save
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        );
    }
}

export default AddModal;