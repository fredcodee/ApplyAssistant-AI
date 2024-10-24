import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Api from '../Api';
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

const JobList = () => {
    const token = localStorage.getItem('token') || false
    const [error, setError] = useState(null)
    const [jobs, setJobs] = useState([])

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

            {jobs.length == 0 && (
                <div className="">
                    <span>No Jobs Added yet</span>
                </div>
            )}

            {jobs.length > 0 && (
                <Table>
                    <TableCaption>A list of your Jobs ({jobs.length}).</TableCaption>
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
                                    <a href={job.postUrl}>view job  post</a>
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
                                    {job.progress}
                                </TableCell>

                                <TableCell>
                                    <Button variant="outline" >View kits</Button>
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
