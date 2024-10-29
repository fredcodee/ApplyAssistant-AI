import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Api from '../Api';
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

const JobList = () => {
    const token = localStorage.getItem('token') || false
    const [error, setError] = useState(null)
    const [jobs, setJobs] = useState([])
    const [clonedJobs, setClonedJobs] = useState([])
    const [filter, setFilter] = useState(null)

    useEffect(() => {
        getJobs()
    }, [])

    const getJobs = async () => {
        try {
            await Api.get('api/jobs', {
                headers: {
                    Authorization: `Bearer ${token.replace(/"/g, '')}`
                }
            })
                .then((res) => {
                    setJobs(res.data)
                    setClonedJobs(res.data)
                })
                .catch((err) => {
                    setError(err)
                })
        } catch (error) {
            setError(error)
        }
    }

    const editProgress = async (id, progress) => {
        try {
            await Api.post(`api/edit/job/progress`, {
                jobId: id,
                progress
            }, {
                headers: {
                    Authorization: `Bearer ${token.replace(/"/g, '')}`
                }
            })
                .then((res) => {
                    getJobs()
                })
                .catch((err) => {
                    setError(err)
                })
        } catch (error) {
            setError(error)
        }
    }
    const filterByProgess = async (progress) => {
        try {
            setFilter(progress)
            const filteredJobs = clonedJobs.filter(job => job.progress == progress)
            setJobs(filteredJobs)
        }
        catch (error) {
            console.log(error)
        }
    }

    const deleteJob = async (id) => {
        try {
            await Api.post(`api/delete/job`, {
                jobId: id
            }, {
                headers: {
                    Authorization: `Bearer ${token.replace(/"/g, '')}`
                }
            })
                .then((res) => {
                    getJobs()
                })
                .catch((err) => {
                    setError(err)
                })
        } catch (error) {
            setError(error)
        }
    }
    return (
        <div>
            {error && (
                <div role="alert" className="alert alert-error max-w-sm mx-auto">
                    <span>{error}</span>
                </div>
            )}

            <div className="pb-4 text-bold">
                <h2>Your Jobs ({jobs.length}).</h2>
            </div>
            <div className="text-center pb-4">
                <DropdownMenu>
                    <DropdownMenuTrigger  style={{ width: '200px', backgroundColor: 'purple', padding:'10px'}}>{filter || `Filter by progress`}</DropdownMenuTrigger>
                    <DropdownMenuContent style={{ width: '200px', backgroundColor: 'white' , color: 'black'}}>
                        <DropdownMenuItem onClick={() => filterByProgess('Applied')}>Applied</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => filterByProgess('OnGoing')}>OnGoing</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => filterByProgess('Interviewing')}>Interviewing</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => filterByProgess('Negotiating')}>Negotiating</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => filterByProgess('Rejected')}>Rejected</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => filterByProgess('Accepted')}>Accepted</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>


            {jobs.length == 0 && (
                <div className="">
                    <span>No Jobs Found</span>
                </div>
            )}

            {jobs.length > 0 && (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Company</TableHead>
                            <TableHead>Webiste</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Date Applied</TableHead>
                            <TableHead>Job Link</TableHead>
                            <TableHead>Salary</TableHead>
                            <TableHead className="text-right">Progress</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {jobs.map((job, index) => (
                            <TableRow key={index}>
                                <TableCell className="font-medium">{job.companyName}</TableCell>
                                <TableCell>{job.companywebsite || "n/a"}</TableCell>
                                <TableCell>{job.jobTitle}</TableCell>
                                <TableCell>{new Date(job.date).toDateString()}</TableCell>
                                <TableCell>
                                    <a href={job.postUrl}>view job post</a>
                                </TableCell>
                                <TableCell>{job.salary || "n/a"}</TableCell>
                                <TableCell
                                    className="text-right"
                                    style={{
                                        color: job.progress === 'Pending'
                                            ? 'orange'
                                            : job.progress === 'Applied'
                                                ? 'blue'
                                                : job.progress === 'Negotiating'
                                                    ? 'purple'
                                                    : job.progress === 'Rejected'
                                                        ? 'red'
                                                        : 'green',
                                    }}
                                >
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>{job.progress}</DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem onClick={() => editProgress(job._id, 'Applied')}>Applied</DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => editProgress(job._id, 'OnGoing')}>OnGoing</DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => editProgress(job._id, 'Interviewing')}>Interviewing</DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => editProgress(job._id, 'Negotiating')}>Negotiating</DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => editProgress(job._id, 'Rejected')}>Rejected</DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => editProgress(job._id, 'Accepted')}>Accepted</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>

                                <TableCell>
                                    <Button variant="outline" >
                                        <a href={'/kits/' + job._id}>View kits</a></Button>
                                </TableCell>
                                <TableCell>
                                    <Button variant="outline" style={{ backgroundColor: 'red' }} onClick={() => deleteJob(job._id)}>Delete</Button>
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </div>
    )
}

export default JobList
