import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import React, {useState} from "react"
import {useDispatch} from "react-redux"
import {useHistory} from "react-router"

const HeadlineForm =
    (props) => {
      const dispatch = useDispatch()
      const history = useHistory()
      const [headline, setHeadline] = useState("")
    const moveToNextTab = () => {
    dispatch({type : "SAVE_HEADLINE", headline : headline})
    props.changeTab(1, 40)
    }
    
    const moveToHome = () => {
    history.push("/")
    }
    return (
        <div hidden={props.value !== props.index} className="headlineForm">
            <Typography variant="h3">
                Write a headline for your issue post
            </Typography>
            <TextField variant="outlined" value={headline} placeholder="Headline" label="Required" onChange={(event) => setHeadline(event.target.value)} classes={{root:"headlineTextInput"}} InputProps={{classes:{
                root:"headlineTextInput",
                focused:"headlineTextInput",
                notchedOutline:"headlineTextInput"
            }}}/>
            <Typography variant="body1">
                We'll match you with authors that will get your problem solved and turned into legislation right away!
            </Typography>
            <Typography variant="h4">
                Example titles  
            </Typography>
            <Typography variant="subtitle1">
                - Support children with autism
            </Typography>
            <Typography variant="subtitle1">
                - Manage stray animals in cities
            </Typography>
            <Typography variant="subtitle1">
                - Create instate tution for all veterans
            </Typography>
            <Button onClick={moveToHome} classes={{root:"homeButton"}}>Skip to home</Button>
            <Button onClick={moveToNextTab} classes={
    { root: "nextButton" }} disabled={headline === ""}>Next</Button>
        </div>
    )
    }

export default HeadlineForm