import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { AiOutlineHome } from "react-icons/ai";
import { useParams, useHistory } from 'react-router';
import { ThemeContext } from '../../../contexts/ThemeContext';
import { headerData } from '../../../data/headerData'
import { Button } from '@material-ui/core';
import './SingleProjectDetails.css'

function SingleProjectPage() {
    const { theme } = useContext(ThemeContext);
    const history = useHistory();

    const useStyles = makeStyles((t) => ({
        home: {
            color: theme.secondary,
            position: 'absolute',
            top: 25,
            left: 25,
            padding: '7px',
            borderRadius: '50%',
            boxSizing: 'content-box',
            fontSize: '2rem',
            cursor: 'pointer',
            boxShadow: theme.type === 'dark' ? '3px 3px 6px #ffffff40, -3px -3px 6px #00000050' : '3px 3px 6px #ffffff40, -3px -3px 6px #00000050',
            transition: 'all 0.3s ease-in-out',
            "&:hover": 
            {
                color: theme.tertiary,
                transform: 'scale(1.1)',
            },
            [t.breakpoints.down('sm')]: {
                fontSize: '1.8rem',
            },
        },
    }));

    const classes = useStyles();

    const { id } = useParams()
    const [project, setProject] = useState([]);
    const [projectDetail, setProjectDetail] = useState([]);
    const backButton = () => {
        history.push('/')
    }

    useEffect(()=>{
        fetch('/projects.json')
        .then(res => res.json())
        .then (data => setProject(data))
    },[])
    useEffect(()=>{
        const matchedProject = project?.filter((project)=> project.id === parseInt(id))
        setProjectDetail(matchedProject);
    },[project])

    const projectDescription = projectDetail[0]?.bigdes;

    return (
        <div className="projectPage" style={{backgroundColor: theme.secondary}}>
            <Helmet>
                <title>{headerData.name} | Projects</title>
            </Helmet>
            <div className="projectPage-header" style={{backgroundColor:theme.primary}}>
                <Link to="/">
                        <AiOutlineHome className={classes.home}/>
                </Link>
                <h1 style={{color: theme.secondary, paddingTop: '10px'}}> Project Detail </h1>
                <Button onClick={backButton}> Home Button</Button>

            </div>
           <div className="projectPage-container">
               <div>
                  <h2 className="text-light">{projectDetail[0]?.projectName}</h2>
                  <div className="container">
                    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
                        <div class="carousel-indicators">
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        </div>
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <img src={projectDetail[0]?.img1} class="d-block w-100" alt="..."/>
                            </div>
                            <div class="carousel-item">
                                <img src={projectDetail[0]?.img2} class="d-block w-100" alt="..."/>
                            </div>
                            <div class="carousel-item">
                                <img src={projectDetail[0]?.img3} class="d-block w-100" alt="..."/>
                            </div>
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>
                    <div className="container ">
                      <h2 className="text-light">Project Description</h2>
                      <ul className="fs-bold mt-3 text-light">
                            {
                                projectDescription?.map(description => <li> {description}</li>)
                            }
                      </ul>
                  </div>
                  </div>

               </div>
           </div>    
        </div>
    )
}

export default SingleProjectPage;