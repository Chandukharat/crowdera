import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import style from './style.css'

function Regis() {
    let navigate = useNavigate();

    const [data, setdata] = useState({
        Email: '',
        username: '',
        Phone: Number,
        Age: Number,
        Password: null,
        Confirm: null,
        file:null
        
    })
    function handle(event) {
        setdata({ ...data, [event.target.name]: event.target.value })
    }

    function handleFile(event) {
        setdata({ ...data, [event.target.name]: event.target.files[0] })
    }


    const info = () => {

        const formData = new FormData()
        formData.append('file', data.file)
        formData.append('Email', data.Email)
        formData.append('username', data.username)
        formData.append('Phone', data.Phone)
        formData.append('Age', data.Age)
        formData.append('Password', data.Password)
        formData.append('Confirm', data.Confirm)
        axios.post('http://localhost:8001/Regi', formData).then(x => {
            console.log(x.data)
            navigate("/")
        }).catch(e => {
            alert("Wrong Credentials")
        })


        }

        return (



            <form action="/profile" method="post" enctype="multipart/form-data" className='pura' >
            <div class="input-group">
                    <span class="input-group-text">PROFILE PICTURE</span>
                    <input type="file" aria-label="Profile Picture" class="form-control" onChange={handleFile} name='file' />
                </div>
                <div class="input-group">
                    <span class="input-group-text">Email</span>
                    <input type="Email" aria-label="Email" class="form-control" onChange={handle} name='Email' />
                </div> <div class="input-group">
                    <span class="input-group-text">USERNAME</span>
                    <input type="text" aria-label="username" class="form-control" onChange={handle} name='username' />
                </div> <div class="input-group">
                    <span class="input-group-text">PHONE NUMBER</span>
                    <input type="tel" aria-label="tel" maxLength='10' class="form-control" onChange={handle} name='Phone' />
                </div> <div class="input-group">
                    <span class="input-group-text">AGE</span>
                    <input type="number" aria-label="Age" maxLength='3' class="form-control" onChange={handle} name='Age' />
                </div> <div class="input-group">
                    <span class="input-group-text">PASSWORD</span>
                    <input type="password" minLength='6' aria-label="passsword" class="form-control" onChange={handle} name='Password' />
                </div> <div class="input-group">
                    <span class="input-group-text">CONFIRM PASSWORD</span>
                    <input type="password" aria-label="password" class="form-control" onChange={handle} name='Confirm' />
                </div>

                <div className='buttu'> <button type="button" onClick={info} class="btn btn-info">SIGN UP</button></div>

            </form>

        )
    }

    export default Regis;