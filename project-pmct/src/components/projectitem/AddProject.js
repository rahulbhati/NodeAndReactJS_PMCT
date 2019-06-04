import React from 'react';

class AddProject extends React.Component{
    
    constructor(props){

        super(props);
        console.log(props);
        this.state={
            name:"",
            scrum_master:"",
            description:"",
            team_members:"",
            response:""
        };
        this.onChange=this.onChange.bind(this);
    }
 
    onChange(event){
        if (event.target.name === 'name') {
            this.setState({name:event.target.value});
        } else if (event.target.name === 'scrum_master') {
            this.setState({scrum_master:event.target.value});

        } else if (event.target.name === 'description') {
            this.setState({description:event.target.value});
        }else if (event.target.name === 'team_members') {
            this.setState({team_members:event.target.value});
        }        
         event.preventDefault();
    }
    handleClick(event){
            console.log(this.state);
     
            fetch('http://localhost:3001/addProject', {
                method: 'post',
                headers: {'Content-Type': 'application/json' },
                body: JSON.stringify(this.state)
               
            }).then(function(response) {
                console.log(response);
               
                return response;
            }).then(data =>
                this.setState({
                    response: data, 
                    name:"",
                    scrum_master:"",
                    description:"",
                    team_members:"",
                   
                })).catch(error => this.setState({ error, isLoading: false }));

    }

    render(){
        const { response, error } = this.state;
        return (
                <div className="project">
                  <div className="container">
                        <div className="row">
                            <div className="col-md-8 m-auto">
                            {
                               response.status==200?(
                                <div className="alert alert-success alert-dismissible fade show">
                                <strong>Project Added Successfully!</strong>.
                               </div>) :null
                               
                            }
                            <h5 className="display-4 text-center">Create Project Form</h5>
                                <hr></hr>
                                <form method="POST">
                                        <div className="form-group">
                                             <input type="text" name="name" value={this.state.name}
                                             className="form-control form-control-lg" onChange={this.onChange}
                                             placeholder="Project Name"></input>

                                        </div>
                                        <div className="form-group">
                                             <input type="text" value={this.state.scrum_master} onChange={this.onChange} name="scrum_master" className="form-control form-control-lg" placeholder="Scrum Master"></input>
                                        </div>
                                        
                                        <div className="form-group">
                                             <input type="text" value={this.state.description} onChange={this.onChange} name="description" className="form-control form-control-lg" placeholder="Project Desciption"></input>
                                        </div>
                                        <h6>Team Members</h6>
                                        <div className="form-group">
                                             <input type="number" value={this.state.team_members} onChange={this.onChange}  className="form-control form-control-lg" name="team_members" placeholder="Team Members"></input>
                                        </div>
                                        <input type="button" onClick={(event)=>this.handleClick(event.state)} className="btn btn-primary btn-black mt-4" name="submit" value="Submit" />
                                       
                                </form>
                            </div>
                        </div>
                  </div>
                </div>
            

        );
    }
}

export default AddProject;
