import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [passWord, setPassword] = useState("");

//   const handleSubmit =  async (e) => {
//     e.preventDefault();
//     console.log("Login submitted:", { email, passWord });
//    const res = await axios.post("http://localhost:4000/login", {
//       email,
//       passWord: passWord,
//     });
//     console.log("Response from server:", res.data);
//   };

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    passWord: "",
  });
   const navigate = useNavigate(); // 🔹 navigation hook

  function loginFun(e) {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  }

  async function done() {
    try {
      
      console.log("DATA GOING TO BACKEND:", input);
      const res = await axios.post("http://localhost:4000/login", input, {});
      console.log("SERVER RESPONSE →", res.data);

      //  Suppose backend sends success:true
      if (res.data.success) {   
    
        navigate("/dashboard"); //  Redirect to Dashboard
      } else {
        alert("Invalid email or password");
      }

    } catch (error) {
      console.log("ERROR:", error);
    }finally {
    // ✅ Ye part hamesha chalega (success ho ya fail)
    setInput({ email: "", passWord: "" });
  }
  }

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <fieldset className="bg-white shadow-lg rounded-2xl p-8 w-80">
        <h2 className="text-2xl font-bold mb-5 text-center text-blue-600">
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="border w-full p-2 mb-3 rounded"
          value={input.email}
          name="email"
          onChange={loginFun}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="border w-full p-2 mb-5 rounded"
          value={input.passWord}
          name="passWord"
          onChange={loginFun}
          required
        />

        <button
          onClick={done}
          className="bg-blue-600 text-white w-full py-2 rounded"
        >
          Login
        </button>
      </fieldset>
    </div>
  );
};

export default Login;
