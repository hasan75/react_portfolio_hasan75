import {  makeStyles } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../../contexts/ThemeContext';

const SingleProjectPage = () => {
    const { theme } = useContext(ThemeContext);

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
        <div style={{backgroundColor: theme.secondary}}>
                <div className="projectPage-header" style={{backgroundColor:theme.primary}}>
                    <Link to="/">
                        <AiOutlineHome className={classes.home}/>
                    </Link>
                    <h1 style={{color: theme.secondary, paddingTop: '10px'}}> Project Detail </h1>
                </div>
                <div>
                    <div>
                        <h2 className="text-light text-center my-3">{projectDetail[0]?.projectName}</h2>
                        <div className="container">
                            <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
                                <div class="carousel-indicators">
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
                                </div>
                                <div class="carousel-inner">
                                    <div class="carousel-item active">
                                         <img src={projectDetail[0]?.img1} class="d-block w-100" height="510px" alt="..."/>
                                    </div>
                                    <div class="carousel-item">
                                         <img src={projectDetail[0]?.img2} class="d-block w-100" height="510px" alt="..."/>
                                    </div>
                                    <div class="carousel-item">
                                         <img src={projectDetail[0]?.img3} class="d-block w-100" height="510px" alt="..."/>
                                    </div>
                                    <div class="carousel-item">
                                         <img src={projectDetail[0]?.img4} class="d-block w-100" height="510px" alt="..."/>
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
                        <div className="container py-5 d-flex flex-column justify-content-center align-items-center">
                            <div>
                                <h2 className="text-light">Project Description</h2>
                                <ul className="fs-bold mt-3 text-light">
                                    {
                                         projectDescription?.map(description => <li> {description}</li>)
                                    }
                                </ul>
                                <a href={projectDetail[0]?.demo} target="_blank" class="btn btn-outline-danger me-4"    role="button" rel="noreferrer">Live Site</a>
                                 <a href={projectDetail[0]?.code} target="_blank" class="btn btn-outline-danger" role="button" rel="noreferrer">GitHub Code</a>
                            </div>
                            <Link to='/projects'>
                                <div className="mt-3 ms-5 ps-5">
                                    <button type="button" className="btn btn-outline-warning mt-4 mb-2 ms-5">Back To Projects</button>
                                </div>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
            
        </div>
    );
};

export default SingleProjectPage;