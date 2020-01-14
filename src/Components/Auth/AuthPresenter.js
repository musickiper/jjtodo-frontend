import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 50vh;
  height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Box = styled.div`
  width: 50vh;
  border-radius: 4px;
  border: 1px solid #CED4DA;
  background-color: white;
  text-align: center;
  padding: 40px;
`;

const Form = styled(Box)`
  padding: 40px 40px 30px;
  margin-bottom: 15px;
  form {
    width: 100%;
    input {
      width: 100%;
      &:not(:last-child) {
        margin-bottom: 10px;
      }
    }
  }
`;

const Link = styled.span`
  color: #3897F0;
  cursor: pointer;
`;

const Input = styled.input`
  height: 8vh;
  background-color: #F1F3F5;
  border: 1px solid #CED4DA;
  border-radius: 4px;
  font-size: 20px;
  padding-left: 1vh;
  ::placeholder {
    color: #757575;
  }
`;

const Button = styled.button`
  width:100%;
  border:0;
  border-radius: 4px;
  color: white;
  font-weight: 600;
  background-color: #3897F0;
  text-align: center;
  margin: 5px;
  font-size: 20px;
  height: 60px;
`;

export default ({
                    setAction,
                    action,
                    email,
                    username,
                    secret,
                    onSubmit,
                }) => (
    <Wrapper>
        <Form>
            {action === "logIn" && (
                <form onSubmit={onSubmit}>
                    <Input placeholder={"Email"} {...email} type={"email"}/>
                    <Button>Log In</Button>
                </form>
            )}
            {action === "signUp" && (
                <form onSubmit={onSubmit}>
                    <Input placeholder={"Email"} type={"email"} {...email}/>
                    <Input placeholder={"Username"} {...username} />
                    <Button>Sign Up</Button>
                </form>
            )}
            {action === "confirm" && (
                <form onSubmit={onSubmit}>
                    <Input placeholder={"Paste your secret"} {...secret} />
                    <Button>Confirm</Button>
                </form>
            )}
        </Form>
        {action === "logIn" && (
            <Box>
                Don't have an account?{" "}
                <Link onClick={() => setAction("signUp")}>Sign up</Link>
            </Box>
        )}
        {action === "signUp" && (
            <Box>
                Have an account? <Link onClick={() => setAction("logIn")}>Log in</Link>
            </Box>
        )}
    </Wrapper>
);
