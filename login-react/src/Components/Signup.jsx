import { useState } from "react";
import axios from "axios";
const Signup = () => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    passWord: "",
  });
  async function handleSubmit(e) {
    e.preventDefault();
    console.log("SignUpForm submitted:", input);
    // Make API call to sign up the user
    const res = await axios.post("http://localhost:4000/create", input);
    console.log("Response from server:", res.data);
  // Clear fields after signup
setInput({ name: "", email: "", passWord: "" });

  }

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <fieldset className="bg-white shadow-lg rounded-2xl p-8 w-80">
        <h2 className="text-2xl font-bold mb-5 text-center text-blue-600">
          Signup
        </h2>

        <input
          type="text"
          placeholder="Full Name"
          className="border w-full p-2 mb-3 rounded"
          value={input.name}
          onChange={(e) => setInput({ ...input, name: e.target.value })}
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="border w-full p-2 mb-3 rounded"
          value={input.email}
          onChange={(e) => setInput({ ...input, email: e.target.value })}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="border w-full p-2 mb-5 rounded"
          value={input.passWord}
          onChange={(e) => setInput({ ...input, passWord: e.target.value })}

        />
        <button onClick={handleSubmit} type="submit" className="bg-blue-600 text-white w-full py-2 rounded">
          Create Account
        </button>
      </fieldset>
    </div>
  );
};

export default Signup;  

      