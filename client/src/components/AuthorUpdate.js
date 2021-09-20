import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { 
    Paper,
    Button,
    TextField,
    FormControl,
} from '@material-ui/core';

const defaultValues = {
    authorFullName: "",
}

const AuthorUpdate = () => {
    const history = useHistory();
    const { id } = useParams();
    const [authorData, setAuthorData] = useState(defaultValues);
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

    useEffect(() => {
    
        axios.get('http://localhost:8000/api/author/'+id)
            .then(res => {
                console.log("get author by id-->", res);
                setAuthorData(res.data.authorData);
        })
        .catch(err => console.log("error with api call", err));
}, [id]);


    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/author/${id}`, authorData)
            .then((res) => {
                console.log('submitted put request-->', res)
                if(res.data.error) {
                    setValidationErrors(res.data.error.errors)
                    console.log("form data errors")
                } else {
                history.push("/")     
            } 

            })
            .catch(err=>console.log("err",err))
}

    const changeHandler = e => {
        console.log("*******updating the product")
        const {name, value} = e.target;
        setAuthorData({
        ...authorData,
        [name]:value,
})
}

    return (
        <Paper elevation={3} style={ styles.paper }>

            <h3>Update Author</h3>
            <form onSubmit = { onSubmitHandler }>
                <FormControl variant="outlined" style={styles.input}>
                    <TextField
                        type="text"
                        label="Enter Author Full Name"
                        name="authorFullName"
                        id="authorFullName-input"
                        onChange={ changeHandler }
                        value={ authorData.authorFullName }
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
                    style={styles.button}>Update
                </Button>

            </form>
        </Paper>
    )
}


export default AuthorUpdate;