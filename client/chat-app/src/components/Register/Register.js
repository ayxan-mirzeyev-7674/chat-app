import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import styles from "./Register.module.css";
import { useNavigate } from "react-router-dom";

function Register() {
  const [input, setInput] = useState({ username: "", password: "" });
  const [active, setActive] = useState(false);
  const [error, setError] = useState(null);
  const [succesText, setSuccesText] = useState("Create an account"); 
  const [butColor, setButColor] = useState("primary");

  const navigate = useNavigate();

  const API_URL = "http://192.168.31.94:4000/register";

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
        fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(input)
        })
        .then(response => response.json())
        .then(result => {
            if (result.status){
                setSuccesText("Redirecting to login page.")
                setButColor("success")
                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            }else{
                setError(result.error)
                console.log("Error" + result.error)
            }
        })
        .catch(err => {
            setError(err)
        });
    }
  };

  return (
    <div className={styles.body}>
      <div className={styles.main}>
        <p className={styles.header}>Register</p>
        <Form style={{width: "100%"}} onSubmit={submit}>
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
            variant={butColor}
            type="submit"
          >
            {succesText}
          </Button>
          <p style={{ marginTop: "10px", textAlign: "center"}}>
            Have an account?{" "}
            <a href={"../login"}>Login</a>.
          </p>
        </Form>
      </div>
    </div>
  );
}

export default Register;
