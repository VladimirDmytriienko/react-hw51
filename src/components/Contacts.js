import React from "react";

const API_URL = "https://jsonplaceholder.typicode.com/users";

class Contacts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      name: "",
      phone: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    fetch(API_URL)
      .then((response) => response.json())
      .then((users) => {
        this.setState({ users: users });
      });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const { name, phone } = this.state;

    const newUser = {
      name: name,
      phone: phone,
    };

    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => response.json())
      .then((createdUser) => {
        this.setState((prevState) => ({
          users: [...prevState.users, createdUser],
          name: "",
          phone: "",
        }));
      });
  }

  handleDelete(userId) {
    fetch(`${API_URL}/${userId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        this.setState((prevState) => ({
          users: prevState.users.filter((user) => user.id !== userId),
        }));
      });
  }

  render() {
    return (
      <div>
        <table>
          <tbody>
            {this.state.users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.phone}</td>
                <td>
                  <button onClick={() => this.handleDelete(user.id)}>
                    Удалить
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            placeholder="Имя"
          />
          <input
            type="text"
            name="phone"
            value={this.state.phone}
            onChange={this.handleChange}
            placeholder="Телефон"
          />
          <button type="submit">Добавить</button>
        </form>
      </div>
    );
  }
}

export default Contacts;
