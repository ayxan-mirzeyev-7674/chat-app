import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [input, setInput] = useState({ username: "", password: "" });
  const [active, setActive] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const API_URL = "http://192.168.31.94:4000/login?";

  useEffect(() => {
    if (input) {
      if (input.username && input.password) {
        setActive(true);
      } else {
        setActive(false);
      }
    }
  }, [input]);

  const submit = (e) => {
    e.preventDefault();
    if (input.username && input.password) {
      fetch(`${API_URL}username=${input.username}&password=${input.password}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          if (data.status) {
            console.log("Successfull" + data.id)
            const token = JSON.stringify({id : data.id, username: input.username});
            localStorage.setItem("token", token);
            console.log('Generated Token:', token);
            navigate("/chat");

          } else {
            setError(data.error);
            console.log("Error:", data.error);
          }
        })
        .catch((error) => {
          setError(error);
          console.error("Error:", error);
        });
    }
  };

  return (
    <div className={styles.body}>
      <div className={styles.main}>
        <p className={styles.header}>Login</p>
        <Form style={{width : "100%"}} onSubmit={submit}>
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              onChange={(e) => {
                setInput((prev) => ({ ...prev, username: e.target.value }));
              }}
              type="text"
              placeholder="Enter username"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={(e) => {
                setInput((prev) => ({ ...prev, password: e.target.value }));
              }}
              type="password"
              placeholder="Enter password"
            />
          </Form.Group>
          <p style={{color:"#dc3545"}}>{error}</p>
          <Button
            disabled={!active}
            className={styles.submit}
            variant="primary"
            type="submit"
          >
            Login
          </Button>
          <p style={{ marginTop: "10px" , textAlign: "center"}}>
            Don't have an account?{" "}
            <a href={"../register"}>Register</a>.
          </p>
        </Form>
      </div>
    </div>
  );
}

export default Login;
