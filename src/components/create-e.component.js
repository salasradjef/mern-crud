import React, {Component} from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import axios from 'axios'

export default class CreateE extends Component{
    constructor(props){
        super(props);


        this.onChangeUsername = this.onChangeUsername.bind(this)
        this.onChangeDescription = this.onChangeDescription.bind(this)
        this.onChangeDuration = this.onChangeDuration.bind(this)
        this.onChangeDate = this.onChangeDate.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.state ={
            username: '',
            description: '',
            duration : 0,
            date: new Date(),
            users: []
        }
    }

    componentDidMount(){
        axios.get('http://localhost:5000/users')
        .then(response => {
           if(response.data.length > 0 ){
               this.setState({
                   users : response.data.map(user => user.username),
                   username: response.data[0].username
               })
           }
        })

    }


    onChangeUsername(e){
        this.setState({
            username : e.target.value
        })
    }

    onChangeDescription(e){
        this.setState({
            description : e.target.value
        })
    }
    
    onChangeDuration(e){
        this.setState({
            duration : e.target.value
        })
    }
    onChangeDate(date){
        this.setState({
            date : date
        })
    }

    onSubmit(e){
        e.preventDefault();

        const exercice = {
            username: this.state.username,
            description : this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }

        axios.post('http://localhost:5000/exercices/add',exercice)
        .then(res => window.location='/')

       
        
    }




    render(){
        return(
            <div>
                <h3>Formulaire</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username:</label>
                        <select 
                        required
                        className="form-control"
                        value= {this.state.username}
                        onChange={this.onChangeUsername}
                        >
                        {
                            this.state.users.map(function(user){
                                return <option 
                                    key= {user}
                                    value= {user}>{user}
                                    </option>
                            })

                        }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Description:</label>
                        <input className="form-control" type="text"
                        value={this.state.description}
                        onChange={this.onChangeDescription}
                        ></input>
                    </div>

                    <div className="form-group">
                        <label>Duration (in minute)</label>
                        <input type="text" className="form-control" 
                        value={this.state.duration}
                        onChange={this.onChangeDuration}/>
                    </div>


                    <div className="form-group">
                        <label>Date</label>
                        <br></br>
                        <DatePicker
                        className="form-control"
                        selected={this.state.date}
                        onChange= {this.onChangeDate}
                        />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create Exercice" className="btn btn-primary"></input>
                        </div>    

                </form>
            </div>
        )
    }
}