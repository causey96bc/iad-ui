import './App.css';
import { InputGroup, Form, Button } from 'react-bootstrap';
function App() {
  return (
    <div className="App">
      Hello World  
      <main class="container">
      <div class= "row"> 
      <Form>
  <Form.Group controlId="formBasicInput">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" />
  </Form.Group>

  <Form.Group controlId="formBasic">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" />
  </Form.Group>
  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
      </div>
      </main>
    </div>
  );
}

export default App;
