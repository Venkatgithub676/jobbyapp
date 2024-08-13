import Header from '../Header'
import './index.css'

const Home = props => {
  const clickFindJobs = () => {
    const {history} = props
    history.replace('/jobs')
  }

  return (
    <div className="home-bg-con">
      <Header />
      <div className="home-dtls-con">
        <h1 className="home-heading">Find The Job That Fits Your Life</h1>
        <p className="home-para">
          Millions of people are searching for jobs,salary information, company
          reviews. Find the job that fits your abilities and potential.
        </p>
        <button type="button" onClick={clickFindJobs} className="find-jobs-btn">
          Find Jobs
        </button>
      </div>
    </div>
  )
}

export default Home
