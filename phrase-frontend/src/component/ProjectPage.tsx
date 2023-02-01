import React, {useEffect, useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useSearchParams } from 'react-router-dom';


export interface Project {
    uid: String;
    id: String;
    name: String;
    sourceLang: String;
    targetLangs: String[];
    status: String;
}

export interface ProjectList {
    totalElements: number,
    content: Project[],
}

const projectList: Project[] = [
    {
        uid: "uid 111", id: "id 111", name: "Project 1", sourceLang: "VN", targetLangs: ["CZ", "EN"], status: "NEW"
    }, {
        uid: "uid 2", id: "id 222", name: "Project 2", sourceLang: "ES", targetLangs: ["VN", "EN"], status: "OLD"
    },
];

export const ProjectPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [projectList, setProjectList] = useState<ProjectList>({totalElements: 0, content: []});

    useEffect(() => {
        fetch("http://localhost:8080/project/list?token=" + searchParams.get("token"))
          .then(res => res.json())
          .then(
            (result) => {
              setIsLoaded(true);
              setProjectList(result);
            },
            (error) => {
              setIsLoaded(true);
              setError(error);
            }
          )
      }, [])

    if (!isLoaded) return <></>

    return <>
        <Typography variant="h2" gutterBottom>
            Project page
        </Typography>
        {
            projectList.content.map((project, key) => (
                <Card style={{
                    textAlign: "center",
                    margin: "auto",
                    marginTop: 5,
                    width: 200
                }} key={key} sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            uid {project.uid}
                        </Typography>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            id {project.id}
                        </Typography>
                        <Typography variant="h5" component="div">
                            {project.name}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            {project.status}
                        </Typography>
                        <Typography variant="body2">
                            This is a Phrase project with source language: {project.sourceLang}
                            <br />
                            and target languages: {project.targetLangs.join(", ")}
                        </Typography>
                    </CardContent>
                </Card>
            ))
        }
    </>
}