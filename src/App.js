import React, { Component } from "react";
import "./App.css";
import Todos from "./components/Todo";
import Header from "./components/layouts/Header";
import AddTodo from "./components/layouts/AddTodo";
//import uuid from "uuid";
import axios from "axios";

class App extends Component {
  state = {
    todos: []
  };

  componentDidMount() {
    axios
      .get("https://jsonplaceholder.typicode.com/todos?_limit=20")
      .then(res => this.setState({ todos: res.data }));
  }

  // Toggle changes
  toggleChange = id => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    });
  };

  //Delete Todo
  delTodo = id => {
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`).then(res =>
      this.setState({
        todos: [...this.state.todos.filter(todo => todo.id !== id)]
      })
    );

    console.log(id);
  };

  addTodo = title => {
    axios
      .post("https://jsonplaceholder.typicode.com/todos", {
        title: title,
        completed: false
      })
      .then(res => this.setState({ todos: [...this.state.todos, res.data] }));
  };

  render() {
    return (
      <div className="App">
        <div className="container">
          <Header />
          <AddTodo addTodo={this.addTodo} />
          <Todos
            todos={this.state.todos}
            toggleChange={this.toggleChange}
            delTodo={this.delTodo}
          />
        </div>
      </div>
    );
  }
}

export default App;
