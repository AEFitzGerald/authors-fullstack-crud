import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Button, Paper } from '@material-ui/core';
import axios from 'axios';
    

const AuthorList = () => {

    const [authorList, setAuthorList] = useState([]);
    
    const [deleteClicked, setDeleteClicked] = useState(false)

    const styles = {
        button: {
            width: "33%",
            color:"default",  
    },
        paper: {
            width: "50rem", 
            padding: "1rem",
            margin: "2rem"
    }
}

useEffect(() =>{
    axios.get('http://localhost:8000/api/authors')
        .then(res =>{
            console.log("Get All Request From AuthorList-->", res)
            setAuthorList(res.data.authorData)
        })
        .catch(err=> console.log("error with api call", err))
},[deleteClicked])


const onDeleteAuthor = (e,id) => {
    console.log("initiated delete process...", id)
    axios.delete(`http://localhost:8000/api/author/${id}`)
            .then(res=>{
                console.log("Delete Response-->", res)
                setDeleteClicked(!deleteClicked)
            })
            .catch(err => console.log("error with api call", err));
    }

    
    return (
        <div>
            <Paper elevation={5} style={ styles.paper }>
            { authorList.map((author, idx) => {
                return (
                    <div key={idx}>
                        
                        <Button 
                        size="large"
                        variant="outlined"
                        style={styles.button}
                        >
                            <Link to={"/author/" + author._id}>
                                {author.authorFullName}
                            </Link>
                        </Button>
                        
                        <Button 
                        size="large"
                        variant="outlined"
                        style={styles.button}
                        >
                            <Link to={"/author/update/" + author._id}>
                                Edit
                            </Link>
                        </Button>

                        <Button 
                        size="large"
                        variant="outlined"
                        style={styles.button}
                        onClick={(e)=>onDeleteAuthor(e,author._id)}
                        >
                            Delete Author
                        </Button>

                    </div>
                )
            })
            }
            </Paper>
        </div>
    );
}
    
export default AuthorList;