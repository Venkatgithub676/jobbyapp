import {Component} from 'react'
import Cookies from 'js-cookie'
import {IoStar} from 'react-icons/io5'
import {ImNewTab} from 'react-icons/im'
import {MdLocationOn, MdWork} from 'react-icons/md'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}
class JobItemDetails extends Component {
  state = {
    similarJobs: [],
    jobDtls: {},
    status: apiConstants.initial,
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({status: apiConstants.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    // console.log(data)
    const jobDtls = {
      companyLogoUrl: data.job_details.company_logo_url,
      companyWebsiteUrl: data.job_details.company_website_url,
      empType: data.job_details.employment_type,
      jobDesc: data.job_details.job_description,
      lifeAtCompany: {
        desc: data.job_details.life_at_company.description,
        imgUrl: data.job_details.life_at_company.image_url,
      },
      location: data.job_details.location,
      pkgPerAnnum: data.job_details.package_per_annum,
      rating: data.job_details.rating,
      title: data.job_details.title,
      skills: data.job_details.skills.map(each => ({
        name: each.name,
        imgUrl: each.image_url,
      })),
    }
    const similarJobs = data.similar_jobs.map(each => ({
      companyLogoUrl: each.company_logo_url,
      empType: each.employment_type,
      jobDesc: each.job_description,
      location: each.location,
      rating: each.rating,
      title: each.title,
    }))
    this.setState({similarJobs, jobDtls, status: apiConstants.success})
  }

  similarJobsCon = () => {
    const {similarJobs} = this.state

    return (
      <ul className="job-item-dtls-sim-jobs-ul">
        {similarJobs.map(each => {
          const {
            companyLogoUrl,
            empType,
            jobDesc,
            location,
            rating,
            title,
          } = each
          return (
            <li className="job-item-dtls-sim-jobs-li">
              <div className="job-item-dtls-comp-logo-con">
                <img
                  src={companyLogoUrl}
                  alt=""
                  className="job-item-dtls-comp-logo"
                />
                <div>
                  <h1 className="job-item-dtls-comp-title">{title}</h1>
                  <div className="job-item-dtls-comp-logo-star-con">
                    <IoStar className="job-item-dtls-comp-logo-star-img" />
                    <span className="job-item-dtls-comp-logo-rating">
                      {rating}
                    </span>
                  </div>
                </div>
              </div>
              <h1 className="job-item-dtls-sim-desc-heading">Description</h1>
              <p className="job-item-dtls-desc-para">{jobDesc}</p>

              <div className="job-item-dtls-location-work-con">
                <div className="job-item-dtls-location-con">
                  <MdLocationOn className="job-item-dtls-location-icon" />
                  <span className="job-item-dtls-location">{location}</span>
                </div>
                <div className="job-item-dtls-emp-type-con">
                  <MdWork className="job-item-dtls-emp-type-icon" />
                  <span className="job-item-dtls-emp-type">{empType}</span>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    )
  }

  successView = () => {
    const {jobDtls, similarJobs} = this.state
    // console.log(jobDtls, similarJobs)
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      empType,
      jobDesc,
      lifeAtCompany,
      location,
      pkgPerAnnum,
      rating,
      skills,
      title,
    } = jobDtls

    console.log(skills)
    return (
      <>
        <div className="job-item-dtls-main-con">
          <div className="job-item-dtls-comp-logo-con">
            <img
              src={companyLogoUrl}
              alt=""
              className="job-item-dtls-comp-logo"
            />
            <div>
              <h1 className="job-item-dtls-comp-title">{title}</h1>
              <div className="job-item-dtls-comp-logo-star-con">
                <IoStar className="job-item-dtls-comp-logo-star-img" />
                <span className="job-item-dtls-comp-logo-rating">{rating}</span>
              </div>
            </div>
          </div>
          <div className="job-item-dtls-location-pkg-con">
            <div className="job-item-dtls-location-work-con">
              <div className="job-item-dtls-location-con">
                <MdLocationOn className="job-item-dtls-location-icon" />
                <span className="job-item-dtls-location">{location}</span>
              </div>
              <div className="job-item-dtls-emp-type-con">
                <MdWork className="job-item-dtls-emp-type-icon" />
                <span className="job-item-dtls-emp-type">{empType}</span>
              </div>
            </div>
            <p className="job-item-dtls-pkg-per-annum">{pkgPerAnnum}</p>
          </div>
          <hr className="job-item-dtls-hr-line" />
          <div className="job-item-dtls-desc-con">
            <div className="job-item-dtls-desc-visit-con">
              <h1 className="job-item-dtls-desc">Description</h1>
              <a
                href={companyWebsiteUrl}
                target="_blank"
                className="job-item-dtls-visit-btn"
                rel="noreferrer"
              >
                Visit{' '}
                <ImNewTab
                  className="job-item-dtls-visit-icon"
                  alt="visit button"
                />
              </a>
            </div>
            <p className="job-item-dtls-desc-para">{jobDesc}</p>
          </div>
          <div className="job-item-dtls-skills-con">
            <h1 className="job-item-dtls-skills-heading">Skills</h1>
            <ul className="job-item-dtls-skills-ul-con">
              {skills.map(each => (
                <li className="job-item-dtls-skills-li-con" key={each.imgUrl}>
                  <img
                    className="job-item-dtls-skills-li-img"
                    src={each.imgUrl}
                    alt=""
                  />
                  <p className="job-item-dtls-skills-li-name">{each.name}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="job-item-dtls-life-con">
            <h1 className="job-item-dtls-life-heading">Life at Company</h1>
            <div className="job-item-dtls-life-desc-con">
              <p className="job-item-dtls-life-desc-para">
                {lifeAtCompany.desc}
              </p>
              <img
                src={lifeAtCompany.imgUrl}
                className="job-item-dtls-life-img"
                alt=""
              />
            </div>
          </div>
        </div>
        <h1 className="job-item-dtls-sim-jobs-heading">Similar Jobs</h1>
        {this.similarJobsCon()}
      </>
    )
  }

  loadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  getViews = () => {
    const {status} = this.state
    switch (status) {
      case apiConstants.success:
        return this.successView()
      case apiConstants.loading:
        return this.loadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-item-dtls-bg-con">{this.getViews()}</div>
      </>
    )
  }
}

export default JobItemDetails
