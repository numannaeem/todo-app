import { baseUrl } from "./baseUrl"

export async function getData() {
    await fetch(baseUrl + "items", {credentials: "include"})
    .then(async (res) => {
        if(res.ok) {
            this.setState({
                err: ""
            })
            var data = await res.json()
            return data
        }
    })
    .then((data) => {
        this.setState({
            listItems: data
        })
    })
    .catch(err => {
        this.setState({
            err: err.message+". Try again later."
        })
    })
}
export async function addItem(item) {
    this.setState({
        actionLoading: true
    })
    fetch(baseUrl + "add", {
        method:'POST',
        headers: {
            'content-type':'application/json'
        },
        body:JSON.stringify({...item, completed: false}),
        credentials: "include"
    })
    .then(async (res) => {
        if(res.ok) {
            let data = await res.json()
            this.setState({
                listItems: data
            })
            this.setState({
                actionLoading: false
            })
        }
        
    })
}

export async function editItem(item,attr) {
    if(attr === 'body')
        this.setState({
            actionLoading: true
        })
    fetch(baseUrl + "edit", {
        method:'POST',
        headers: {
            'content-type':'application/json'
        },
        body:JSON.stringify(item),
        credentials: "include"
    })
    .then(async (res) => {
        if(res.ok) {
            if(attr === 'body') {
                let data = await res.json()
                this.setState({
                    listItems: data
                })
                this.setState({
                    actionLoading: false
                })
                this.selectItem(item._id)
            }
        }
    })
}

export async function deleteItem(id) {
    if(!id) {
        if(!this.state.listItems.find((i) => i.completed))
            return;
    }
    this.setState({
        actionLoading: true
    })
    fetch(baseUrl + "delete", {
        method:'POST',
        headers: {
            'content-type':'application/json'
        },
        body:JSON.stringify({
            id                      //pass id: null to delete all completed items
        }),
        credentials: "include"
    })
    .then(async (res) => {
        if(res.ok) {
            let data = await res.json()
            this.setState({
                listItems: data
            })
            this.setState({
                actionLoading: false
            })
            this.setState({
                selectedItem: null
            })
        }
    })
}

export async function logout() {
    localStorage.removeItem('username')
    localStorage.removeItem('password')
    await fetch(baseUrl + 'logout', {credentials: 'include'})
}
