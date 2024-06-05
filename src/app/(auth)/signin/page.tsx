"use client"; 
import axios from "axios";
import Link from "next/link";
import { useRouter } from 'next/navigation';

// import { useRouter } from "next/router";
import { ChangeEventHandler, useState } from "react";

export default function Signin() {
    
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const router = useRouter();
    const handleSubmit = async () => {
        try {
          const response = await axios.post('/api/signin', {
            email,
            password,
      
          });
          if (response.status === 200) {
            // const { jwt } = response.data;
        // Store JWT token in localStorage or cookies
        // localStorage.setItem('jwt', jwt);
            router.push('/dashboard'); // Redirect to signin page
          } else {
            console.error('Signup failed');
          }
        } catch (error) {
          console.error('An error occurred during signup:', error);
        }
      };

    return (<div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
        <a href="#" className="block max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 ">
                <div>
                    <div className="px-10">
                        <div className="text-3xl pr-6 font-extrabold">
                            Sign in
                        </div>
                    </div>
                    <div className="pt-2">
                        
                        <LabelledInput onChange={(e) => {
                            setEmail(e.target.value)
                        }} label="Email" type={"email"} placeholder="yourmail@mail.com" />
                        <LabelledInput onChange={(e) => {
                            setPassword(e.target.value)
                        }} label="Password" type={"password"} placeholder="password" />
                         <p className="text-sm font-light m-3">
    Not Registered?{' '}
    <Link href="/signup">
      <p className="text-blue-500 hover:text-blue-700">Sign up</p>
    </Link>
  </p>
                        <button onClick={handleSubmit} type="button" className="mt-8 w-full text-white bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Sign in</button>
                    </div>
                </div>
            </a>
        </div>
    </div>

)}

function LabelledInput({ label, placeholder, type, onChange }: LabelledInputType) {
    return <div>
        <label className="block mb-2 text-sm text-black font-semibold pt-4">{label}</label>
        <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
    </div>
}

interface LabelledInputType {
    label: string;
    placeholder: string;
    type?: string;
    onChange: ChangeEventHandler<HTMLInputElement>
}