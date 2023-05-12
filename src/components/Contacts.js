
import React from "react";

const API_URL = "https://jsonplaceholder.typicode.com/users";


class Contacts extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            users: [],
            name: "",
            phone: ""
        };
       
    }
    componentDidMount() {
        fetch(API_URL)
          .then((response) => response.json())
          .then((users) => {
            this.setState({ users: users });
          });
    }

 
    render() {
        return (
            <div>
                { this.state.users.map((i) => (
                    <tr>
                        <td>{i.name}</td>
                        <td>{i.phone}</td>
                    </tr>
                ))}
               
            </div>
        )
    }
}

export default Contacts