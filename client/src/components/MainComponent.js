import { Component } from 'react';
import { Button, Col, Container, Row, Navbar, Nav } from 'react-bootstrap';
import AddModal from './AddComponent';
import MobileComponent from './MobileComponent';
import TodoItem from './TodoItem';
import TodoList from './TodoList';
import { addItem, deleteItem, editItem, getData, logout } from '../shared/serverFunctions'
import { baseUrl } from '../shared/baseUrl';

class Main extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
            listItems: [],
            isEditModalOpen: false,
            isAddModalOpen: false,
            selectedItem: null,
            isDeviceMobile: false,
            pageLoading: true,
            actionLoading: false,
            err: "",
            statusText: "",
            user: ''
        }

        fetch(baseUrl+'getUser', { credentials:'include' })
        .then(res => {
            if(res.ok) {
                res.json().then((user) => {
                    this.setState({
                        user
                    })
                })
                this.getData()
                    .then(() => this.setState({ pageLoading: false }))
            }
            else this.props.history.push('/login')
        })

        this.setCompleted = this.setCompleted.bind(this)
        this.toggleEditModal = this.toggleEditModal.bind(this)
        this.toggleAddModal = this.toggleAddModal.bind(this)
        this.selectItem = this.selectItem.bind(this)
        this.addItem = this.addItem.bind(this)
        this.editItem = this.editItem.bind(this)
        this.deleteItem = this.deleteItem.bind(this)
        this.getData = this.getData.bind(this)
        this.isMobile = this.isMobile.bind(this)
    }

    getData = getData;
    addItem = addItem;
    editItem = editItem;
    deleteItem = deleteItem;

    isMobile() {
        const resolution = window.innerWidth;
        if(resolution <= 767)
            this.setState({
                isDeviceMobile: true
            })
        else
            this.setState({
                isDeviceMobile: false
            })
    }

    setCompleted(id) {
        let index = this.state.listItems.findIndex(item => item._id === id)
        const newList = this.state.listItems.map((item, j) => {
            if (j === index) {
              return {...item, completed: !item.completed};
            } else {
              return item;
            }
          });
        this.setState({
            listItems: newList
        },() => this.editItem(this.state.listItems[index],'completed'))
    }

    selectItem(id) {
        let item = this.state.listItems.find(item => item._id === id)
        if(this.state.selectedItem === item) {
            this.setState({
                selectedItem: null
            })
        }
        else this.setState({
            selectedItem: item
        })
    }

    toggleEditModal() {
        this.setState((prevState) => ({
            isEditModalOpen: !prevState.isEditModalOpen 
        }))
    }

    toggleAddModal() {
        this.setState((prevState) => ({
            isAddModalOpen: !prevState.isAddModalOpen 
        }))
    }

    componentDidMount() {
        this.isMobile();
        window.addEventListener("resize", this.isMobile);
        
    }
    
    render() {
        return (
               <div className='main-page'>
                    <div className='header'>
                        <Navbar bg='dark' variant='dark' style={!this.state.isDeviceMobile? {margin:'0.5rem', borderRadius:'1rem'}: {}}>
                            <Navbar.Brand className='d-none d-sm-block'>Hi, {this.state.user}!</Navbar.Brand>
                            <Navbar.Text className='w-100 text-sm-center'>You have {this.state.listItems.filter(i => !i.completed).length} to-do's</Navbar.Text>
                            <Nav.Link className='ml-auto px-0' onClick={() => logout().then(this.props.history.push('/login'))}>
                                <Button variant='outline-light' style={{borderRadius:'0.7rem'}}>Logout</Button>
                            </Nav.Link>
                        </Navbar>
                    </div>
                        {this.state.pageLoading?
                        <p className='text-center text-muted h-100 p-5'><i className='fa fa-3x fa-circle-notch fa-spin mb-2' /><br />Loading</p>: 
                        this.state.err? 
                        <h4 className='text-center font-weight-bold text-danger h-100 p-5'>{this.state.err}</h4>:
                        <>
                            <Container className='body'>
                                {!this.state.isDeviceMobile && 
                                <Row style={{justifyContent:'space-around'}}>
                                    <Col md={6}>
                                        <TodoList onBtnClick={(i) => this.setCompleted(i)} onClick={this.selectItem} listItems={this.state.listItems} selectedItem={this.state.selectedItem}/>
                                    </Col>
                                    <Col md={6}>
                                        <TodoItem onDeleteClick={this.deleteItem} onEditClick={() => this.toggleEditModal()} item={this.state.selectedItem} />
                                    </Col>
                                </Row> }
                                {this.state.isDeviceMobile && 
                                <MobileComponent 
                                    listItems={this.state.listItems} 
                                    onClick={this.selectItem} onDoneClick={(i) => this.setCompleted(i)}
                                    onDeleteClick={this.deleteItem} onEditClick={() => this.toggleEditModal()}
                                />}
                            </Container>
                            <div className='footer text-center'>
                                <Button style={{minWidth: this.state.isDeviceMobile? '10rem' : '12rem', margin:'0.5rem'}} variant='dark' size={this.state.isDeviceMobile? 'md' : 'lg'} onClick={() => this.deleteItem(null)}>Delete completed</Button>
                                <Button style={{minWidth: this.state.isDeviceMobile? '10rem' : '12rem', margin:'0.5rem'}} variant='primary' size={this.state.isDeviceMobile? 'md' : 'lg'} onClick={this.toggleAddModal}>
                                    <i className='fa fa-plus'></i>{' '}Add new
                                </Button>
                                <div className='text-center p-2' style={{height:'2.5rem'}}>{this.state.actionLoading &&  <i className='fa fa-spinner fa-spin'></i>}</div>
                            </div>
                            <AddModal action='Add' submit={(item) => this.addItem(item)} show={this.state.isAddModalOpen} onHide={this.toggleAddModal} />
                            <AddModal action='Edit' submit={(item) => this.editItem(item,'body')} item={this.state.selectedItem} show={this.state.isEditModalOpen} onHide={this.toggleEditModal} />
                        </>}
               </div>
            
        )
    }
}   

export default Main;