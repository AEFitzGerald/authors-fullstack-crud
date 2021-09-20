import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { 
    Paper,
    Button,
    TextField,
    FormControl,
} from '@material-ui/core';

const defaultValues = {
    authorFullName: "",
}

const AuthorForm = () => { 
    const history = useHistory();
    const [formValues, setFormValues] = useState(defaultValues);
    const [validationErrors, setValidationErrors] = useState({})

    
    const styles = {
        paper: {
            width: "20rem", 
            padding: "1rem",
            margin: "2rem"
        },
        input: {
            marginBottom: "1rem",
            width: "100%"
        },
        button: {
            width: "100%"
        }
    }

    const changeHandler = e => {
        console.log("new author is being entered...")
        console.log(e.target.name, e.target.value)
        const {name, value} = e.target;
        setFormValues({
            ...formValues,
            [name]:value,
        })
        
    }

    const onSubmitHandler = e => {
        e.preventDefault();
        console.log("submitting ******", formValues)
        axios.post('http://localhost:8000/api/author',formValues) 

            .then(res=>{
                console.log("submitted form, response-->", res)
                if(res.data.error) {
                    setValidationErrors(res.data.error.errors)
                    console.log("form data errors")
                
                } else {
                    history.push("/")     
                }  
            })
            .catch(err=>console.log("error with api call",err))
        }
    

    return (
        <Paper elevation={3} style={ styles.paper }>

            <h2>Enter Author</h2>
            <form onSubmit = { onSubmitHandler }>
                <FormControl variant="outlined" style={styles.input}>
                    <TextField
                        type="text"
                        label="Enter Author Full Name"
                        name="authorFullName"
                        id="authorFullName-input"
                        onChange={ changeHandler }
                        value={ formValues.authorFullName }
                    />
                    <p>
                    {
                    validationErrors.authorFullName? validationErrors.authorFullName.message: ""
                    }
                    </p>
                </FormControl>
                
                <Button 
                size="large" 
                type="submit" 
                variant="outlined" 
                style={styles.button}>Create
                </Button>

            </form>
        </Paper>
    )
}

export default AuthorForm;