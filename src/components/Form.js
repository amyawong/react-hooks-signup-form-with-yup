import React from "react";
import "../App.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"; // allows for connection to be made between react-hook-form and yup
import * as yup from "yup";

// yup is similar to Sequelize; purpose of this is for validation of input fields
const schema = yup.object().shape({
  firstName: yup.string().required(), // have to match name property passed into input otherwise it won't know what to identify
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  age: yup.number().positive().integer().required(),
  // birthday: yup.required(),
  password: yup.string().min(5).max(15).required(),
  confirmPassword: yup.string().oneOf([yup.ref("password"), null]), // checks to see if password field matches confirmPassword
});

const Form = () => {
  const { register, handleSubmit,  formState: { errors } } = useForm({
    // register() is used to determine which fields we want to be part of validation, handleSubmit() for onSubmit, errors is an object containing all the errors stored by yup
    resolver: yupResolver(schema), // how to connect yup with react-hook-forms
  });

  const submitForm = (data) => {
    // data refers to object containing the information submitted in each input
    console.log(data);
    alert("Sign up successful")
  };

  return (
    <div className="Form">
      <div className="title">Sign Up</div>
      <div className="inputs">
        <form onSubmit={handleSubmit(submitForm)}>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            {...register('firstName')} 
          />
          <p>{errors.firstName?.message}</p>
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            {...register('lastName')} 
          />
          <p>{errors.lastName?.message}</p>
          <input type="email" name="email" placeholder="Email" {...register('email')}  />
          <p>{errors.email?.message}</p>
          <input type="date" name="age" {...register('age')} />
          <p>{errors.age?.message}</p>
          <input
            type="password"
            name="password"
            placeholder="Password"
            {...register('password')} 
          />
          <p>{errors.password?.message}</p>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            {...register('confirmPassword')} 
          />
          <p>{errors.confirmPassword && "Passwords must match"}</p>
          <button type="submit" id="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Form;
